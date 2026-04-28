import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { colors, radii, shadows } from '../constants/theme';

export const Card = ({ children, style, testID }) => {
  return (
    <View testID={testID} style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: shadows.md.shadowColor,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default Card;