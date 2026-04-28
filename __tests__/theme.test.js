describe('Theme Constants', () => {
  const { colors, radii, shadows, spacing, typography } = require('../constants/theme');

  it('should have required color keys', () => {
    expect(colors.primary).toBe('#007AFF');
    expect(colors.success).toBe('#10B981');
    expect(colors.danger).toBe('#EF4444');
    expect(colors.text).toBe('#0F172A');
  });

  it('should have border radius values', () => {
    expect(radii.sm).toBe(8);
    expect(radii.md).toBe(12);
    expect(radii.lg).toBe(16);
  });

  it('should have spacing values', () => {
    expect(spacing.sm).toBe(8);
    expect(spacing.md).toBe(12);
    expect(spacing.lg).toBe(16);
  });

  it('should have typography definitions', () => {
    expect(typography.h1.fontSize).toBe(32);
    expect(typography.body.fontSize).toBe(16);
  });

  it('should maintain backward compatibility with legacy colors', () => {
    expect(colors.primaria).toBe('#6366F1');
    expect(colors.perigo).toBe('#EF4444');
    expect(colors.fundo).toBe('#F1F5F9');
  });
});