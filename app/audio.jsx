// ============================================================
// Reprodução de Áudio — player com play/pause/stop
//
// Conceitos demonstrados:
//   - Audio.Sound.createAsync: carrega um arquivo de áudio
//   - sound.playAsync / pauseAsync / stopAsync: controle de reprodução
//   - sound.setOnPlaybackStatusUpdate: callback de progresso
//   - sound.unloadAsync: libera memória ao sair da tela
//   - require() para carregar arquivo local de assets
//
// Instalação:
//   npx expo install expo-av
//
// O arquivo de áudio usado: assets/sounds/oloco.mp3
// ============================================================

import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function PlayerDeAudio() {

    // Referência ao objeto Sound (não usa useState para evitar re-renders)
    // useRef preserva o valor entre renderizações sem causar re-render
    const soundRef = useRef(null);

    // Estado atual da reprodução
    const [tocando, setTocando] = useState(false);

    // Posição atual em milissegundos (ex: 3200 = 3.2 segundos)
    const [posicaoMs, setPosicaoMs] = useState(0);

    // Duração total do arquivo em milissegundos
    const [duracaoMs, setDuracaoMs] = useState(0);

    // Indica se o áudio ainda está carregando
    const [carregando, setCarregando] = useState(true);

    // --------------------------------------------------------
    // useEffect — carrega o arquivo de áudio ao abrir a tela
    // --------------------------------------------------------
    useEffect(() => {
        carregarAudio();

        // Cleanup: descarrega o áudio ao sair da tela
        // Importante para liberar memória e evitar vazamentos
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    // --------------------------------------------------------
    // carregarAudio — cria o objeto Sound a partir do arquivo local
    // --------------------------------------------------------
    async function carregarAudio() {
        try {
            // Audio.Sound.createAsync carrega o arquivo e retorna
            // { sound, status } — sound é o objeto de controle
            const { sound } = await Audio.Sound.createAsync(
                // require() carrega o arquivo de assets em tempo de build
                require("../assets/sounds/oloco.mp3"),
                { shouldPlay: false } // Não inicia automaticamente
            );

            soundRef.current = sound;

            // setOnPlaybackStatusUpdate — callback chamado ~4x por segundo
            // status contém: isPlaying, positionMillis, durationMillis, didJustFinish
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setTocando(status.isPlaying);
                    setPosicaoMs(status.positionMillis ?? 0);
                    setDuracaoMs(status.durationMillis ?? 0);

                    // Quando o áudio termina, reseta a posição para o início
                    if (status.didJustFinish) {
                        sound.setPositionAsync(0); // Volta para o início
                        setTocando(false);
                    }
                }
            });

            setCarregando(false);
        } catch (erro) {
            console.error("Erro ao carregar áudio:", erro);
            setCarregando(false);
        }
    }

    // --------------------------------------------------------
    // alternarPlay — alterna entre tocar e pausar
    // --------------------------------------------------------
    async function alternarPlay() {
        if (!soundRef.current) return;

        if (tocando) {
            // Pausa no ponto atual (retoma do mesmo lugar)
            await soundRef.current.pauseAsync();
        } else {
            // Inicia ou retoma a reprodução
            await soundRef.current.playAsync();
        }
    }

    // --------------------------------------------------------
    // parar — para a reprodução e volta ao início
    // --------------------------------------------------------
    async function parar() {
        if (!soundRef.current) return;
        // stopAsync para e retorna ao início (diferente de pauseAsync)
        await soundRef.current.stopAsync();
        await soundRef.current.setPositionAsync(0);
    }

    // --------------------------------------------------------
    // Helpers para exibir tempo no formato mm:ss
    // --------------------------------------------------------
    function formatarTempo(ms) {
        const totalSegundos = Math.floor(ms / 1000);
        const minutos = Math.floor(totalSegundos / 60);
        const segundos = totalSegundos % 60;
        // padStart(2, "0") — garante dois dígitos: 5 → "05"
        return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    }

    // Porcentagem de progresso (0 a 1) para a barra de progresso
    const progresso = duracaoMs > 0 ? posicaoMs / duracaoMs : 0;

    if (carregando) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator size="large" />
                <Text style={styles.textoCarregando}>Carregando áudio...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Player de Áudio</Text>
            <Text style={styles.nomeArquivo}>oloco.mp3</Text>

            {/* ---- Barra de progresso ---- */}
            <View style={styles.barraFundo}>
                {/*
                    A largura é calculada em porcentagem:
                    progresso vai de 0 (início) a 1 (fim)
                    Multiplicado por 100 dá o % da largura
                */}
                <View style={[styles.barraProgresso, { width: `${progresso * 100}%` }]} />
            </View>

            {/* Tempo atual / duração total */}
            <View style={styles.tempos}>
                <Text style={styles.tempo}>{formatarTempo(posicaoMs)}</Text>
                <Text style={styles.tempo}>{formatarTempo(duracaoMs)}</Text>
            </View>

            {/* ---- Controles ---- */}
            <View style={styles.controles}>
                {/* Botão parar (quadrado) */}
                <TouchableOpacity style={[styles.botao, styles.botaoParar]} onPress={parar}>
                    <Text style={styles.simbolo}>⏹</Text>
                </TouchableOpacity>

                {/* Botão play/pause (maior, destaque) */}
                <TouchableOpacity style={[styles.botao, styles.botaoPlay]} onPress={alternarPlay}>
                    {/* Alterna símbolo conforme estado */}
                    <Text style={[styles.simbolo, styles.simboloPlay]}>
                        {tocando ? "⏸" : "▶"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centralizado: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textoCarregando: {
        marginTop: 10,
        color: "#666",
    },
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "#1a1a2e", // Fundo escuro para ambientação de player
        justifyContent: "center",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginBottom: 6,
    },
    nomeArquivo: {
        fontSize: 14,
        color: "#aaa",
        textAlign: "center",
        marginBottom: 40,
    },
    barraFundo: {
        height: 6,
        backgroundColor: "#333",
        borderRadius: 3,
        overflow: "hidden",      // Garante que o preenchimento não ultrapasse a borda
        marginBottom: 8,
    },
    barraProgresso: {
        height: "100%",
        backgroundColor: "#6366f1", // Roxo
        borderRadius: 3,
    },
    tempos: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
    },
    tempo: {
        color: "#aaa",
        fontSize: 13,
    },
    controles: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    botao: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },
    botaoParar: {
        width: 52,
        height: 52,
        backgroundColor: "#333",
    },
    botaoPlay: {
        width: 72,
        height: 72,
        backgroundColor: "#6366f1", // Roxo — botão principal em destaque
    },
    simbolo: {
        fontSize: 22,
        color: "#fff",
    },
    simboloPlay: {
        fontSize: 28,
    },
});
