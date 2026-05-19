// ============================================================
// Layout Raiz — entry point do Expo Router com Drawer Navigator
//
// Dependências:
//   npx expo install expo-router                    (~5.1.11)
//   npx expo install @expo/vector-icons             (^14.1.0)
//   npx expo install react-native-safe-area-context (5.4.0)
//   npx expo install react-native-gesture-handler   (~2.24.0)
//   npx expo install @react-navigation/drawer       (^7.9.9)
//   npx expo install @react-navigation/native       (^7.1.6)
// ============================================================

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

import React, { useMemo } from 'react';
import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import '../i18n/index';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { DRAWER_SCREENS } from '../constants/navigation';
import { AppProvider } from '../contexts/AppContext';
import { ThemeProvider } from '../contexts/ThemeContext';

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
 *               └── Drawer (Navegador)
 * 
 * O Drawer é declarado diretamente no RootLayout para evitar 
 * re-montagens desnecessárias quando o tema ou idioma mudam.
 */
export default function RootLayout() {
  
  // ------------------------------------------
  // CONFIGURAÇÃO DO DRAWER
  // ------------------------------------------
  
  /**
   * Memorizamos as screenOptions para evitar que o Drawer 
   * re-renderize a cada mudança de estado no RootLayout.
   */
  const screenOptions = useMemo(() => ({
    headerStyle: { backgroundColor: '#007AFF' },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' },
    drawerActiveBackgroundColor: '#e6f2ff',
    drawerActiveTintColor: '#007AFF',
    drawerInactiveTintColor: '#333',
    drawerLabelStyle: { fontSize: 16, fontWeight: '500' },
  }), []);

  return (
    // GestureHandlerRootView: Container para gestos (necessário para drawer)
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProvider>
          <ThemeProvider>
            
            {/* 
              Drawer: Navegação lateral principal
              Sendo declarado aqui, ele não é recriado
              quando o tema ou idioma mudam (apenas re-renderiza).
            */}
            <Drawer
              drawerContent={(props) => (
                <CustomDrawerContent {...props} />
              )}
              screenOptions={screenOptions}
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
      </Drawer>
            
          </ThemeProvider>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}