/**
 * ThemeContext - Context API para gerenciamento de temas visuais
 * 
 * Fornece cores e estilos baseados no modo de tema selecionado:
 * - light: Cores claras (fundo branco, texto preto)
 * - dark: Cores escuras (fundo preto, texto branco)
 * - highContrast: Alto contraste (preto/branco intenso)
 * - automatic: Segue a configuração do sistema operacional
 * 
 * Integra-se com AppContext para obter o modo de tema atual.
 * 
 * Uso:
 *   const { theme, isDark } = useTheme();
 *   <View style={{ backgroundColor: theme.background }}>
 * 
 * @module contexts/ThemeContext
 */

// ============================================
// IMPORTS
// ============================================

import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useAppContext } from './AppContext';

// ============================================
// DEFINIÇÃO DE PALETAS DE CORES
// ============================================

/**
 * Paleta de cores para o tema LIGHT
 * Cores claras para uso diurno/padrão
 */
const lightTheme = {
  background: '#FFFFFF',  // Fundo branco
  surface: '#F1F5F9',     // Superfície cinza claro
  text: '#0F172A',        // Texto principal (quase preto)
  textSecondary: '#64748B', // Texto secundário (cinza)
  border: '#E2E8F0',      // Bordas
  primary: '#007AFF',     // Azul principal
  card: '#FFFFFF',        // Cards brancos
  statusBar: 'dark-content', // Status bar escuro
};

/**
 * Paleta de cores para o tema DARK
 * Cores escuras para uso noturno
 */
const darkTheme = {
  background: '#000000',   // Fundo preto
  surface: '#1C1C1E',      // Superfície cinza escuro
  text: '#FFFFFF',         // Texto branco
  textSecondary: '#8E8E93', // Texto cinza
  border: '#38383A',       // Bordas escuras
  primary: '#0A84FF',      // Azul (mais claro para dark)
  card: '#1C1C1E',         // Cards escuros
  statusBar: 'light-content', // Status bar claro
};

/**
 * Paleta de cores para HIGH CONTRAST
 * Máximo contraste para acessibilidade
 */
const highContrastTheme = {
  background: '#000000',  // Preto total
  surface: '#000000',      // Preto
  text: '#FFFFFF',        // Branco total
  textSecondary: '#FFFFFF', // Branco
  border: '#FFFFFF',      // Branco
  primary: '#FFFF00',      // Amarelo vibrante
  card: '#000000',        // Preto
  statusBar: 'light-content',
};

// ============================================
// CONTEXT
// ============================================

/**
 * ThemeContext: Context API para tema visual
 * 
 * Fornece:
 * - theme: Objeto com cores do tema atual
 * - isDark: boolean indicando se tema escuro
 * - highContrast: boolean indicando se alto contraste
 */
const ThemeContext = createContext(undefined);

// ============================================
// HELPER: Detectar tema automático
// ============================================

/**
 * getResolvedTheme - Resolve o tema baseado no modo automático
 * 
 * Se mode é 'automatic', usa o tema do sistema.
 * Se mode é 'light', 'dark' ou 'highContrast', usa diretamente.
 * 
 * @param {string} mode - Modo de tema (light, dark, highContrast, automatic)
 * @param {string|null} systemColorScheme - Tema do sistema (light, dark, null)
 * @returns {string} Tema resuelto (light, dark, highContrast)
 */
function getResolvedTheme(mode, systemColorScheme) {
  // Se é automático, segue o sistema
  if (mode === 'automatic') {
    // Se sistema é dark usa dark, senão light
    return systemColorScheme === 'dark' ? 'dark' : 'light';
  }
  // Se não é automático, retorna o que está configurado
  // Mas highContrast não vira dark
  return mode;
}

// ============================================
// COMPONENTE PROVIDER
// ============================================

/**
 * ThemeProvider - Provedor de tema visual
 * 
 * Deve ser filha do AppProvider (precisa do themeMode).
 * Calcula o tema resultante baseado no modo configurado.
 * 
 * @param {Object} props - Children (componentes filhos)
 */
export function ThemeProvider({ children }) {
  // Hook para detectar tema do sistema
  const systemColorScheme = useColorScheme();
  
  // Hook para obter modo de tema configurado
  const { themeMode } = useAppContext();
  
  // ------------------------------------------
  // MEMO: Calcular tema resultante
  // ------------------------------------------
  
  /**
   * useMemo: Calcula o tema apenas quando necessário
   * Garante que theme objeto não é recriado desnecessariamente
   * 
   * Resolve o tema final baseado no modo + sistema
   */
  const resolvedTheme = useMemo(() => {
    // Resolve o tema (automatic, light, dark, highContrast)
    const resolved = getResolvedTheme(themeMode, systemColorScheme);
    
    // Retorna paleta de cores sesuai tema resuelto
    switch (resolved) {
      case 'dark':
        return darkTheme;
      case 'highContrast':
        return highContrastTheme;
      default:
        return lightTheme;
    }
  }, [themeMode, systemColorScheme]); // Recalcula se mudar tema ou sistema

  // ------------------------------------------
  // BOOLEANS DO TEMA
  // ------------------------------------------
  
  /**
   * isDark: true se tema escuro está ativos
   * Usado para decisões específicas de UI
   */
  const isDark = resolvedTheme === darkTheme || resolvedTheme === highContrastTheme;
  
  /**
   * highContrast: true se alto contraste está ativo
   */
  const highContrast = themeMode === 'highContrast';

  // ------------------------------------------
  // VALOR DO CONTEXT
  // ------------------------------------------
  
  const value = {
    // Objeto com todas as cores do tema
    theme: resolvedTheme,
    // Booleans para decisões de UI
    isDark,
    highContrast,
    // Modo original configurado
    themeMode,
  };

  return (
    // Provider disponibilizando tema para a app
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================
// HOOK PERSONALIZADO
// ============================================

/**
 * useTheme - Hook para consumir o ThemeContext
 * 
 * Deve ser usado dentro de ThemeProvider.
 * 
 * @returns {Object} { theme, isDark, highContrast, themeMode }
 * @throws {Error} Se usado fora de ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  
  return context;
}

export default ThemeContext;