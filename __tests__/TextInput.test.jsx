describe('TextInput Component', () => {
  it('should export TextInput component', () => {
    const { TextInput } = require('../components/TextInput');
    expect(TextInput).toBeDefined();
  });

  it('should use theme colors', () => {
    const { colors } = require('../constants/theme');
    expect(colors.text).toBe('#0F172A');
    expect(colors.border).toBe('#E2E8F0');
  });

  it('should use proper border radius', () => {
    const { radii } = require('../constants/theme');
    expect(radii.md).toBe(12);
  });
});