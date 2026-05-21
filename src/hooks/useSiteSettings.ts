import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/db/supabase';
import type { SiteSetting } from '@/types/types';

type SettingsMap = Record<string, string>;

let settingsCache: SettingsMap | null = null;

export function useSiteSettings() {
  const [settings, setSettings] = useState<SettingsMap>(settingsCache || {});
  const [loading, setLoading] = useState(!settingsCache);

  const fetch = useCallback(async () => {
    const { data } = await supabase.from('site_settings').select('key, value');
    if (data) {
      const map: SettingsMap = {};
      (data as SiteSetting[]).forEach(s => { if (s.value !== null) map[s.key] = s.value; });
      settingsCache = map;
      setSettings(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => { if (!settingsCache) fetch(); }, [fetch]);

  const updateSetting = async (key: string, value: string) => {
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value }, { onConflict: 'key' });
    if (!error) {
      settingsCache = { ...settingsCache, [key]: value };
      setSettings(prev => ({ ...prev, [key]: value }));
    }
    return { error };
  };

  const getSetting = (key: string, defaultVal = '') => settings[key] || defaultVal;

  return { settings, loading, updateSetting, getSetting, refresh: fetch };
}
