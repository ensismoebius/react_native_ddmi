// ============================================================
// AsyncStorage — CRUD de notas (armazenamento chave-valor persistente)
//
// Dependências:
//   npx expo install @react-native-async-storage/async-storage
//
// Padrão usado: uma única chave armazena um array JSON com todos os registros.
// Operações demonstradas:
//   CREATE — adiciona item ao array e persiste com setItem
//   READ   — carrega array com getItem + JSON.parse ao montar
//   UPDATE — substitui item no array (map) e persiste com setItem
//   DELETE — remove item do array (filter) e persiste com setItem
//            removeItem limpa a chave inteira (DELETE ALL)
//
// Os dados PERSISTEM entre sessões (fechou o app, ainda estão lá).
// Diferença de SQLite: sem SQL, sem tabelas — ideal para listas simples,
// tokens de autenticação e preferências do usuário.
// ============================================================

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    Alert,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// Chave única que guarda o array completo de notas como JSON
const CHAVE_NOTAS = "@meuapp:notas";

export default function TelaAsyncStorage() {
    const [notas, setNotas] = useState([]);          // [{ id, texto }, ...]
    const [texto, setTexto] = useState("");
    const [editandoId, setEditandoId] = useState(null); // null = criar; id = editar

    useEffect(() => {
        carregarNotas();
    }, []);

    // READ — deserializa o array JSON salvo no storage
    async function carregarNotas() {
        const json = await AsyncStorage.getItem(CHAVE_NOTAS);
        setNotas(json ? JSON.parse(json) : []);
    }

    // Persiste o array atualizado e sincroniza o estado
    async function persistir(lista) {
        await AsyncStorage.setItem(CHAVE_NOTAS, JSON.stringify(lista));
        setNotas(lista);
    }

    // CREATE — acrescenta novo item ao array
    async function adicionarNota() {
        if (!texto.trim()) return;
        await persistir([...notas, { id: Date.now(), texto }]);
        setTexto("");
    }

    // UPDATE — substitui o texto do item no array
    async function atualizarNota() {
        if (!texto.trim()) return;
        await persistir(notas.map(n => n.id === editandoId ? { ...n, texto } : n));
        setTexto("");
        setEditandoId(null);
    }

    // DELETE — remove o item pelo id
    function excluirNota(id) {
        Alert.alert("Excluir", "Confirmar exclusão?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: () => persistir(notas.filter(n => n.id !== id)),
            },
        ]);
    }

    // DELETE ALL — remove a chave inteira do storage
    function excluirTudo() {
        Alert.alert("Limpar tudo", "Remove todas as notas do storage?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Limpar",
                style: "destructive",
                onPress: async () => {
                    await AsyncStorage.removeItem(CHAVE_NOTAS);
                    setNotas([]);
                },
            },
        ]);
    }

    function iniciarEdicao(nota) {
        setEditandoId(nota.id);
        setTexto(nota.texto);
    }

    function cancelarEdicao() {
        setEditandoId(null);
        setTexto("");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>AsyncStorage — CRUD</Text>
            <Text style={styles.descricao}>
                Notas salvas como array JSON em uma única chave.{"\n"}
                Dados persistem após fechar o app.
            </Text>

            <Text style={styles.modo}>
                {editandoId ? "Modo edição" : "Nova nota"}
            </Text>

            <TextInput
                style={styles.entrada}
                value={texto}
                onChangeText={setTexto}
                placeholder="Digite a nota..."
                multiline
            />

            <View style={styles.filaBotoes}>
                <View style={{ flex: 1 }}>
                    <Button
                        title={editandoId ? "Salvar edição" : "Adicionar"}
                        onPress={editandoId ? atualizarNota : adicionarNota}
                    />
                </View>
                {editandoId && (
                    <View style={{ flex: 1 }}>
                        <Button title="Cancelar" color="#888" onPress={cancelarEdicao} />
                    </View>
                )}
            </View>

            <View style={styles.cabecalho}>
                <Text style={styles.rotulo}>Notas ({notas.length})</Text>
                {notas.length > 0 && (
                    <TouchableOpacity onPress={excluirTudo}>
                        <Text style={styles.limparTudo}>Limpar tudo</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={notas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.item, editandoId === item.id && styles.itemEditando]}>
                        <Text style={styles.itemTexto}>{item.texto}</Text>
                        <TouchableOpacity onPress={() => iniciarEdicao(item)} style={styles.btnEditar}>
                            <Text style={styles.btnEditarTexto}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => excluirNota(item.id)} style={styles.btnExcluir}>
                            <Text style={styles.btnExcluirTexto}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.vazio}>Nenhuma nota salva.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: "#f5f5f5" },
    titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
    descricao: { fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 20 },
    modo: { fontSize: 13, color: "#6366f1", fontStyle: "italic", marginBottom: 6 },
    entrada: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        marginBottom: 10,
        minHeight: 60,
        textAlignVertical: "top",
    },
    filaBotoes: { flexDirection: "row", gap: 8, marginBottom: 16 },
    cabecalho: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    rotulo: { fontSize: 13, fontWeight: "600", color: "#555", textTransform: "uppercase" },
    limparTudo: { fontSize: 13, color: "#dc2626" },
    item: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    itemEditando: { borderColor: "#6366f1", borderWidth: 2 },
    itemTexto: { flex: 1, fontSize: 15, color: "#1a1a1a" },
    btnEditar: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: "#e0f2fe",
        borderRadius: 6,
        marginRight: 6,
    },
    btnEditarTexto: { color: "#0369a1", fontSize: 13 },
    btnExcluir: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: "#fee2e2",
        borderRadius: 6,
    },
    btnExcluirTexto: { color: "#dc2626", fontSize: 13 },
    vazio: { color: "#aaa", fontStyle: "italic", textAlign: "center", marginTop: 20 },
});
