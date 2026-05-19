// ============================================================
// GET e POST para Backend PHP com Autenticação por API Key
//
// Dependências:
//   nenhuma nova — usa apenas React Native e fetch() nativo
//
// Requisito externo:
//   Servidor PHP com api.php acessível na rede local
//   Ajuste API_URL para o IP da máquina (não use localhost no celular)
// ============================================================

import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';

const API_URL = "http://localhost/api.php"; // Endereço da API
const API_KEY = "re98wr6ew8r6rew76r89e6rwer6w98r6ywe9r6r6w87e9wr6ew06r7"; // Chave de acesso da API

const postGetPhp = () =>
{
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    // GET com chave de API
    const carregarDados = async () =>
    {
        setCarregando(true);
        try
        {
            const resposta = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "X-API-KEY": API_KEY,
                },
            });

            const json = await resposta.json();
            setDados(json);
        } catch (erro)
        {
            console.error("Erro ao carregar os dados:", erro);
            alert("Falha ao carregar dados.");
        } finally
        {
            setCarregando(false);
        }
    };

    // POST com chave de API
    const enviaDados = async () =>
    {
        setCarregando(true);
        try
        {
            const resposta = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": API_KEY,
                },
                body: JSON.stringify({ name: nome, email }),
            });

            const json = await resposta.json();
            setDados(json);
        } catch (erro)
        {
            console.error("Erro ao enviar informação:", erro);
            alert("Falha no envio da informação.");
        } finally
        {
            setCarregando(false);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>📥 Carrega os dados do php usando GET</Text>
            <Button title="Carregar dados" onPress={carregarDados} />

            <Text>📤 Envia dados ao php com POST</Text>
            <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Nome"
                style={{ borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 }}
            />
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                style={{ borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 }}
            />
            <Button title="Enviar" onPress={enviaDados} />

            {carregando && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}

            {dados && (
                <View style={{ marginTop: 20 }}>
                    <Text>📝 Resposta do servidor:</Text>
                    <Text>{JSON.stringify(dados, null, 2)}</Text>
                </View>
            )}
        </View>
    );
};

export default postGetPhp;
