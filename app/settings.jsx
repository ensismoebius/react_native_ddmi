/**
 * Tela de Configurações (Settings)
 * 
 * Permite ao usuário personalizar:
 * - Idioma do app (Português, Inglês, Esperanto)
 * - Tema visual (Claro, Escuro, Alto Contraste, Automático)
 * 
 * As configurações são salvas em memória (AppContext)
 * e aplicadas imediatamente à toda a app.
 * 
 * @module app/settings
 */

// ============================================
// IMPORTS
// ============================================

import React from 'react';
import { 
  View,           // Container principal
  Text,           // Textos
  StyleSheet,     // Estilos
  TouchableOpacity // Botões clicáveis
} from 'react-native';

// Hook de contexto (obter/alterar configurações)
import { useAppContext } from '../contexts/AppContext';

// Hook de tema (obter cores atuais)
import { useTheme } from '../contexts/ThemeContext';

// ============================================
// OPÇÕES DISPONÍVEIS
// ============================================

/**
 * idiomas: Opções de idioma disponíveis
 * code: valor salvo no estado
 * label: texto exibido na tela
 */
const idiomas = [
  { code: 'pt-BR', label: 'Português (Brasil)' },
  { code: 'en', label: 'English' },
  { code: 'eo', label: 'Esperanto' },
];

/**
 * temas: Opções de tema visual disponíveis
 * code: valor salvo no estado
 * label: texto exibido na tela
 */
const temas = [
  { code: 'light', label: 'Claro (Light)' },
  { code: 'dark', label: 'Escuro (Dark)' },
  { code: 'highContrast', label: 'Alto Contraste' },
  { code: 'automatic', label: 'Automático (Sistema)' },
];

// ============================================
// COMPONENTES AUXILIARES
// ============================================

/**
 * OpcaoSelecionavel - Botão de seleção única
 * 
 * Exibe uma opção que pode ser selecionada.
 * Mostra-checkmark se estiver selecionada.
 * 
 * @param {Object} props
 * @param {string} props.label - Texto da opção
 * @param {boolean} props.selecionada - Se está selecionada
 * @param {Function} props.onPress - Callback ao clicar
 */
function OpcaoSelecionavel({ label, selecionada, onPress }) {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.opcao,                    // Estilo base
        { 
          borderColor: theme.border,    // Borda com cor do tema
          backgroundColor: selecionada ? theme.primary + '20' : 'transparent' // Fundo se selecionada
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.opcaoTexto, { color: theme.text }]}>
        {label}
      </Text>
      {/*-checkmark se selecionada */}
      {selecionada && (
        <Text style={[styles.checkmark, { color: theme.primary }]}>✓</Text>
      )}
    </TouchableOpacity>
  );
}

/**
 * SecaoConfig - Seção com título e opções
 * 
 * @param {Object} props
 * @param {string} props.titulo - Título da seção
 * @param {Array} props.opcoes - Lista de opções
 * @param {string} props.valorAtual - Valor atualmente selecionado
 * @param {Function} props.onValorChange - Callback quando valor muda
 */
function SecaoConfig({ titulo, opcoes, valorAtual, onValorChange }) {
  const { theme } = useTheme();
  
  return (
    <View style={styles.secao}>
      <Text style={[styles.tituloSecao, { color: theme.text }]}>
        {titulo}
      </Text>
      <View style={styles.opcoesContainer}>
        {opcoes.map((opcao) => (
          <OpcaoSelecionavel
            key={opcao.code}
            label={opcao.label}
            selecionada={valorAtual === opcao.code}
            onPress={() => onValorChange(opcao.code)}
          />
        ))}
      </View>
    </View>
  );
}

// ============================================
// TELA PRINCIPAL
// ============================================

/**
 * Settings - Componente principal da tela de configurações
 * 
 * Exibe seções para selecionar idioma e tema.
 * Usa AppContext para obter/alterar configurações.
 */
export default function Settings() {
  // ------------------------------------------
  // HOOKS DE CONTEXT
  // ------------------------------------------
  
  // Obter configurações atuais do context
  const { locale, setLocale, themeMode, setThemeMode } = useAppContext();
  
  // Obter tema atual (para estilização)
  const { theme } = useTheme();

  // ------------------------------------------
  // RENDERIZAÇÃO
  // ------------------------------------------
  
  return (
    // Container principal com padding
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Seção de Idioma */}
      <SecaoConfig
        titulo="🌐 Idioma / Language"
        opcoes={idiomas}
        valorAtual={locale}
        onValorChange={setLocale}
      />

      {/* Seção de Tema */}
      <SecaoConfig
        titulo="🎨 Tema Visual"
        opcoes={temas}
        valorAtual={themeMode}
        onValorChange={setThemeMode}
      />

      {/* ------------------------------------------
          INFORMAÇÕES ADICIONAIS
          Explica o que cada tema faz
          ------------------------------------------ */}
      <View style={[styles.infoBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.infoTitulo, { color: theme.text }]}>
          💡 Dicas:
        </Text>
        <Text style={[styles.infoTexto, { color: theme.textSecondary }]}>
          • Claro: Ideal para ambientes iluminados{'\n'}
          • Escuro: Melhor para ambientes escuros{'\n'}
          • Alto Contraste: Acessibilidade{'\n'}
          • Automático: Segue seu sistema
        </Text>
      </View>

    </View>
  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    padding: 20,
  },
  
  // Seção de configurações
  secao: {
    marginBottom: 32,          // Espaço entre seções
  },
  
  // Título da seção
  tituloSecao: {
    fontSize: 20,               // Tamanho grande
    fontWeight: '700',          // Negrito
    marginBottom: 16,           // Espaço abaixo do título
  },
  
  // Container de opções
  opcoesContainer: {
    gap: 12,                   // Espaço entre botões
  },
  
  // Botão de opção
  opcao: {
    flexDirection: 'row',      // Linha: texto + checkmark
    justifyContent: 'space-between', // Espaço entre elementos
    alignItems: 'center',       // Centraliza verticalmente
    padding: 16,               // Espaçamento interno
    borderRadius: 12,          // Bordas arredondadas
    borderWidth: 1.5,          // Espessura da borda
  },
  
  // Texto da opção
  opcaoTexto: {
    fontSize: 16,              // Tamanho de fonte
    fontWeight: '500',         // Semi-negrito
  },
  
  // Checkmark de seleção
  checkmark: {
    fontSize: 20,              // Tamanho do check
    fontWeight: 'bold',        // Negrito
  },
  
  // Box de informações
  infoBox: {
    marginTop: 20,             // Espaço acima
    padding: 16,               // Espaçamento interno
    borderRadius: 12,          // Bordas arredondadas
    borderWidth: 1,            // Borda fina
  },
  
  // Título do info
  infoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  
  // Texto do info
  infoTexto: {
    fontSize: 14,
    lineHeight: 24,            // Altura da linha (espaçamento)
  },
});