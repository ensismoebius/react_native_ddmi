/**
 * Componente Card - Container com bordas arredondadas e sombra
 * 
 * Usado para agrupar conteúdo relacionado em uma "caixa" visual
 * com background branco, cantos arredondados e sombra sutil.
 * 
 * Uso:
 *   <Card>
 *     <Text>Conteúdo do card</Text>
 *   </Card>
 */

// ============================================
// IMPORTS
// ============================================

import React from 'react';
import { 
  View,         // Container básico
  StyleSheet,   // Estilos CSS-in-JS
  Platform      // Detecção de plataforma (iOS/Android)
} from 'react-native';

// Cores, bordas e sombras do tema centralizado
import { colors, radii, shadows } from '../constants/theme';

// ============================================
// PROPS
// ============================================

/**
 * @param {ReactNode} children - Conteúdo dentro do card
 * @param {Object} style - Estilos adicionais (opcional)
 * @param {string} testID - ID para testes automatizados
 */

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export const Card = ({ children, style, testID }) => {
  return (
    /**
     * View: Container que envolve o conteúdo
     * style: Combina estilos base do card + estilos personalizados
     */
    <View testID={testID} style={[styles.card, style]}>
      {children}
    </View>
  );
};

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  card: {
    // Fundo branco (superfície do tema)
    backgroundColor: colors.surface,
    // Cantos arredondados grandes
    borderRadius: radii.lg,
    // Preenchimento interno
    padding: 16,
    // Sombra compatível com iOS e Android
    ...Platform.select({
      ios: {
        shadowColor: shadows.md.shadowColor,    // Cor da sombra (preto)
        shadowOffset: { width: 0, height: 3 }, // Deslocamento
        shadowOpacity: 0.1,                     // Opacidade
        shadowRadius: 8,                        // Desfoque
      },
      android: {
        elevation: 3,  // Sombra Android
      },
    }),
  },
});

// Export para permitir importação nomeada
export default Card;