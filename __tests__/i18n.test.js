describe('i18n Configuration', () => {
  beforeAll(async () => {
    const i18n = require('../i18n/index').default;
    await i18n.init();
  });

  it('should load English translations', () => {
    const i18n = require('../i18n/index').default;
    expect(i18n.store.data.en).toBeDefined();
  });

  it('should load Portuguese translations', () => {
    const i18n = require('../i18n/index').default;
    expect(i18n.store.data['pt-BR']).toBeDefined();
  });

  it('should have app name in translations', () => {
    const i18n = require('../i18n/index').default;
    expect(i18n.t('app.name')).toBe('DDMI');
  });

  it('should have navigation items in translations', () => {
    const i18n = require('../i18n/index').default;
    expect(i18n.t('nav.home')).toBeDefined();
  });

  it('should translate to Portuguese', () => {
    const i18n = require('../i18n/index').default;
    i18n.changeLanguage('pt-BR');
    expect(i18n.t('nav.home')).toBe('Início');
  });
});