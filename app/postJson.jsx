import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';

export default HTTPPost = () =>
{
    const [titulo, setTitulo] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [enviando, setCarregando] = useState(false);
    const [dados, setDados] = useState(null);

    const estilo = criaEstilos();

    async function enviaDados() 
    {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    titulo: titulo,
                    mensagem: mensagem,
                }
            )
        })
            .then(response => response.json())
            .then(
                json =>
                {
                    setDados(json);
                }
            )
            .catch(
                error =>
                {
                    setDados(error);
                }
            );

    };

    return (
        <View style={estilo.conteiner}>
            <Text>Digite os dados para enviar:</Text>
            <TextInput
                value={titulo}
                onChangeText={setTitulo}
                style={estilo.campoDeTexto}
                placeholder='Título da mensagem'
            />
            <TextInput
                value={mensagem}
                onChangeText={setMensagem}
                style={estilo.campoDeTexto}
                placeholder='Mensagem'
            />
            <Button title="Enviar" onPress={enviaDados} />

            {enviando && <ActivityIndicator size="large" color="#0000ff" style={estilo.enviando} />}

            {dados && (
                <View style={estilo.resultado}>
                    <Text>{dados.id}</Text>
                </View>
            )}
        </View>
    );
};

function criaEstilos()
{
    return StyleSheet.create(
        {
            resultado: {
                marginTop: 20,
                borderWidth: 1,
                borderColor: "#ffffff",
                borderRadius: 10,
                backgroundColor: "#bbbbbb",
                padding: 10
            },
            enviando: {
                marginTop: 10
            },
            campoDeTexto: {
                borderWidth: 1,
                padding: 10,
                marginVertical: 10,
                borderRadius: 5,
            }
        }
    );
}
