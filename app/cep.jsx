import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { TextInput, Text } from "react-native";
import { Button } from "react-native";

export default function cep()
{
    // Estado vinculado ao cep digitado
    const [cep, setCep] = useState('');

    const [carregando, setCarregando] = useState(false);

    const [resultadoEmJson, setResultadoEmJson] = useState(null);

    async function carregaDadosDoCEP()
    {
        if (cep.length !== 8)
        {
            setCep("CEP inválido!");
            return;
        }

        // Iniciar o indicador de carregamento
        setCarregando(true);

        await fetch(
            `https://viacep.com.br/ws/${cep}/json`
        ).then(
            resposta => resposta.json()
        ).then(
            resposta =>
            {
                if (resposta.erro)
                {
                    setCep('Falha ao recuperar o CEP');
                } else
                {
                    // Alterar um estado que contenha os resultados
                    setResultadoEmJson(resposta);
                    setCarregando(false);
                }
            }
        );

    }

    return (
        <View>
            <TextInput
                value={cep}
                onChangeText={setCep}
                keyboardType="numeric"
                maxLength={8}
                placeholder="Digite o CEP"
            />
            <Button
                title="Buscar CEP"
                onPress={carregaDadosDoCEP}
            />

            {carregando && <ActivityIndicator />}

            {resultadoEmJson &&
                <View>
                    <Text>
                        🏛️ Logradouro: {resultadoEmJson.logradouro}
                    </Text>
                    <Text>
                        🌆 Cidade:{resultadoEmJson.localidade}
                    </Text>
                </View>
            }

        </View>
    );
}