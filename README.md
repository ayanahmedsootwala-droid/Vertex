# XYZ Automobiles — Complete Source Archive

Generated: 21/05/2026, 06:24:02
Total files packaged: 203

## Structure
```
xyz-automobiles/
  index.html
  package.json
  vite.config.ts
  tailwind.config.js
  postcss.config.js
  tsconfig*.json
  components.json
  biome.json
  pnpm-workspace.yaml
  src/           → All React/TypeScript/CSS source files
  supabase/      → Supabase config, migrations, edge functions
  public/        → Static assets (favicon, logos, SVGs)
```

## Setup
1. `pnpm install`
2. Copy `.env.example` to `.env` and fill in VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
3. `pnpm dev`
