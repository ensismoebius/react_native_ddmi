import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';

export default CepLookup = () =>
{
    const [cep, setCep] = useState('');
    const [dados, setDados] = useState(null);
    const [carregando, setCarrregando] = useState(false);
    const estilo = criaEstilos();

    async function carregaDadosDoCEP() 
    {
        if (cep.length !== 8)
        {
            alert('CEP inválido! Insira um CEP com 8 dígitos.');
            return;
        }

        setCarrregando(true);

        await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(resposta => resposta.json())
            .then(
                dadosEmJson =>
                {
                    if (dadosEmJson.erro)
                    {
                        alert('CEP não encontrado!');
                        setDados(null);
                    } else
                    {
                        setDados(dadosEmJson);
                    }
                }
            )
            .catch(
                errorDeRequisicao =>
                {
                    console.error('Erro na requisição:', errorDeRequisicao);
                    alert('Erro ao buscar o CEP.');
                }
            )
            .finally(
                () => setCarrregando(false)
            );
    };

    return (
        <View style={estilo.conteiner}>
            <Text>Digite o CEP:</Text>
            <TextInput
                value={cep}
                onChangeText={setCep}
                keyboardType="numeric"
                maxLength={8}
                style={estilo.campoDeTexto}
            />
            <Button title="Buscar CEP" onPress={carregaDadosDoCEP} />

            {carregando && <ActivityIndicator size="large" color="#0000ff" style={estilo.carregando} />}

            {dados && (
                <View style={estilo.resultado}>
                    <Text>📍 Endereço: {dados.logradouro}</Text>
                    <Text>🏙 Bairro: {dados.bairro}</Text>
                    <Text>🌆 Cidade: {dados.localidade}</Text>
                    <Text>🗺 Estado: {dados.uf}</Text>
                </View>
            )}
        </View>
    );
};

function criaEstilos()
{
    return StyleSheet.create(
        {
            conteiner: {
                padding: 20
            },
            resultado: {
                marginTop: 20,
                borderWidth: 1,
                borderColor: "#ffffff",
                borderRadius: 10,
                backgroundColor: "#bbbbbb",
                padding: 10
            },
            carregando: {
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
