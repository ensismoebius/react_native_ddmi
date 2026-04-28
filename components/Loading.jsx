/**
 * Componente Loading - Indicador de carregamento
 * 
 * Exibe um indicador visual (spinner) para mostrar que algo
 * está sendo processado/carregado. Opcionalmente pode exibir
 * um texto descritivo abaixo do spinner.
 * 
 * Uso:
 *   <Loading size="large" color="#007AFF" text="Carregando dados..." />
 */

// ============================================
// IMPORTS
// ============================================

import React from 'react';
import { 
  View,               // Container
  ActivityIndicator, // Spinner circular de carregamento
  Text,               // Texto descritivo
  StyleSheet         // Estilos CSS-in-JS
} from 'react-native';

// Cores do tema centralizado
import { colors } from '../constants/theme';

// ============================================
// PROPS
// ============================================

/**
 * @param {string} size - Tamanho do indicador: 'small' | 'large'
 * @param {string} color - Cor do indicador (hex)
 * @param {string} text - Texto opcional exibido abaixo do spinner
 * @param {string} testID - ID para testes automatizados
 */

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export const Loading = ({ 
  size = 'large',           // Padrão: grande
  color = colors.primary,   // Padrão: azul principal
  text,                     // Texto opcional
  testID 
}) => {
  return (
    /**
     * View: Container centralizado
     * flex: 1 ocupa todo o espaço disponível
     * justifyContent/alignItems: centra conteúdo horizontal e verticalmente
     */
    <View style={styles.container} testID={testID}>
      {/* Spinner circular que indica carregamento */}
      <ActivityIndicator 
        size={size} 
        color={color} 
      />
      {/* Texto opcional - só exibe se for fornecido */}
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,                       // Ocupa todo o espaço disponível
    justifyContent: 'center',      // Centraliza verticalmente
    alignItems: 'center',          // Centraliza horizontalmente
    padding: 20,                   // Espaçamento interno
  },
  text: {
    marginTop: 12,                 // Espaço acima do texto
    fontSize: 14,                  // Tamanho de fonte
    color: colors.textSecondary,  // Cor cinza secundária
  },
});

export default Loading;