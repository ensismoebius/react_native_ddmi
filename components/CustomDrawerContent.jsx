/**
 * Componente CustomDrawerContent - Conteúdo personalizado do menu lateral
 * 
 * Resolve problemas de toque no Android (itens inferiores não respondendo)
 * utilizando uma estrutura de View + ScrollView robusta.
 * 
 * @module components/CustomDrawerContent
 */

// ============================================
// IMPORTS
// Bibliotecas e componentes necessários
// ============================================

import React from 'react';
import { 
  View,             // Container básico
  Text,             // Componente de texto
  StyleSheet,       // Estilos CSS-in-JS
  ScrollView,       // Scroll vertical nativo
  TouchableOpacity  // Botão com feedback visual (não usado aqui, mas importado)
} from 'react-native';

// Ícones do Ionicons (pacote de ícones do Expo)
import { Ionicons } from '@expo/vector-icons';

// Componentes do React Navigation Drawer
import { 
  DrawerItemList           // Lista padrão de itens de navegação
} from '@react-navigation/drawer';

// Cores do tema centralizado
import { colors } from '../constants/theme';

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

/**
 * CustomDrawerContent - Renderiza o menu lateral personalizado
 * @param {Object} props - Propriedades do React Navigation (state, descriptors, navigation)
 * @returns {JSX.Element} UI do menu drawer
 */
export default function CustomDrawerContent(props) {
  // Desestruturação de propriedades para acesso fácil
  const { state, descriptors, navigation } = props;

  return (
    /**
     * View Root com flex: 1
     * Garante que o container ocupe toda a altura do Drawer,
     * evitando que itens no fundo fiquem fora da área de toque.
     */
    <View style={styles.root}>
      
      {/* ========================================
          CABEÇALHO FIXO
          Contém o logo e o nome do aplicativo
          ======================================== */}
      <View style={styles.header}>
        {/* Ícone decorativo (Foguete) */}
        <Ionicons 
          name="rocket" 
          size={40} 
          color="#fff" 
          pointerEvents="none" // Crucial: evita que o ícone roube eventos de toque do menu
        />
        {/* Nome do App */}
        <Text style={styles.headerText}>DDMI App</Text>
      </View>

      {/* ========================================
          SISTEMA DE SCROLL
          ScrollView nativo para evitar bugs de toque no Android
          ======================================== */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false} // Oculta barra de rolagem lateral
      >
        {/* 
          Container para a lista de itens
          Envolvemos o DrawerItemList para garantir que o layout não colapse
        */}
        <View style={styles.listContainer}>
          {/* Renderiza automaticamente os itens definidos no Navigator */}
          <DrawerItemList {...props} />
        </View>
        
        {/* 
          Espaçador de Fundo (Bottom Spacer)
          Garante que o último item seja clicável mesmo em aparelhos 
          com navegação por gestos do Android (barra inferior).
        */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
      
    </View>
  );
}

// ============================================
// ESTILOS (StyleSheet)
// ============================================

const styles = StyleSheet.create({
  // Container principal que preenche todo o Drawer
  root: {
    flex: 1,
    backgroundColor: colors.surface, // Cor de fundo do tema
  },
  // Estilo do cabeçalho (azul)
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  // Estilo do texto no cabeçalho
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  // Estilo do ScrollView
  scrollView: {
    flex: 1,
  },
  // Estilo do conteúdo interno do ScrollView
  scrollContent: {
    flexGrow: 1, // Expande conteúdo para preencher a tela
    paddingBottom: 20,
  },
  // Container da lista de links
  listContainer: {
    flex: 1,
    width: '100%',
  },
  // Espaço extra no final para evitar conflitos de toque
  bottomSpacer: {
    height: 50, 
    width: '100%',
  },
});