// ============================================================
// Guia de Upgrade — Expo SDK
//
// Dependências: nenhuma (apenas react-native core + ThemeContext local)
//   Contexto local: contexts/ThemeContext.js
// ============================================================

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

// ============================================
// DADOS — PASSOS DO UPGRADE
// ============================================

const PASSOS = [
  {
    id: 1,
    titulo: '1. Consultar o Changelog',
    descricao:
      'Antes de qualquer coisa, leia as novidades e breaking changes da nova versão em expo.dev/changelog. Identifique pacotes com APIs alteradas.',
    comando: null,
    aviso: null,
  },
  {
    id: 2,
    titulo: '2. Instalar nova versão do Expo',
    descricao:
      'Atualiza o pacote expo para a última versão estável. O npm recalcula as dependências transitivas.',
    comando: 'npm install expo@latest',
    aviso: null,
  },
  {
    id: 3,
    titulo: '3. Verificar dependências desatualizadas',
    descricao:
      'Lista todos os pacotes fora da versão esperada pelo SDK recém-instalado. Anote os pacotes reportados.',
    comando: 'npx expo install --check',
    aviso: null,
  },
  {
    id: 4,
    titulo: '4. Corrigir automaticamente',
    descricao:
      'Instala as versões corretas de todas as dependências reportadas pelo passo anterior.',
    comando: 'npx expo install --fix',
    aviso:
      'Se falhar por conflito de peer deps, copie a lista do --check e instale manualmente:\n  npm install pkg1@v1 pkg2@v2 ...',
  },
  {
    id: 5,
    titulo: '5. Atualizar sdkVersion no app.json',
    descricao:
      'No arquivo app.json, dentro do objeto "expo", altere sdkVersion para o número da nova versão (ex: "54.0.0").',
    comando: null,
    aviso: null,
  },
  {
    id: 6,
    titulo: '6. Checar breaking changes no código',
    descricao:
      'Revise os arquivos que usam pacotes com APIs alteradas. Expo Router, Reanimated e expo-av costumam ter mudanças entre major SDK versions.',
    comando: null,
    aviso: 'Atenção especial: expo-router (versão major muda API de Tabs/Drawer), react-native-reanimated (v3 → v4 remove animatedStyle inline).',
  },
  {
    id: 7,
    titulo: '7. Atualizar comentários de dependência',
    descricao:
      'Procure nos arquivos fonte os blocos de comentários "Dependências:" e atualize as versões para refletir o novo SDK.',
    comando: null,
    aviso: null,
  },
  {
    id: 8,
    titulo: '8. Testar todas as telas',
    descricao:
      'Inicie o servidor de desenvolvimento e navegue por todas as telas do app. Verifique sensores, câmera, notificações e banco de dados.',
    comando: 'npx expo start',
    aviso: null,
  },
];

// ============================================
// COMPONENTE — PASSO
// ============================================

function Passo({ passo, concluido, onToggle }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.passo,
        {
          backgroundColor: concluido ? theme.primary + '18' : theme.surface,
          borderColor: concluido ? theme.primary : theme.border,
        },
      ]}
      onPress={onToggle}
      activeOpacity={0.75}
    >
      {/* Cabeçalho: checkbox + título */}
      <View style={styles.passoHeader}>
        <View
          style={[
            styles.checkbox,
            {
              borderColor: concluido ? theme.primary : theme.border,
              backgroundColor: concluido ? theme.primary : 'transparent',
            },
          ]}
        >
          {concluido && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text
          style={[
            styles.passoTitulo,
            {
              color: concluido ? theme.primary : theme.text,
              textDecorationLine: concluido ? 'line-through' : 'none',
            },
          ]}
        >
          {passo.titulo}
        </Text>
      </View>

      {/* Descrição */}
      <Text style={[styles.passoDescricao, { color: theme.textSecondary }]}>
        {passo.descricao}
      </Text>

      {/* Comando (se houver) */}
      {passo.comando && (
        <View style={[styles.comandoBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
          <Text style={[styles.comandoTexto, { color: theme.text }]}>
            $ {passo.comando}
          </Text>
        </View>
      )}

      {/* Aviso (se houver) */}
      {passo.aviso && (
        <View style={[styles.avisoBox, { borderColor: '#f59e0b', backgroundColor: '#fef3c720' }]}>
          <Text style={[styles.avisoTexto, { color: '#b45309' }]}>
            ⚠ {passo.aviso}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// ============================================
// TELA PRINCIPAL
// ============================================

export default function UpgradeGuide() {
  const { theme } = useTheme();
  const [concluidos, setConcluidos] = useState(new Set());

  function togglePasso(id) {
    setConcluidos(prev => {
      const novo = new Set(prev);
      if (novo.has(id)) {
        novo.delete(id);
      } else {
        novo.add(id);
      }
      return novo;
    });
  }

  const total = PASSOS.length;
  const feitos = concluidos.size;
  const progresso = feitos / total;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.conteudo}
    >
      {/* Cabeçalho */}
      <Text style={[styles.titulo, { color: theme.text }]}>
        Upgrade do Expo SDK
      </Text>
      <Text style={[styles.subtitulo, { color: theme.textSecondary }]}>
        Checklist interativo — toque em cada passo ao concluí-lo
      </Text>

      {/* Barra de progresso */}
      <View style={[styles.progressoContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <View style={styles.progressoTextoRow}>
          <Text style={[styles.progressoLabel, { color: theme.text }]}>
            Progresso
          </Text>
          <Text style={[styles.progressoContador, { color: theme.primary }]}>
            {feitos}/{total}
          </Text>
        </View>
        <View style={[styles.progressoTrilha, { backgroundColor: theme.border }]}>
          <View
            style={[
              styles.progressoPreenchimento,
              {
                backgroundColor: feitos === total ? '#10b981' : theme.primary,
                width: `${progresso * 100}%`,
              },
            ]}
          />
        </View>
        {feitos === total && (
          <Text style={styles.parabens}>
            Upgrade concluído!
          </Text>
        )}
      </View>

      {/* Lista de passos */}
      {PASSOS.map(passo => (
        <Passo
          key={passo.id}
          passo={passo}
          concluido={concluidos.has(passo.id)}
          onToggle={() => togglePasso(passo.id)}
        />
      ))}

      {/* Rodapé */}
      <View style={[styles.rodape, { borderColor: theme.border }]}>
        <Text style={[styles.rodapeTexto, { color: theme.textSecondary }]}>
          Dica: após o upgrade, rode{'\n'}
          <Text style={{ fontWeight: '700', color: theme.text }}>
            npx expo install --check
          </Text>
          {'\n'}para confirmar que tudo está consistente.
        </Text>
      </View>
    </ScrollView>
  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    marginBottom: 20,
  },

  // Barra de progresso
  progressoContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  progressoTextoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressoLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressoContador: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressoTrilha: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressoPreenchimento: {
    height: 8,
    borderRadius: 4,
  },
  parabens: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
    color: '#10b981',
    textAlign: 'center',
  },

  // Passo
  passo: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 16,
    marginBottom: 12,
  },
  passoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  passoTitulo: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  passoDescricao: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },

  // Comando
  comandoBox: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
  },
  comandoTexto: {
    fontFamily: 'monospace',
    fontSize: 13,
  },

  // Aviso
  avisoBox: {
    borderRadius: 8,
    borderLeftWidth: 3,
    borderWidth: 1,
    padding: 10,
    marginTop: 6,
  },
  avisoTexto: {
    fontSize: 12,
    lineHeight: 18,
  },

  // Rodapé
  rodape: {
    marginTop: 12,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  rodapeTexto: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});
