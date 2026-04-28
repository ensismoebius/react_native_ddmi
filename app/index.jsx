/**
 * Tela Inicial (Home) do APP DDMI
 * 
 * Esta é a primeira tela exibida ao abrir o app.
 * Apresenta um menu organizado por seções com.botões
 * para navegar às diferentes funcionalidades:
 * - Rede & Dados (HTTP, API)
 * - Sensores (acelerômetro, giroscópio, etc)
 * - Localização (GPS, Mapas)
 * - Notificações
 * - Outros
 * 
 * Uso de internacionalização (i18n) para traduzir títulos.
 * 
 * @module app/index
 */

// ============================================
// IMPORTS
// Bibliotecas e hooks necessários
// ============================================

// useRouter: Hook do Expo Router para navegação entre telas
import { useRouter } from "expo-router";

// Componentes básicos do React Native
import { 
  Text,              // Componente de texto
  View,              // Container (div)
  ScrollView,        // Scroll vertical
  TouchableOpacity,  // Botão clicável
  StyleSheet         // Estilos CSS-in-JS
} from "react-native";

// Estilos centralizados (cores, bordas, sombras)
import { cores, raio, sombra } from "../utilidades/estilos";

// Hook de tradução (i18n)
import { useTranslation } from "../hooks/useTranslation";

// ============================================
// DADOS DAS SEÇÕES
// Define a estrutura do menu de navegação
// ============================================

/**
 * Array de seções exibidas na tela inicial
 * Cada seção contém:
 * - titulo: Nome da seção
 * - cor: Cor de destaque (usada no indicador e bordas)
 * - itens: Lista de botões com label e rota
 */
const secoes = [
  // ------------------------------------------
  // SEÇÃO: REDE E DADOS
  // Funcionalidades de comunicação com servidores
  // ------------------------------------------
  {
    titulo: "Rede & Dados",    // Título exibido
    cor: cores.rede,            // Cor de referência (roxo)
    itens: [
      { label: "CEP", rota: "/consultaCEP" },           // Busca CEP
      { label: "POST JSON", rota: "/postJson" },        // Enviar JSON
      { label: "PHP", rota: "/postGetPhp" },            // Teste PHP
      { label: "Express", rota: "/expressUsers" },     // API Express
    ],
  },

  // ------------------------------------------
  // SEÇÃO: SENSORES
  // Sensores disponíveis no dispositivo
  // ------------------------------------------
  {
    titulo: "Sensores",
    cor: cores.sensores,        // Cor ciano
    itens: [
      { label: "Acelerômetro", rota: "/sensor_accell" },     // Aceleração X, Y, Z
      { label: "Movimento", rota: "/sensor_motion" },        // Sensor de movimento
      { label: "Giroscópio", rota: "/sensor_gyroscope" },   // Rotação
      { label: "Magnetômetro", rota: "/sensor_magnetometer" }, // Campo magnético
    ],
  },

  // ------------------------------------------
  // SEÇÃO: LOCALIZAÇÃO
  // GPS e Mapas
  // ------------------------------------------
  {
    titulo: "Localização",
    cor: cores.mapas,           // Cor verde
    itens: [
      { label: "GPS 1", rota: "/gps01" },    // GPS estático
      { label: "GPS 2", rota: "/gps02" },    // GPS em tempo real
      { label: "Mapa 1", rota: "/mapa01" },  // Mapa básico (WebView)
      { label: "Mapa 2", rota: "/mapa02" },  // Mapa ao vivo
      { label: "Mapa 3", rota: "/mapa03" },  // Mapa manual
    ],
  },

  // ------------------------------------------
  // SEÇÃO: NOTIFICAÇÕES
  // Notificações locais
  // ------------------------------------------
  {
    titulo: "Notificações",
    cor: cores.notif,           // Cor âmbar
    itens: [
      { label: "Notif 1", rota: "/notificacoes" },    // Notificações básicas
      { label: "Notif 2", rota: "/notificacoes2" },  // Notificações com som
      { label: "Notif 3", rota: "/notificacoes3" },  // Notificações agendadas
    ],
  },

  // ------------------------------------------
  // SEÇÃO: OUTROS
  // Funcionalidades diversas
  // ------------------------------------------
  {
    titulo: "Outros",
    cor: cores.outros,          // Cor roxa
    itens: [
      { label: "Teste", rota: "/teste" },           // Tela de testes
    ],
  },
];

// ============================================
// COMPONENTES INTERNO
// ============================================

/**
 * ItemBotao - Botão individual de navegação
 * 
 * Representa um item clicável que leva a uma rota específica.
 * Exibe borda colorida à esquerda indicando a seção.
 * 
 * @param {Object} item - Objeto com {label, rota}
 * @param {string} corDestaque - Cor da borda esquerda
 */
function ItemBotao({ item, corDestaque }) {
  // Hook para navegar entre telas
  const router = useRouter();
  
  return (
    /**
     * TouchableOpacity: Botão clicável com feedback visual
     * style: borda colorida à esquerda baseada na seção
     * onPress: navega para a rota definida
     */
    <TouchableOpacity
      style={[styles.botao, { borderLeftColor: corDestaque }]}
      onPress={() => router.push(item.rota)}
      activeOpacity={0.7}       // Opacidade ao pressionar
    >
      <Text style={styles.botaoTexto}>{item.label}</Text>
    </TouchableOpacity>
  );
}

/**
 * Secao - Container de uma seção do menu
 * 
 * Renderiza o título da seção com um indicador de cor
 * e uma grade de botões/itens.
 * 
 * @param {Object} dados - Objeto da seção (titulo, cor, itens)
 */
function Secao({ dados }) {
  return (
    // Container da seção
    <View style={styles.secao}>
      {/* Cabeçalho: indicador colorido + título */}
      <View style={styles.cabecalhoSecao}>
        {/* Indicador visual de cor (barrinha colorida) */}
        <View style={[styles.indicador, { backgroundColor: dados.cor }]} />
        <Text style={styles.tituloSecao}>{dados.titulo}</Text>
      </View>
      
      {/* Grade de botões - organiza itens em linhas */}
      <View style={styles.grade}>
        {/* Mapeia cada item da seção em um botão */}
        {dados.itens.map((item, i) => (
          <ItemBotao key={i} item={item} corDestaque={dados.cor} />
        ))}
      </View>
    </View>
  );
}

// ============================================
// TELA PRINCIPAL (Index)
// ============================================

/**
 * Função principal da tela Inicial
 * Renderiza o cabeçalho + lista de seções em ScrollView
 */
export default function Index() {
  // Hook de tradução - obtém função t() para traduzir textos
  const { t } = useTranslation();
  
  // Traduz nome do app e subtítulo (fallback se tradução não disponível)
  const appName = t ? t('app.name') : 'DDMI';
  const subtitle = t ? t('app.subtitle') : 'Demonstrações React Native';
  
  return (
    // Container principal da tela
    <View style={styles.tela}>
      
      {/* ------------------------------------------
          CABEÇALHO
          Fundo azul, título grande, subtítulo
          ------------------------------------------ */}
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>{appName}</Text>
        <Text style={styles.subtitulo}>{subtitle}</Text>
      </View>

      {/* ------------------------------------------
          LISTA DE SEÇÕES
          ScrollView vertical com todas as seções
          ------------------------------------------ */}
      <ScrollView 
        style={styles.lista} 
        showsVerticalScrollIndicator={false} // Esconde indicador de scroll
      >
        {/* Mapeia cada seção e renderiza componente Secao */}
        {secoes.map((s, i) => (
          <Secao key={i} dados={s} />
        ))}
        
        {/* Espaço adicional no final para evitar corte */}
        <View style={styles.espaco} />
      </ScrollView>
      
    </View>
  );
}

// ============================================
// ESTILOS (StyleSheet)
// ============================================

const styles = StyleSheet.create({
  // Container principal ocupa toda a tela
  tela: {
    flex: 1,                    // Ocupa todo o espaço disponível
    backgroundColor: cores.fundo, // Fundo cinza claro
  },
  
  // ------------------------------------------
  // CABEÇALHO
  // ------------------------------------------
  cabecalho: {
    paddingHorizontal: 20,      // Espaçamento横向
    paddingTop: 60,             // Espaço do topo (status bar)
    paddingBottom: 24,          // Espaço embaixo
    backgroundColor: cores.primaria, // Fundo azul
    // Bordas arredondadas na parte inferior
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  titulo: {
    fontSize: 32,               // Tamanho grande
    fontWeight: "800",          // Extra negrito
    color: cores.branco,        // Texto branco
    letterSpacing: -1,          // Espaçamento entre letras negativo
  },
  subtitulo: {
    fontSize: 15,               // Tamanho médio
    color: "rgba(255,255,255,0.75)", // Branco com transparência
    marginTop: 4,              // Espaço acima
  },
  
  // ------------------------------------------
  // LISTA DE SEÇÕES
  // ------------------------------------------
  lista: {
    flex: 1,                   // Ocupa espaço restante
    paddingTop: 20,            // Espaço superior
    paddingHorizontal: 16,     // Espaçamento lateral
  },
  
  // ------------------------------------------
  // SEÇÃO
  // ------------------------------------------
  secao: {
    marginBottom: 24,          // Espaço entre seções
  },
  cabecalhoSecao: {
    flexDirection: "row",      // Linha horizontal
    alignItems: "center",      // Alinha verticalmente
    marginBottom: 12,         // Espaço abaixo do cabeçalho
    paddingHorizontal: 4,      // Pequeno espaçamento lateral
  },
  indicador: {
    width: 4,                 // Largura da barrinha
    height: 18,               // Altura
    borderRadius: 2,          // Bordas arredondadas
    marginRight: 10,          // Espaço à direita
  },
  tituloSecao: {
    fontSize: 17,              // Tamanho do título
    fontWeight: "700",         // Negrito
    color: cores.texto,        // Cor do texto principal
  },
  
  // ------------------------------------------
  // GRADE DE BOTÕES
  // ------------------------------------------
  grade: {
    flexDirection: "row",      // Itens em linha
    flexWrap: "wrap",          // Quebra linha se não couber
    gap: 10,                   // Espaço entre botões
  },
  botao: {
    backgroundColor: cores.superficie, // Fundo branco
    paddingVertical: 14,       // Espaço vertical interno
    paddingHorizontal: 18,    // Espaço horizontal interno
    borderRadius: raio.md,    // Bordas arredondadas médias
    borderLeftWidth: 3,        // Borda esquerda grossa (cor de destaque)
    ...sombra.sm,              // Sombra pequena
  },
  botaoTexto: {
    fontSize: 14,              // Tamanho do texto
    fontWeight: "600",         // Semi-negrito
    color: cores.texto,        // Cor do texto
  },
  
  // ------------------------------------------
  // ESPAÇO FINAL
  // ------------------------------------------
  espaco: {
    height: 40,                // Altura do espaço em branco
  },
});