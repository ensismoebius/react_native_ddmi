import { useRouter } from "expo-router";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { cores, raio, sombra } from "../utilidades/estilos";

const secoes = [
  {
    titulo: "Rede & Dados",
    cor: cores.rede,
    itens: [
      { label: "CEP", rota: "/consultaCEP" },
      { label: "POST JSON", rota: "/postJson" },
      { label: "PHP", rota: "/postGetPhp" },
      { label: "Express", rota: "/expressUsers" },
    ],
  },
  {
    titulo: "Sensores",
    cor: cores.sensores,
    itens: [
      { label: "Acelerômetro", rota: "/sensor_accell" },
      { label: "Movimento", rota: "/sensor_motion" },
      { label: "Giroscópio", rota: "/sensor_gyroscope" },
      { label: "Magnetômetro", rota: "/sensor_magnetometer" },
    ],
  },
  {
    titulo: "Localização",
    cor: cores.mapas,
    itens: [
      { label: "GPS 1", rota: "/gps01" },
      { label: "GPS 2", rota: "/gps02" },
      { label: "Mapa 1", rota: "/mapa01" },
      { label: "Mapa 2", rota: "/mapa02" },
      { label: "Mapa 3", rota: "/mapa03" },
    ],
  },
  {
    titulo: "Notificações",
    cor: cores.notif,
    itens: [
      { label: "Notif 1", rota: "/notificacoes" },
      { label: "Notif 2", rota: "/notificacoes2" },
      { label: "Notif 3", rota: "/notificacoes3" },
    ],
  },
  {
    titulo: "Outros",
    cor: cores.outros,
    itens: [
      { label: "Teste", rota: "/teste" },
    ],
  },
];

function ItemBotao({ item, corDestaque }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.botao, { borderLeftColor: corDestaque }]}
      onPress={() => router.push(item.rota)}
      activeOpacity={0.7}
    >
      <Text style={styles.botaoTexto}>{item.label}</Text>
    </TouchableOpacity>
  );
}

function Secao({ dados }) {
  return (
    <View style={styles.secao}>
      <View style={styles.cabecalhoSecao}>
        <View style={[styles.indicador, { backgroundColor: dados.cor }]} />
        <Text style={styles.tituloSecao}>{dados.titulo}</Text>
      </View>
      <View style={styles.grade}>
        {dados.itens.map((item, i) => (
          <ItemBotao key={i} item={item} corDestaque={dados.cor} />
        ))}
      </View>
    </View>
  );
}

export default function Index() {
  return (
    <View style={styles.tela}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>DDMI</Text>
        <Text style={styles.subtitulo}>Demonstrações React Native</Text>
      </View>
      <ScrollView style={styles.lista} showsVerticalScrollIndicator={false}>
        {secoes.map((s, i) => (
          <Secao key={i} dados={s} />
        ))}
        <View style={styles.espaco} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: cores.primaria,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "800",
    color: cores.branco,
    letterSpacing: -1,
  },
  subtitulo: {
    fontSize: 15,
    color: "rgba(255,255,255,0.75)",
    marginTop: 4,
  },
  lista: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  secao: {
    marginBottom: 24,
  },
  cabecalhoSecao: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  indicador: {
    width: 4,
    height: 18,
    borderRadius: 2,
    marginRight: 10,
  },
  tituloSecao: {
    fontSize: 17,
    fontWeight: "700",
    color: cores.texto,
  },
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  botao: {
    backgroundColor: cores.superficie,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: raio.md,
    borderLeftWidth: 3,
    ...sombra.sm,
  },
  botaoTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: cores.texto,
  },
  espaco: {
    height: 40,
  },
});