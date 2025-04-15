import { Button, View, Text } from "react-native-web";
import { ActivityIndicator } from "react-native";
import { useState } from "react";

const API = "http://localhost/api.php";
const CHAVE = "fljhkgsdg434hhfiu434wgfhbfdif";

export default function minhaAPI()
{
    const [carregando, setCarregando] = useState(false);
    const [dados, setDados] = useState(null);

    async function carregarDadosViaGet()
    {
        setCarregando(true);

        try
        {
            const resposta = await fetch(
                API,
                {
                    method: "GET",
                    headers: {
                        "X-API-KEY": CHAVE
                    }
                }
            );

            const json = await resposta.json();
            setDados(json);
        } catch (erro)
        {
            console.error(erro);
        } finally
        {
            setCarregando(false);
        }
    }

    return (
        <View>
            <Text>Carrega os dados do php usando GET</Text>
            <Button title="Carregar" onPress={carregarDadosViaGet} />

            {carregando && <ActivityIndicator />}

            {
                dados &&
                <View>
                    <Text>Resposta</Text>
                    <Text>{JSON.stringify(dados)}</Text>
                </View>
            }
        </View>
    );
}