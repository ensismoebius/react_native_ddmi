/**
 * Layout Raiz do App - Configuração de Navegação e Providers
 * 
 * Este arquivo é o entry point do expo-router.
 * Configura:
 * - Providers de contexto (App e Tema)
 * - Navegação drawer (menu lateral)
 * - Estilos do header e drawer
 * - Telas disponíveis no menu
 * 
 * @module app/_layout
 */

// ============================================
// IMPORTS
// Bibliotecas e componentes necessários
// ============================================

import React, { useEffect } from 'react';
import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import '../i18n/index';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { DRAWER_SCREENS } from '../constants/navigation';
import { AppProvider, useAppContext } from '../contexts/AppContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import i18n from '../i18n/index';

// ============================================
// COMPONENTE: Sincronizador de I18n
// ============================================

/**
 * I18nSyncer - Componente interno para sincronizar i18next com locale
 * 
 * Este componente escuta mudanças de locale no AppContext
 * e atualiza o i18next automaticamente.
 * 
 * Sem este componente, mudanças de idioma não funcionariam.
 */
function I18nSyncer() {
  // Hook de contexto para obter locale atual
  const { locale } = useAppContext();
  
  // Effect: executa quando locale mudar
  useEffect(() => {
    // Muda o idioma ativo do i18next para o locale atual
    i18n.changeLanguage(locale);
  }, [locale]);
  
  // Este componente não renderiza nada (null)
  return null;
}

// ============================================
// COMPONENTE: Provedor de Tema com I18n
// ============================================

/**
 * ThemedApp - Wrapper que adiciona sincronização de i18n
 * 
 * Estrutura:
 * ThemeProvider
 *   ├── I18nSyncer (sincroniza locale)
 *   └── Drawer (navegação)
 */
function ThemedApp() {
  return (
    <>
      {/* Componente invisível que sincroniza i18n */}
      <I18nSyncer />
      
      {/* Navegação drawer */}
      <Drawer
        drawerContent={(props) => (
          <CustomDrawerContent {...props} />
        )}
        screenOptions={{
          // Estilo do header
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          
          // Estilo do drawer (menu lateral)
          drawerActiveBackgroundColor: '#e6f2ff',
          drawerActiveTintColor: '#007AFF',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: { fontSize: 16, fontWeight: '500' },
        }}
      >
        {/* Mapeia todas as telas do menu */}
        {DRAWER_SCREENS.map((screen) => (
          <Drawer.Screen 
            key={screen.name}
            name={screen.name} 
            options={{ 
              drawerLabel: screen.label, 
              title: screen.title,
              drawerIcon: ({ color }) => (
                <Ionicons name={screen.icon} size={22} color={color} />
              )
            }} 
          />
        ))}
        
        {/* Tela de Configurações */}
        <Drawer.Screen 
          name="settings"
          options={{ 
            drawerLabel: '⚙️ Configurações', 
            title: 'Configurações',
            drawerIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={22} color={color} />
            )
          }} 
        />
      </Drawer>
    </>
  );
}

// ============================================
// LAYOUT PRINCIPAL (RAIZ)
// ============================================

/**
 * RootLayout - Componente raiz do app
 * 
 * Estrutura hierárquica:
 * GestureHandlerRootView
 *   └── SafeAreaProvider
 *       └── AppProvider
 *           └── ThemeProvider
 *               └── ThemedApp (Drawer + I18nSyncer)
 */
export default function RootLayout() {
  return (
    // GestureHandlerRootView: Container para gestos (necessário para drawer)
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AppProvider>
          <ThemeProvider>
            <ThemedApp />
          </ThemeProvider>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Ocupa toda a tela
  },
});