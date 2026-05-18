// ============================================================
// Feedback Háptico — vibração e resposta tátil do dispositivo
//
// Conceitos demonstrados:
//   - expo-haptics: três tipos de vibração disponíveis
//   - ImpactFeedbackStyle: intensidade do impacto (leve, médio, forte)
//   - NotificationFeedbackType: feedback de resultado (sucesso, erro, aviso)
//   - selectionAsync: feedback sutil de seleção de item
//
// Instalação (já incluída no projeto):
//   npx expo install expo-haptics
// ============================================================

import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FeedbackHaptico() {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Feedback Háptico</Text>
            <Text style={styles.descricao}>
                Toque nos botões para sentir diferentes tipos de vibração.
                {"\n"}Funciona em dispositivos físicos (não em emuladores).
            </Text>

            {/* ---- Impacto ---- */}
            <Text style={styles.secao}>Impacto</Text>

            {/*
                ImpactAsync — simula colisão física
                Light   = toque leve (seleção de item)
                Medium  = toque médio (confirmação)
                Heavy   = toque forte (ação importante)
            */}
            <TouchableOpacity
                style={[styles.botao, styles.leve]}
                onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            >
                <Text style={styles.textoBotao}>Leve (Light)</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.botao, styles.medio]}
                onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
            >
                <Text style={styles.textoBotao}>Médio (Medium)</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.botao, styles.forte]}
                onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
            >
                <Text style={styles.textoBotao}>Forte (Heavy)</Text>
            </TouchableOpacity>

            {/* ---- Notificação ---- */}
            <Text style={styles.secao}>Notificação</Text>

            {/*
                notificationAsync — feedback de resultado de operação
                Success = padrão de "deu certo" (dois pulsos curtos)
                Error   = padrão de "deu errado" (três pulsos)
                Warning = padrão de "atenção" (pulso único prolongado)
            */}
            <TouchableOpacity
                style={[styles.botao, styles.sucesso]}
                onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
            >
                <Text style={styles.textoBotao}>Sucesso</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.botao, styles.erro]}
                onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)}
            >
                <Text style={styles.textoBotao}>Erro</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.botao, styles.aviso]}
                onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)}
            >
                <Text style={styles.textoBotao}>Aviso</Text>
            </TouchableOpacity>

            {/* ---- Seleção ---- */}
            <Text style={styles.secao}>Seleção</Text>

            {/*
                selectionAsync — vibração discreta usada ao navegar
                entre opções (ex: picker, tab bar, slider)
            */}
            <TouchableOpacity
                style={[styles.botao, styles.selecao]}
                onPress={() => Haptics.selectionAsync()}
            >
                <Text style={styles.textoBotao}>Seleção</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 6,
        color: "#1a1a1a",
    },
    descricao: {
        fontSize: 13,
        color: "#666",
        marginBottom: 20,
        lineHeight: 20,
    },
    secao: {
        fontSize: 15,
        fontWeight: "700",
        color: "#444",
        marginTop: 16,
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    botao: {
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 8,
    },
    textoBotao: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 15,
    },
    leve:    { backgroundColor: "#60a5fa" }, // Azul claro
    medio:   { backgroundColor: "#3b82f6" }, // Azul médio
    forte:   { backgroundColor: "#1d4ed8" }, // Azul escuro
    sucesso: { backgroundColor: "#10b981" }, // Verde
    erro:    { backgroundColor: "#ef4444" }, // Vermelho
    aviso:   { backgroundColor: "#f59e0b" }, // Âmbar
    selecao: { backgroundColor: "#8b5cf6" }, // Roxo
});
