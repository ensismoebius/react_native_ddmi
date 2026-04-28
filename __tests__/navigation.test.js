describe('DDMI App', () => {
  it('should have jest configured correctly', () => {
    expect(true).toBe(true);
  });

  it('should load navigation constants', () => {
    const { DRAWER_SCREENS } = require('../constants/navigation');
    expect(DRAWER_SCREENS).toBeDefined();
    expect(Array.isArray(DRAWER_SCREENS)).toBe(true);
    expect(DRAWER_SCREENS.length).toBeGreaterThan(0);
  });

  it('should have home screen defined', () => {
    const { DRAWER_SCREENS } = require('../constants/navigation');
    const home = DRAWER_SCREENS.find(s => s.name === 'index');
    expect(home).toBeDefined();
    expect(home.label).toBe('Home');
  });
});