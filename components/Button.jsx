/**
 * Componente Button - Botão reutilizável com variantes de estilo
 * 
 * Funcionalidades:
 * - Múltiplas variantes: primary, secondary, danger, ghost
 * - Estados: loading, disabled
 * - Tamanhos: small, medium, large
 * - Suporte a ícones
 * 
 * Uso:
 *   <Button 
 *     title="Continuar" 
 *     onPress={() => handlePress()}
 *     variant="primary"
 *     size="medium"
 *   />
 */

// ============================================
// IMPORTS
// Bibliotecas React Native e dependências do projeto
// ============================================

import React from 'react';
import { 
  TouchableOpacity,  // Componente clicável (botão)
  Text,              // Texto exibido no botão
  ActivityIndicator, // Indicador de carregamento
  StyleSheet,        // Estilos CSS-in-JS
  Platform           // Detecção de plataforma (iOS/Android)
} from 'react-native';

// Cores e bordas do tema centralizado
import { colors, radii } from '../constants/theme';

// ============================================
// PROPS (Parâmetros aceitos pelo componente)
// ============================================

/**
 * @param {string} title - Texto exibido no botão
 * @param {Function} onPress - Função chamada ao clicar
 * @param {string} variant - Estilo visual: 'primary' | 'secondary' | 'danger' | 'ghost'
 * @param {string} size - Tamanho: 'small' | 'medium' | 'large'
 * @param {boolean} disabled - Se verdadeiro, botão fica inativo
 * @param {boolean} loading - Se verdadeiro, mostra indicador de carregamento
 * @param {ReactNode} icon - Ícone (antes do texto)
 * @param {string} testID - ID para testes automatizados
 */

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export const Button = ({
  title,
  onPress,
  variant = 'primary',    // Padrão: botão azul principal
  size = 'medium',        // Padrão: tamanho médio
  disabled = false,       // Padrão: habilitado
  loading = false,        // Padrão: não está carregando
  icon,                   // Ícone opcional
  testID,
}) => {
  
  /**
   * Retorna os estilos de variante do botão
   * Cada variante tem uma cor de fundo e borda diferente
   */
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return styles.buttonSecondary; // Bordas coloridas, fundo transparente
      case 'danger':
        return styles.buttonDanger;   // Fundo vermelho
      case 'ghost':
        return styles.buttonGhost;    // Totalmente transparente
      default:
        return styles.buttonPrimary;  // Padrão: fundo azul
    }
  };

  /**
   * Retorna a cor do texto baseada na variante
   * Botões ghost e secondary têm texto colorido, outros têm texto branco
   */
  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
        return colors.primary;  // Azul para secondary
      case 'danger':
        return colors.textInverse; // Branco (texto inverso)
      case 'ghost':
        return colors.primary;  // Azul para ghost
      default:
        return colors.textInverse; // Branco para primary
    }
  };

  /**
   * Retorna os estilos de tamanho
   * Controla padding interno do botão
   */
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return styles.buttonSmall;   // Compacto
      case 'large':
        return styles.buttonLarge;   // Grande
      default:
        return styles.buttonMedium;  // Médio (padrão)
    }
  };

  // Botão fica desabilitado se disabled=true ou loading=true
  const isDisabled = disabled || loading;

  /**
   * Renderização do botão
   * - Se loading, mostra ActivityIndicator
   * - Se não, mostra ícone (opcional) + texto
   */
  return (
    <TouchableOpacity
      testID={testID}
      style={[
        styles.button,           // Estilosbase
        getVariantStyles(),      // Estilo de variante
        getSizeStyles(),         // Estilo de tamanho
        isDisabled && styles.buttonDisabled, // Estilo se desabilitado
      ]}
      onPress={onPress}         // Função ao clicar
      disabled={isDisabled}     // Desabilita se loading/disabled
      activeOpacity={0.7}       // Opacidade ao pressionar (efeito visual)
    >
      {loading ? (
        // ------------------------------------------
        // ESTADO: CARREGANDO
        // Mostra indicador de carregamento circular
        // ------------------------------------------
        <ActivityIndicator 
          color={getTextColor()} 
          size="small" 
        />
      ) : (
        // ------------------------------------------
        // ESTADO: NORMAL
        // Mostra ícone (se existir) + texto
        // ------------------------------------------
        <>
          {/* Renderiza ícone antes do texto se fornecido */}
          {icon}
          <Text
            style={[
              styles.buttonText,                    // Estilo base do texto
              { color: getTextColor() },           // Cor do texto
              variant === 'ghost' && styles.textGhost, // Estilo ghost
              size === 'small' && styles.textSmall,   // Texto pequeno
              size === 'large' && styles.textLarge,   // Texto grande
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

// ============================================
// ESTILOS (StyleSheet)
// Definição de todos os estilos visuais do componente
// ============================================

const styles = StyleSheet.create({
  // ------------------------------------------
  // ESTILOS BASE DO BOTÃO
  // ------------------------------------------
  button: {
    flexDirection: 'row',         // Ícone e texto lado a lado
    alignItems: 'center',         // Alinha verticalmente ao centro
    justifyContent: 'center',    // Alinha horizontalmente ao centro
    borderRadius: radii.md,       // Bordas arredondadas ( valor do tema)
    gap: 8,                       // Espaço entre ícone e texto
    // Sombra compatível com iOS e Android
    ...Platform.select({
      ios: {
        shadowColor: '#000',     // Cor da sombra (preto)
        shadowOffset: { width: 0, height: 2 }, // Deslocamento
        shadowOpacity: 0.1,       // Opacidade da sombra
        shadowRadius: 4,          // Desfoque da sombra
      },
      android: {
        elevation: 2,             // Sombra no Android (elevation)
      },
    }),
  },

  // ------------------------------------------
  // VARIANTES DE COR
  // ------------------------------------------
  buttonPrimary: {
    backgroundColor: colors.primary, // Azul principal
  },
  buttonSecondary: {
    backgroundColor: 'transparent', // Fundo transparente
    borderWidth: 1.5,               // Borda visível
    borderColor: colors.primary,    // Cor da borda azul
  },
  buttonDanger: {
    backgroundColor: colors.danger, // Vermelho de perigo
  },
  buttonGhost: {
    backgroundColor: 'transparent', // Totalmente transparente
    shadowOpacity: 0,               // Sem sombra
    elevation: 0,                   // Sem elevation no Android
  },

  // ------------------------------------------
  // TAMANHOS
  // ------------------------------------------
  buttonSmall: {
    paddingVertical: 8,     // Espaçamento vertical pequeno
    paddingHorizontal: 12,  // Espaçamento horizontal pequeno
  },
  buttonMedium: {
    paddingVertical: 12,    // Espaçamento vertical médio
    paddingHorizontal: 20, // Espaçamento horizontal médio
  },
  buttonLarge: {
    paddingVertical: 16,   // Espaçamento vertical grande
    paddingHorizontal: 28, // Espaçamento horizontal grande
  },

  // ------------------------------------------
  // ESTADO DESABILITADO
  // ------------------------------------------
  buttonDisabled: {
    opacity: 0.5,  // Transparência para indicar inatividade
  },

  // ------------------------------------------
  // ESTILOS DE TEXTO
  // ------------------------------------------
  buttonText: {
    fontSize: 15,       // Tamanho da fonte
    fontWeight: '600', // Peso semi-negrito
  },
  textSmall: {
    fontSize: 13, // Fonte menor parabotão small
  },
  textLarge: {
    fontSize: 17, // Fonte maior para botão large
  },
  textGhost: {
    color: colors.primary, // Texto azul para variante ghost
  },
});

// ============================================
// EXPORTS
// Permite importação padrão e nomeada
// ============================================

export default Button;