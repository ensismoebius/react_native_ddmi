import { useState } from "react";
import { Button, Text } from "react-native";
import { TextInput } from "react-native";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";

export default function cep()
{
    const [valorDoCep, setValorDoCep] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [dados, setDados] = useState(null);

    async function carregarDadosDoCEP()
    {
        if (valorDoCep.length !== 8)
        {
            setValorDoCep("CEP inválido");
            return;
        }

        setCarregando(true);


        await fetch(`https://viacep.com.br/ws/${valorDoCep}/json/`)
            .then(resposta => resposta.json()) // tava faltando isso!
            .then(
                dadoEmJson =>
                {
                    if (dadoEmJson.erro)
                    {
                        setValorDoCep("CEP não existe");
                        setCarregando(false);
                    } else
                    {
                        // Deu certo
                        setDados(dadoEmJson);
                        setCarregando(false);
                    }
                }
            );


    }

    return (
        <View>
            <Text>Digite o CEP</Text>
            <TextInput
                value={valorDoCep}
                onChangeText={setValorDoCep}
                keyboardType="numeric"
                maxLength={8}
            />

            {carregando && <ActivityIndicator />}

            {dados &&
                <View>
                    <Text>📍 Endereço: {dados.logradouro}</Text>
                    <Text>🏙 Bairro: {dados.bairro}</Text>
                    <Text>🌆 Cidade: {dados.localidade}</Text>
                    <Text>🗺 Estado: {dados.uf}</Text>
                </View>
            }

            <Button title="Consultar" onPress={carregarDadosDoCEP} />

        </View>
    );
}