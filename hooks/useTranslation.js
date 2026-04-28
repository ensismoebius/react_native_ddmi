/**
 * Hook personalizado para tradução (internacionalização/i18n)
 * Wrapper ao redor do react-i18next para simplificação de uso
 * Uso: const { t } = useTranslation();
 */

// ============================================
// IMPORTS
// ============================================

// Importa o hook padrão do react-i18next
// Fornece a função t() para traduzir textos
import { useTranslation as useI18nTranslation } from 'react-i18next';

/**
 * Hook principal para traduções
 * Exemplo de uso:
 *   const { t, i18n } = useTranslation();
 *   <Text>{t('nav.home')}</Text>
 * 
 * @returns {Object} Objeto com:
 *   - t: função de tradução (chaves → textos traduzidos)
 *   - i18n: instância do i18next (para mudar idioma manualmente)
 *   - ready: booleano indicando se as traduções carregaram
 */
export const useTranslation = () => {
  // Retorna o hook nativo do react-i18next
  return useI18nTranslation();
};

/**
 * Lista de idiomas suportados pelo app
 * Usado para exibir opções de idioma em UI (selector de idioma)
 * 
 * @type {Array<{code: string, name: string, nativeName: string}>}
 */
export const supportedLanguages = [
  { 
    code: 'en',              // Código do idioma (usado no i18n)
    name: 'English',          // Nome em inglês
    nativeName: 'English'     // Nome no próprio idioma
  },
  { 
    code: 'pt-BR', 
    name: 'Portuguese', 
    nativeName: 'Português (Brasil)' 
  },
  // Adicionar novos idiomas aqui:
  // { code: 'eo', name: 'Esperanto', nativeName: 'Esperanto' },
];

/**
 * Export padrão - mantém compatibilidade com imports antigos
 * Mantém o mesmo comportamento do hook nativo
 */
export default useI18nTranslation;