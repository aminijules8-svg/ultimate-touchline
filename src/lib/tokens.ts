// Brand + theme tokens. Single source of truth for all colors.
export const brand = {
  ink: '#0A1C15',
  forest: '#12352A',
  chalk: '#F4F8F1',
  lime: '#B6F04A',
  limeGrad: ['#C6F24E', '#9BE03A'],
  lineGreen: '#2E8B3E',
  mutedDark: '#8FA89B',
  mutedLight: '#5F7468',
};

export const fonts = {
  display: "'Outfit', 'Plus Jakarta Sans', Inter, Arial, sans-serif",
  body: "'DM Sans', Inter, Arial, sans-serif",
};

// Pillar themes. Each owns an accent; base stays near brand ink.
export const themes = {
  pitch: {
    name: 'Pitch Night',
    base: '#0A1C15',
    surface: '#0E2019',
    surface2: '#12352A',
    accent: '#B6F04A',
    accent2: '#C6F24E',
    text: '#F4F8F1',
    muted: '#8FA89B',
    glow: 'rgba(182,240,74,0.35)',
  },
  fuel: {
    name: 'Fuel',
    base: '#1A1410',
    surface: '#231A14',
    surface2: '#2C2118',
    accent: '#F59E0B',
    accent2: '#FB7185',
    text: '#F4F4F1',
    muted: '#A89B8E',
    glow: 'rgba(245,158,11,0.35)',
  },
  heat: {
    name: 'Heat',
    base: '#0A0A0F',
    surface: '#14131A',
    surface2: '#1C1A24',
    accent: '#FF4D6D',
    accent2: '#FF8C42',
    text: '#F4F4F1',
    muted: '#9B97A8',
    glow: 'rgba(255,77,109,0.4)',
  },
  ice: {
    name: 'Ice',
    base: '#0A1622',
    surface: '#0E1F2C',
    surface2: '#12354A',
    accent: '#22D3EE',
    accent2: '#A78BFA',
    text: '#ECF6F8',
    muted: '#7FA3B5',
    glow: 'rgba(34,211,238,0.35)',
  },
  gold: {
    name: 'Stadium Gold',
    base: '#14120A',
    surface: '#1E1B14',
    surface2: '#2A2518',
    accent: '#FBBF24',
    accent2: '#F472B6',
    text: '#F7F2E3',
    muted: '#A8A08E',
    glow: 'rgba(251,191,36,0.35)',
  },
  light: {
    name: 'Light',
    base: '#F6F8F4',
    surface: '#FFFFFF',
    surface2: '#EEF2EC',
    accent: '#2E8B3E',
    accent2: '#12352A',
    text: '#0A1C15',
    muted: '#5F7468',
    glow: 'rgba(46,139,62,0.25)',
  },
};

export type ThemeKey = keyof typeof themes;
export type Theme = (typeof themes)[ThemeKey];

export const pillars: Record<string, ThemeKey> = {
  football: 'pitch',
  diet: 'fuel',
  workout: 'heat',
  recovery: 'ice',
};