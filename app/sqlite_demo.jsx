// npm install expo-sqlite

import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function SqliteDemo() {
    // 1. Open (or create) the database
    const db = SQLite.openDatabaseSync("demo.db");

    // State for input and items
    const [name, setName] = useState("");
    const [items, setItems] = useState([]);

    // 2. Create table if not exists
    useEffect(() => {
        db.execSync(
            "CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
        );
        fetchItems();
    }, []); // Only run once on mount

    // 3. Insert item
    function addItem() {
        if (!name.trim()) return;
        db.runAsync("INSERT INTO people (name) VALUES (?);", [name]).then(() => {
            setName("");
            fetchItems();
        });
    }

    // 4. Query items
    const fetchItems = () => {
        db.getAllAsync("SELECT * FROM people;").then((allRows) => {
            setItems(allRows);
        });
    };

    // 5. UI
    return (
        <View style={{ flex: 1, padding: 24, backgroundColor: "#fff" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
                Demonstração de Banco de Dados Local (SQLite)
            </Text>
            <Text>Passo 1: Abrir banco de dados</Text>
            <Text>Passo 2: Criar tabela se não existir</Text>
            <Text>Passo 3: Inserir dados</Text>
            <Text>Passo 4: Consultar dados</Text>
            <View style={{ flexDirection: "row", marginVertical: 12 }}>
                <TextInput
                    style={{ borderWidth: 1, borderColor: "#ccc", flex: 1, marginRight: 8, padding: 8 }}
                    placeholder="Digite o nome"
                    value={name}
                    onChangeText={setName}
                />
                <Button title="Adicionar" onPress={addItem} />
            </View>
            <Text style={{ marginBottom: 8 }}>Pessoas no banco:</Text>

            <FlatList
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={{ padding: 4 }}>{item.id}. {item.name}</Text>
                )}
                ListEmptyComponent={<Text style={{ color: '#888' }}>Nenhum dado ainda.</Text>}
            />
        </View>
    );
}
