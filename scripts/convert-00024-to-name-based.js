import fs from 'fs';
import path from 'path';

const inputPath = path.resolve('supabase', 'migrations', '00024_add_missing_variants_popular_models.sql');
const outputPath = path.resolve('supabase', 'migrations', '00024_add_missing_variants_popular_models_fixed.sql');
const input = fs.readFileSync(inputPath, 'utf8');
const lines = input.split(/\r?\n/);
let currentBrand = null;
let currentModel = null;
const entries = [];
for (let line of lines) {
  line = line.trim();
  if (!line) continue;
  if (line.startsWith('--')) {
    const comment = line.slice(2).trim();
    const parts = comment.split(/\s+/);
    if (parts.length >= 2) {
      currentBrand = parts[0];
      currentModel = parts.slice(1).join(' ');
    }
    continue;
  }
  const m = line.match(/^\('([^']+)',\s*'([^']+)',\s*(true|false)\),?$/i);
  if (m && currentBrand && currentModel) {
    entries.push({brand: currentBrand, model: currentModel, variant: m[2], active: m[3].toLowerCase() === 'true'});
  }
}
const outLines = [];
outLines.push("-- This migration inserts missing car models and variants using brand/model lookups.");
outLines.push("-- It avoids hard-coded model UUIDs, so it works on any database where brands exist.");
outLines.push('');
outLines.push('WITH new_variants (brand_name, model_name, variant_name, is_active) AS (');
for (let i = 0; i < entries.length; i++) {
  const e = entries[i];
  const comma = i === entries.length - 1 ? '' : ',';
  const variant = e.variant.replace(/'/g, "''");
  const brand = e.brand.replace(/'/g, "''");
  const model = e.model.replace(/'/g, "''");
  outLines.push(`  ('${brand}', '${model}', '${variant}', ${e.active})${comma}`);
}
outLines.push('),');
outLines.push('missing_models AS (');
outLines.push('  SELECT DISTINCT b.id AS brand_id, nv.model_name AS name');
outLines.push('  FROM new_variants nv');
outLines.push('  JOIN public.car_brands b ON b.name = nv.brand_name');
outLines.push('  LEFT JOIN public.car_models m ON m.brand_id = b.id AND m.name = nv.model_name');
outLines.push('  WHERE m.id IS NULL');
outLines.push('),');
outLines.push('insert_models AS (');
outLines.push('  INSERT INTO public.car_models (brand_id, name, is_active)');
outLines.push('  SELECT brand_id, name, true FROM missing_models');
outLines.push('  RETURNING id');
outLines.push(')');
outLines.push('INSERT INTO public.car_variants (model_id, name, is_active)');
outLines.push('SELECT m.id, nv.variant_name, nv.is_active');
outLines.push('FROM new_variants nv');
outLines.push('JOIN public.car_brands b ON b.name = nv.brand_name');
outLines.push('JOIN public.car_models m ON m.brand_id = b.id AND m.name = nv.model_name');
outLines.push('ON CONFLICT (model_id, name) DO NOTHING;');
fs.writeFileSync(outputPath, outLines.join('\n'), 'utf8');
console.log('Wrote fixed migration file with', entries.length, 'variant entries to', outputPath);