/**
 * useI18n - Hook para sincronizar i18next com AppContext
 * 
 * Quando o idioma muda no AppContext, este hook atualiza
 * automaticamente o i18next para refletir a mudança.
 * 
 * Deve ser usado em componentes que precisam de traduções.
 * 
 * @module hooks/useI18n
 */

import { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import i18n from '../i18n/index';

/**
 * useI18n - Hook que mantém i18next sincronizado com AppContext
 * 
 * Este hook DEVE ser chamado dentro de AppProvider.
 * Ele observa mudanças de locale e atualiza o i18n.
 * 
 * Uso:
 *   function MyComponent() {
 *     useI18n();  // Sincroniza i18n com AppContext
 *     const { t } = useTranslation();
 *     return <Text>{t('key')}</Text>;
 *   }
 */
export function useI18n() {
  // Obtém locale atual do AppContext
  const { locale } = useAppContext();

  // Effect: atualiza i18n quando locale mudar
  useEffect(() => {
    // Muda o idioma ativo do i18next
    i18n.changeLanguage(locale);
  }, [locale]); // Executa quando locale mudar

  // Retorna instância do i18n (opcional)
  return i18n;
}

export default useI18n;