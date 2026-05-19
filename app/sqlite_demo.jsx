// ============================================================
// Banco de Dados Local com SQLite — CRUD completo
//
// Dependências:
//   npx expo install expo-sqlite (incluído no Expo SDK 53+)
//
// Operações demonstradas:
//   CREATE — INSERT INTO people
//   READ   — SELECT * FROM people
//   UPDATE — UPDATE people SET name = ? WHERE id = ?
//   DELETE — DELETE FROM people WHERE id = ?
// ============================================================

import * as SQLite from "expo-sqlite";
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

export default function SqliteDemo() {
    const db = SQLite.openDatabaseSync("demo.db");

    const [name, setName] = useState("");
    const [items, setItems] = useState([]);
    const [editingId, setEditingId] = useState(null); // null = criar; número = editar

    useEffect(() => {
        db.execSync(
            "CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
        );
        fetchItems();
    }, []);

    // CREATE
    async function addItem() {
        if (!name.trim()) return;
        await db.runAsync("INSERT INTO people (name) VALUES (?);", [name]);
        clearForm();
        fetchItems();
    }

    // READ
    async function fetchItems() {
        const rows = await db.getAllAsync("SELECT * FROM people;");
        setItems(rows);
    }

    // UPDATE
    async function updateItem() {
        if (!name.trim()) return;
        await db.runAsync("UPDATE people SET name = ? WHERE id = ?;", [name, editingId]);
        clearForm();
        fetchItems();
    }

    // DELETE
    function deleteItem(id) {
        Alert.alert("Excluir", "Confirmar exclusão?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: async () => {
                    await db.runAsync("DELETE FROM people WHERE id = ?;", [id]);
                    fetchItems();
                },
            },
        ]);
    }

    function startEdit(item) {
        setEditingId(item.id);
        setName(item.name);
    }

    function clearForm() {
        setEditingId(null);
        setName("");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>SQLite — CRUD Completo</Text>

            <Text style={styles.modo}>
                {editingId ? `Editando ID ${editingId}` : "Novo registro"}
            </Text>

            <View style={styles.linha}>
                <TextInput
                    style={styles.entrada}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />
                <Button
                    title={editingId ? "Atualizar" : "Adicionar"}
                    onPress={editingId ? updateItem : addItem}
                />
                {editingId && (
                    <Button title="Cancelar" color="#888" onPress={clearForm} />
                )}
            </View>

            <Text style={styles.rotulo}>Pessoas ({items.length})</Text>
            <FlatList
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.item, editingId === item.id && styles.itemEditando]}>
                        <Text style={styles.itemTexto}>{item.id}. {item.name}</Text>
                        <TouchableOpacity onPress={() => startEdit(item)} style={styles.btnEditar}>
                            <Text style={styles.btnEditarTexto}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.btnExcluir}>
                            <Text style={styles.btnExcluirTexto}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhum dado ainda.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: "#fff" },
    titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
    modo: { fontSize: 13, color: "#6366f1", fontStyle: "italic", marginBottom: 12 },
    linha: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 },
    entrada: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 15,
    },
    rotulo: { fontSize: 13, fontWeight: "600", color: "#555", marginBottom: 8 },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    itemEditando: { backgroundColor: "#f0f0ff" },
    itemTexto: { flex: 1, fontSize: 15 },
    btnEditar: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: "#e0f2fe",
        borderRadius: 6,
        marginRight: 8,
    },
    btnEditarTexto: { color: "#0369a1", fontSize: 13 },
    btnExcluir: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: "#fee2e2",
        borderRadius: 6,
    },
    btnExcluirTexto: { color: "#dc2626", fontSize: 13 },
    vazio: { color: "#aaa", fontStyle: "italic", textAlign: "center", marginTop: 20 },
});
