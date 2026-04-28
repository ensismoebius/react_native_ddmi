// App theme colors - centralized for consistent styling
export const colors = {
  // Primary brand colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#E6F2FF',

  // Semantic colors
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  info: '#06B6D4',

  // Neutral colors
  background: '#F1F5F9',
  surface: '#FFFFFF',
  border: '#E2E8F0',

  // Text colors
  text: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',

  // Section accent colors
  accentRed: '#6366F1',    // Network & Data
  accentCyan: '#06B6D4',  // Sensors
  accentGreen: '#10B981',   // Maps
  accentAmber: '#F59E0B',  // Notifications
  accentPurple: '#8B5CF6',  // Other

  // Legacy color names (for backward compatibility)
  primaria: '#6366F1',
  primariaEsc: '#4F46E5',
  primariaCla: '#E0E7FF',
  secundaria: '#06B6D4',
  perigo: '#EF4444',
  perigoClaro: '#FEE2E2',
  sucesso: '#10B981',
  sucessoClaro: '#D1FAE5',
  aviso: '#F59E0B',
  avisoClaro: '#FEF3C7',
  fundo: '#F1F5F9',
  superficie: '#FFFFFF',
  borda: '#E2E8F0',
  texto: '#0F172A',
  textoSec: '#64748B',
  textoMudo: '#94A3B8',
  branco: '#FFFFFF',

  // Section colors
  rede: '#6366F1',
  sensores: '#06B6D4',
  mapas: '#10B981',
  notif: '#F59E0B',
  outros: '#8B5CF6',
};

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const shadows = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 8 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.14, shadowRadius: 16 },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '800', lineHeight: 38 },
  h2: { fontSize: 26, fontWeight: '700', lineHeight: 32 },
  h3: { fontSize: 22, fontWeight: '700', lineHeight: 28 },
  h4: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
};

export default { colors, radii, shadows, spacing, typography };