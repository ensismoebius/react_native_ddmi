import React from 'react';
import { TextInput as RNTextInput, StyleSheet, Platform } from 'react-native';
import { colors, radii } from '../constants/theme';

export const TextInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  disabled = false,
  error = false,
  testID,
}) => {
  return (
    <RNTextInput
      testID={testID}
      style={[
        styles.input,
        error && styles.inputError,
        disabled && styles.inputDisabled,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      editable={!disabled}
      placeholderTextColor={colors.textMuted}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.danger,
  },
  inputDisabled: {
    backgroundColor: colors.background,
    opacity: 0.6,
  },
});

export default TextInput;