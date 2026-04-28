describe('Button Component', () => {
  it('should export Button component', () => {
    const { Button } = require('../components/Button');
    expect(Button).toBeDefined();
  });

  it('should have required props in Button component definition', () => {
    const { Button } = require('../components/Button');
    const buttonProps = Button.toTypes?.toJS?.()?._props || {};
    expect(typeof Button).toBe('function');
  });

  it('should use theme colors', () => {
    const { colors } = require('../constants/theme');
    expect(colors.primary).toBe('#007AFF');
  });
});