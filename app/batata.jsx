import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Index()
{
    const [valor01, setvalor01] = useState('');
    const [valor02, setvalor02] = useState('');
    const [resultado, setresultado] = useState('');

    function somar()
    {
        const num1 = parseFloat(valor01);
        const num2 = parseFloat(valor02);

        setresultado((num1 + num2).toString());
    }

    return (
        <View>
            <Text>Batata</Text>

            <TextInput
                placeholder="Primeiro numero"
                keyboardType="numeric"
                value={valor01}
                onChangeText={setvalor01}
            />

            <TextInput
                placeholder="Segundo numero"
                keyboardType="numeric"
                value={valor02}
                onChangeText={setvalor02}
            />

            <Button title="Somar" onPress={somar} />

            <TextInput
                keyboardType="numeric"
                value={resultado}
                onChangeText={setresultado}
            />

        </View>
    );
}
