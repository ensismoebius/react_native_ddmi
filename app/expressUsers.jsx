// ============================================================
// CRUD de Usuários com Express.js
//
// Dependências:
//   nenhuma nova — usa apenas React Native e fetch() nativo
//
// Requisito externo:
//   Servidor Express rodando em API_BASE (GET/POST/PUT/DELETE /users)
//   Ajuste API_BASE para o IP local da máquina na rede
// ============================================================

import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const API_BASE = 'http://localhost:5173/api/users';

export default function ExpressUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_BASE);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setUsers(data);
        } catch (e) {
            setError('Falha ao carregar usuários: ' + e.message);
        } finally {
            setLoading(false);
        }
    }

    async function saveUser() {
        if (!name.trim() || !email.trim()) {
            setError('Nome e e-mail são obrigatórios.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const url = editingUser ? `${API_BASE}/${editingUser.id}` : API_BASE;
            const method = editingUser ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            clearForm();
            await fetchUsers();
        } catch (e) {
            setError('Falha ao salvar usuário: ' + e.message);
            setLoading(false);
        }
    }

    async function deleteUser(id) {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
            if (!res.ok && res.status !== 204) throw new Error(`HTTP ${res.status}`);
            await fetchUsers();
        } catch (e) {
            setError('Falha ao remover usuário: ' + e.message);
            setLoading(false);
        }
    }

    function startEdit(user) {
        setEditingUser(user);
        setName(user.name);
        setEmail(user.email);
        setError(null);
    }

    function clearForm() {
        setEditingUser(null);
        setName('');
        setEmail('');
        setError(null);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Usuários — Express API</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <View style={styles.buttonRow}>
                <Button
                    title={editingUser ? 'Salvar alteração' : 'Adicionar'}
                    onPress={saveUser}
                />
                {editingUser && (
                    <Button title="Cancelar" onPress={clearForm} color="#888" />
                )}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}

            <View style={styles.refreshRow}>
                <Button title="Recarregar" onPress={fetchUsers} />
            </View>

            {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}

            <FlatList
                data={users}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.userRow}>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{item.name}</Text>
                            <Text style={styles.userEmail}>{item.email}</Text>
                        </View>
                        <TouchableOpacity onPress={() => startEdit(item)} style={styles.editBtn}>
                            <Text style={styles.editBtnText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteUser(item.id)} style={styles.deleteBtn}>
                            <Text style={styles.deleteBtnText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    !loading && <Text style={styles.empty}>Nenhum usuário encontrado.</Text>
                }
                style={{ marginTop: 10 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 40 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 8,
    },
    buttonRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
    refreshRow: { marginTop: 4, marginBottom: 4 },
    error: { color: 'red', marginVertical: 6 },
    empty: { textAlign: 'center', color: '#888', marginTop: 20 },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        backgroundColor: '#f9f9f9',
    },
    userInfo: { flex: 1 },
    userName: { fontWeight: 'bold', fontSize: 15 },
    userEmail: { color: '#555', fontSize: 13 },
    editBtn: {
        backgroundColor: '#0074D9',
        borderRadius: 6,
        padding: 6,
        marginLeft: 6,
    },
    editBtnText: { color: '#fff', fontSize: 13 },
    deleteBtn: {
        backgroundColor: '#c0392b',
        borderRadius: 6,
        padding: 6,
        marginLeft: 6,
    },
    deleteBtnText: { color: '#fff', fontSize: 13 },
});
