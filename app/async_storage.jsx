// ============================================================
// AsyncStorage — armazenamento chave-valor persistente
//
// Conceitos demonstrados:
//   - AsyncStorage.setItem: salvar um valor
//   - AsyncStorage.getItem: ler um valor salvo
//   - AsyncStorage.removeItem: apagar um valor
//   - AsyncStorage.getAllKeys: listar todas as chaves salvas
//   - Os dados PERSISTEM entre sessões (fechou o app, ainda estão lá)
//   - Diferença de SQLite: chave-valor simples, ideal para preferências
//     e tokens de autenticação; não é banco relacional
//
// Instalação:
//   npx expo install @react-native-async-storage/async-storage
// ============================================================

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

// Chave fixa usada para salvar o nome do usuário
// Em apps reais: "token_jwt", "preferencias_usuario", "ultimo_login" etc.
const CHAVE_NOME = "@meuapp:nome_usuario";

export default function TelaAsyncStorage() {

    // Valor digitado no campo de texto
    const [texto, setTexto] = useState("");

    // Valor lido do AsyncStorage (o que foi salvo anteriormente)
    const [valorSalvo, setValorSalvo] = useState(null);

    // Lista de todas as chaves armazenadas (para exibir no rodapé)
    const [todasAsChaves, setTodasAsChaves] = useState([]);

    // Indica se está carregando (evita múltiplos cliques)
    const [carregando, setCarregando] = useState(false);

    // Mensagem de status (sucesso ou erro)
    const [mensagem, setMensagem] = useState("");

    // --------------------------------------------------------
    // useEffect — carrega o valor salvo ao abrir a tela
    // Demonstra que AsyncStorage persiste entre sessões
    // --------------------------------------------------------
    useEffect(() => {
        carregarValor();
        listarChaves();
    }, []);

    // --------------------------------------------------------
    // salvarValor — grava o texto digitado no AsyncStorage
    // --------------------------------------------------------
    async function salvarValor() {
        if (!texto.trim()) {
            setMensagem("Digite algo antes de salvar.");
            return;
        }

        setCarregando(true);
        try {
            // setItem(chave, valor) — ambos devem ser strings
            // Para objetos use: JSON.stringify(objeto)
            await AsyncStorage.setItem(CHAVE_NOME, texto);
            setMensagem("Salvo com sucesso!");
            setTexto(""); // Limpa o campo após salvar
            await carregarValor(); // Atualiza o que está exibido
            await listarChaves();  // Atualiza lista de chaves
        } catch (erro) {
            setMensagem("Erro ao salvar: " + erro.message);
        } finally {
            setCarregando(false);
        }
    }

    // --------------------------------------------------------
    // carregarValor — lê o valor associado à CHAVE_NOME
    // --------------------------------------------------------
    async function carregarValor() {
        try {
            // getItem retorna null se a chave não existir
            const valor = await AsyncStorage.getItem(CHAVE_NOME);
            setValorSalvo(valor); // null ou string
        } catch (erro) {
            setMensagem("Erro ao carregar: " + erro.message);
        }
    }

    // --------------------------------------------------------
    // apagarValor — remove a chave do storage
    // --------------------------------------------------------
    async function apagarValor() {
        setCarregando(true);
        try {
            await AsyncStorage.removeItem(CHAVE_NOME);
            setValorSalvo(null);
            setMensagem("Valor apagado.");
            await listarChaves();
        } catch (erro) {
            setMensagem("Erro ao apagar: " + erro.message);
        } finally {
            setCarregando(false);
        }
    }

    // --------------------------------------------------------
    // listarChaves — obtém todas as chaves salvas no storage
    // Útil para depurar o que está armazenado no app
    // --------------------------------------------------------
    async function listarChaves() {
        try {
            // getAllKeys retorna array com todos os nomes de chaves
            const chaves = await AsyncStorage.getAllKeys();
            setTodasAsChaves(chaves);
        } catch (erro) {
            console.error("Erro ao listar chaves:", erro);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>AsyncStorage</Text>
            <Text style={styles.descricao}>
                Dados salvos aqui persistem mesmo após fechar o app.
                Ideal para tokens, preferências e configurações simples.
            </Text>

            {/* ---- Campo de entrada ---- */}
            <Text style={styles.rotulo}>Valor para salvar</Text>
            <TextInput
                style={styles.entrada}
                value={texto}
                onChangeText={setTexto}
                placeholder="Ex: João da Silva"
            />

            {/* ---- Botões ---- */}
            <View style={styles.filaBotoes}>
                <View style={styles.botaoWrapper}>
                    <Button title="Salvar" onPress={salvarValor} />
                </View>
                <View style={styles.botaoWrapper}>
                    <Button title="Apagar" color="#ef4444" onPress={apagarValor} />
                </View>
            </View>

            {carregando && <ActivityIndicator style={{ marginTop: 8 }} />}

            {/* ---- Mensagem de retorno ---- */}
            {mensagem !== "" && (
                <Text style={styles.mensagem}>{mensagem}</Text>
            )}

            {/* ---- Valor atualmente salvo ---- */}
            <View style={styles.cartao}>
                <Text style={styles.rotuloCartao}>Valor salvo com a chave:</Text>
                <Text style={styles.chave}>{CHAVE_NOME}</Text>
                <Text style={styles.valorSalvo}>
                    {/* Mostra o valor ou avisa que está vazio */}
                    {valorSalvo !== null ? valorSalvo : "(nenhum valor salvo)"}
                </Text>
            </View>

            {/* ---- Lista de todas as chaves (debug) ---- */}
            <Text style={styles.rotulo}>Todas as chaves no storage ({todasAsChaves.length})</Text>
            <FlatList
                data={todasAsChaves}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.itemChave}>• {item}</Text>
                )}
                ListEmptyComponent={
                    <Text style={styles.vazio}>Nenhuma chave armazenada.</Text>
                }
            />
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
        color: "#1a1a1a",
        marginBottom: 4,
    },
    descricao: {
        fontSize: 13,
        color: "#666",
        marginBottom: 16,
        lineHeight: 20,
    },
    rotulo: {
        fontSize: 13,
        fontWeight: "600",
        color: "#555",
        marginBottom: 6,
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },
    entrada: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        marginBottom: 12,
    },
    filaBotoes: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 8,
    },
    botaoWrapper: {
        flex: 1,
    },
    mensagem: {
        marginTop: 8,
        padding: 10,
        backgroundColor: "#e0f2fe",
        borderRadius: 6,
        fontSize: 13,
        color: "#0369a1",
    },
    cartao: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 14,
        marginVertical: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    rotuloCartao: {
        fontSize: 12,
        color: "#888",
        marginBottom: 4,
    },
    chave: {
        fontSize: 12,
        fontFamily: "monospace",
        color: "#6366f1",
        marginBottom: 8,
    },
    valorSalvo: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    itemChave: {
        fontSize: 13,
        fontFamily: "monospace",
        color: "#444",
        paddingVertical: 3,
    },
    vazio: {
        fontSize: 13,
        color: "#aaa",
        fontStyle: "italic",
    },
});
