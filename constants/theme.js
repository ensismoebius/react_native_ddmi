/**
 * Arquivo de tema centralizado para padronização visual do app
 * Contém: cores, bordas (border-radius), sombras, espaçamento e tipografia
 * Uso: import { colors, spacing, typography } from '../constants/theme';
 */

// ============================================
// CORES DO APP
// Paleta de cores principais e semânticas
// ============================================

// Cores primárias da marca (azul)
export const colors = {
  // Cores primárias principales
  primary: '#007AFF',       // Azul principal do app
  primaryDark: '#0056CC',   // Azul mais escuro para hover/ativas
  primaryLight: '#E6F2FF', // Azul claro para backgrounds

  // Cores semânticas (significado contextual)
  success: '#10B981',       // Verde para sucesso
  successLight: '#D1FAE5',  // Verde claro para backgrounds de sucesso
  warning: '#F59E0B',       // Amarelo para avisos
  warningLight: '#FEF3C7', // Amarelo claro para backgrounds de aviso
  danger: '#EF4444',        // Vermelho para erros/perigo
  dangerLight: '#FEE2E2',   // Vermelho claro para backgrounds de erro
  info: '#06B6D4',          // Ciano para informações

  // Cores neutras (fundo, superfície, bordas)
  background: '#F1F5F9',    // Cor de fundo principal da tela
  surface: '#FFFFFF',       // Cor de superfície (cards, modsals)
  border: '#E2E8F0',        // Cor das bordas

  // Cores de texto
  text: '#0F172A',          // Texto principal (quase preto)
  textSecondary: '#64748B', // Texto secundário (cinza)
  textMuted: '#94A3B8',    // Texto desabilitado/mudo
  textInverse: '#FFFFFF',  // Texto sobre fundo escuro

  // Cores de acento por seção (para identificar categorias)
  accentRed: '#6366F1',    // Roxo - Rede e Dados
  accentCyan: '#06B6D4',   // Ciano - Sensores
  accentGreen: '#10B981',  // Verde - Mapas
  accentAmber: '#F59E0B',  // Âmbar - Notificações
  accentPurple: '#8B5CF6', // Roxo - Outros

  // Legacidade: nomes antigos em português (manter compatibilidade)
  // Nota: "fundo" é diferente de "fondo" (erro de digitação)
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
  fundo: '#F1F5F9',        // Nome correto em português
  fondo: '#F1F5F9',        // Para compatibilidade com código antigo
  superficie: '#FFFFFF',
  borda: '#E2E8F0',
  texto: '#0F172A',
  textSec: '#64748B',
  textoMudo: '#94A3B8',
  branco: '#FFFFFF',

  // Cores das seções do menu (para ícones e badges)
  rede: '#6366F1',         // Seção Rede e Dados
  sensores: '#06B6D4',     // Seção Sensores
  mapas: '#10B981',        // Seção Mapas
  notif: '#F59E0B',        // Seção Notificações
  outros: '#8B5CF6',       // Seção Outros
};

// ============================================
// RADIOS DE BORDA
// Valores de border-radius para componentes
// ============================================

export const radii = {
  xs: 4,    // Pequeno - chips, badges
  sm: 8,    // Pequeno-médio - botões pequenos
  md: 12,   // Médio - botões, inputs
  lg: 16,   // Large - cards besar
  xl: 24,   // Extra large - modals
  full: 999, // Circular - botões redondos, avatares
};

// ============================================
// SOMBRAS
// Configurações de sombra para dar profundidade
// ============================================

export const shadows = {
  sm: { 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.06, 
    shadowRadius: 3 
  },  // Sombra pequena - elementos discretos
  md: { 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8 
  },  // Sombra média - cards
  lg: { 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.14, 
    shadowRadius: 16 
  }, // Sombra grande - modals, elementos elevados
};

// ============================================
// ESPAÇAMENTO
// Sistema de espaços padding/margin
// ============================================

export const spacing = {
  xs: 4,   // Extra pequeno - muito compacto
  sm: 8,   // Pequeno - elementos juntos
  md: 12,  // Médio - padrão
  lg: 16,  // Large - separação padrão
  xl: 24,  // Extra large - seções
  xxl: 32, // Extra extra large - grandes margens
};

// ============================================
// TIPOGRAFIA
// Estilos de texto pré-definidos
// ============================================

export const typography = {
  h1: { fontSize: 32, fontWeight: '800', lineHeight: 38 },   // Título principal
  h2: { fontSize: 26, fontWeight: '700', lineHeight: 32 },   // Subtítulos grandes
  h3: { fontSize: 22, fontWeight: '700', lineHeight: 28 },    // Subtítulos
  h4: { fontSize: 18, fontWeight: '600', lineHeight: 24 },    // Títulos de seção
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 }, // Texto principal
  bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 }, // Texto pequeno
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },   // Legendas
};

// Export padrão para importação simplificada
export default { colors, radii, shadows, spacing, typography };