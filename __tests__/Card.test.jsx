describe('Card Component', () => {
  it('should export Card component', () => {
    const { Card } = require('../components/Card');
    expect(Card).toBeDefined();
  });

  it('should use theme colors', () => {
    const { colors } = require('../constants/theme');
    expect(colors.surface).toBe('#FFFFFF');
  });

  it('should use proper border radius', () => {
    const { radii } = require('../constants/theme');
    expect(radii.lg).toBe(16);
  });
});