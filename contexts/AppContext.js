/**
 * AppContext - Context API para configurações globais do app
 * 
 * Gerencia as configurações do usuário:
 * - locale: idioma selecionado (en, pt-BR, eo)
 * - themeMode: tema visual (light, dark, highContrast, automatic)
 * 
 * Permite que qualquer componente acesso e modifique as configurações.
 * 
 * Nota: Configurações são perdidas ao fechar o app (armazenamento em memória)
 * Para persistência, usar AsyncStorage (ver tutorial avançado)
 * 
 * Uso:
 *   const { locale, setLocale, themeMode, setThemeMode } = useAppContext();
 * 
 * @module contexts/AppContext
 * @version Versão simples em memória - para tutorial
 */

// ============================================
// IMPORTS
// Bibliotecas React
// ============================================

import React, { createContext, useState, useContext } from 'react';

// ============================================
// DEFINIÇÃO DE TIPOS (JSDoc)
// ============================================

/**
 * @typedef {'light' | 'dark' | 'highContrast' | 'automatic'} ThemeMode
 * @typedef {'en' | 'pt-BR' | 'eo'} Locale
 */

// ============================================
// CONTEXT
// ============================================

/**
 * AppContext: Context API React para configurações globais
 * 
 * Fornece:
 * - locale: Idioma atual do app
 * - setLocale: Função para alterar idioma
 * - themeMode: Modo de tema atual
 * - setThemeMode: Função para alterar tema
 */
const AppContext = createContext(undefined);

// ============================================
// COMPONENTE PROVIDER
// ============================================

/**
 * AppProvider - Componente que fornece o contexto para toda a app
 * 
 * Deve envolver toda a aplicação (ou parte dela) para disponibilizar
 * as configurações para todos os componentes.
 * 
 * @param {Object} props - Children (componentes filhos)
 */
export function AppProvider({ children }) {
  // ------------------------------------------
  // ESTADOS DO CONTEXT
  // ------------------------------------------
  
  /**
   * locale: Idioma atual do app
   * Padrão: 'pt-BR' (português)
   */
  const [locale, setLocaleState] = useState('pt-BR');
  
  /**
   * themeMode: Modo de tema atual
   * Padrão: 'automatic' (segue sistema)
   */
  const [themeMode, setThemeModeState] = useState('automatic');

  // ------------------------------------------
  // FUNÇÕES DE ALTERAÇÃO
  // ------------------------------------------
  
  /**
   * setLocale: Altera o idioma do app
   * 
   * @param {Locale} newLocale - Novo idioma (en, pt-BR, eo)
   */
  const setLocale = (newLocale) => {
    setLocaleState(newLocale);
  };

  /**
   * setThemeMode: Altera o modo de tema do app
   * 
   * @param {ThemeMode} newMode - Novo tema (light, dark, highContrast, automatic)
   */
  const setThemeMode = (newMode) => {
    setThemeModeState(newMode);
  };

  // ------------------------------------------
  // PROVIDER VALUE
  // ------------------------------------------
  
  const value = {
    locale,              // Idioma atual
    setLocale,           // Função para alterar idioma
    themeMode,           // Modo de tema atual
    setThemeMode,        // Função para alterar tema
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// ============================================
// HOOK PERSONALIZADO
// ============================================

/**
 * useAppContext - Hook para consumir o AppContext
 * 
 * @returns {Object} Estados e funções do context
 * @throws {Error} Se usado fora de AppProvider
 */
export function useAppContext() {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext deve ser usado dentro de AppProvider');
  }
  
  return context;
}

export default AppContext;