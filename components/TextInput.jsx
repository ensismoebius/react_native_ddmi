/**
 * Componente TextInput - Campo de entrada de texto reutilizável
 * 
 * Funcionalidades:
 * - Suporte a diferentes tipos de teclado (texto, email, número)
 * - Modo senha (caracteres ocultos)
 * - Multi-linhas
 * - Estados: normal, erro, desabilitado
 * 
 * Uso:
 *   <TextInput
 *     value={texto}
 *     onChangeText={setTexto}
 *     placeholder="Digite aqui..."
 *     keyboardType="default"
 *   />
 */

// ============================================
// IMPORTS
// ============================================

import React from 'react';
import { 
  TextInput as RNTextInput, // TextInput nativo do React Native
  StyleSheet,               // Estilos CSS-in-JS
  Platform                 // Detecção de plataforma
} from 'react-native';

// Cores e bordas do tema centralizado
import { colors, radii } from '../constants/theme';

// ============================================
// PROPS
// ============================================

/**
 * @param {string} value - Valor atual do campo
 * @param {Function} onChangeText - Callback quando texto muda
 * @param {string} placeholder - Texto placeholder (dica)
 * @param {string} keyboardType - Tipo de teclado: 'default' | 'email-address' | 'numeric'
 * @param {boolean} secureTextEntry - Se true, oculta caracteres (senha)
 * @param {boolean} multiline - Se true, permite múltiplas linhas
 * @param {boolean} disabled - Se true, campo fica somente leitura
 * @param {boolean} error - Se true, mostra borda vermelha
 * @param {string} testID - ID para testes
 */

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export const TextInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',   // Padrão: teclado normal
  secureTextEntry = false,     // Padrão: não oculta texto
  multiline = false,           // Padrão: uma linha
  disabled = false,            // Padrão: habilitado
  error = false,               // Padrão: sem erro
  testID,
}) => {
  return (
    /**
     * RNTextInput: Campo de entrada nativo
     * Estilos são aplicados condicionalmente baseado nos props
     */
    <RNTextInput
      testID={testID}
      style={[
        styles.input,               // Estilo base
        error && styles.inputError, // Borda vermelha se erro
        disabled && styles.inputDisabled, // Fundo cinza se desabilitado
      ]}
      value={value}                          // Valor controlado
      onChangeText={onChangeText}           // Callback de mudança
      placeholder={placeholder}             // Texto de dica
      keyboardType={keyboardType}           // Tipo de teclado
      secureTextEntry={secureTextEntry}     // Modo senha
      multiline={multiline}                 // Múltiplas linhas
      editable={!disabled}                 // Permite edição?
      placeholderTextColor={colors.textMuted} // Cor do placeholder
    />
  );
};

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  input: {
    // Fundo branco (superfície)
    backgroundColor: colors.surface,
    // Borda fina cinza
    borderWidth: 1.5,
    borderColor: colors.border,
    // Cantos arredondados
    borderRadius: radii.md,
    // Preenchimento interno
    paddingHorizontal: 14, // Espaço nas laterais
    paddingVertical: 12,    // Espaço em cima/baixo
    // Fonte
    fontSize: 15,
    color: colors.text,    // Cor do texto digitado
  },
  // Estado de erro: borda vermelha
  inputError: {
    borderColor: colors.danger, // Vermelho do tema
  },
  // Estado desabilitado: fundo cinza e opacidade
  inputDisabled: {
    backgroundColor: colors.background,
    opacity: 0.6,
  },
});

export default TextInput;