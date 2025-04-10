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
            .then(
                dadoEmJson =>
                {
                    if (dadoEmJson.erro)
                    {
                        setValorDoCep("CEP não existe");
                    } else
                    {
                        // Deu certo
                        setDados(dadoEmJson);
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
                    <Text>Endereço: {JSON.stringify(dados)}</Text>
                </View>
            }

            <Button title="Consultar" onPress={carregarDadosDoCEP} />

        </View>
    );
}