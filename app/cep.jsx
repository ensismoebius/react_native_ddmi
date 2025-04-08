import { useState } from "react";
import { Text } from "react-native";
import { TextInput } from "react-native";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";

export default function cep()
{
    const { valorDoCep, setValorDoCep } = useState("");
    const { carregando, setCarrregando } = useState(false);

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

        </View>
    );
}