/**
 * Componente CustomDrawerContent - Conteúdo personalizado do menu lateral
 * 
 * Define o visual do menu drawer (navegação lateral):
 * - Cabeçalho com logo e nome do app
 * - Lista de links de navegação (gerada automaticamente)
 * 
 * Este componente substitui o conteúdo padrão do drawer do React Navigation
 * para adicionar identidade visual ao app.
 * 
 * Uso: Configurado em app/_layout.jsx no Drawer.Navigator
 */

// ============================================
// IMPORTS
// ============================================

import React from 'react';
import { 
  View,   // Container
  Text,   // Texto
  StyleSheet // Estilos
} from 'react-native';

// Ícones do Ionicons (pacote de ícones do Expo)
import { Ionicons } from '@expo/vector-icons';

// Componentes do React Navigation Drawer
import { 
  DrawerContentScrollView, // ScrollView do drawer (permite scroll se necessário)
  DrawerItemList           // Lista padrão de itens de navegação
} from '@react-navigation/drawer';

// Cores do tema
import { colors } from '../constants/theme';

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

/**
 * Componente CustomDrawerContent
 * @param {Object} props - Propriedades do React Navigation (contém state, descriptors, etc)
 * @returns {JSX.Element} UI do menu drawer
 */
export default function CustomDrawerContent(props) {
  return (
    /**
     * DrawerContentScrollView: ScrollView especial do drawer
     * Permite que a lista de itens role se não couber na tela
     * {...props} passa todas as propriedades do Navigation Drawer
     */
    <DrawerContentScrollView {...props}>
      
      {/* ========================================
          CABEÇALHO DO MENU
          Contiene logo e nome do app
          ======================================== */}
      <View style={styles.header}>
        {/* Ícone do app (foguete) */}
        <Ionicons 
          name="rocket"    // Nome do ícone
          size={40}        // Tamanho 40px
          color="#fff"     // Cor branca
        />
        {/* Nome do app */}
        <Text style={styles.headerText}>DDMI App</Text>
      </View>

      {/* ========================================
          ITENS DE NAVEGAÇÃO
          Lista automática das telas (DrawerItemList)
          ======================================== */}
      {/*
         DrawerItemList: Renderiza automaticamente todos os itens
         de navegação baseados na configuração de rotas.
         {...props} fornece o contexto de navegação necessário.
      */}
      <DrawerItemList {...props} />
      
    </DrawerContentScrollView>
  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  /**
   * Estilo do cabeçalho do menu
   * Fundo azul, centralizado, com espaçamento
   */
  header: {
    backgroundColor: colors.primary, // Azul principal do tema
    padding: 20,                     // Espaçamento interno
    alignItems: 'center',            // Centraliza horizontalmente
    marginBottom: 10,                // Espaço abaixo do cabeçalho
  },
  /**
   * Estilo do texto do nome do app
   * Branco, maior e em negrito
   */
  headerText: {
    color: '#fff',      // Branco
    fontSize: 20,       // Tamanho maior
    fontWeight: 'bold', // Negrito
    marginTop: 10,      // Espaço entre ícone e texto
  },
});