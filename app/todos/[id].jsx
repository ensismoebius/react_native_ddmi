import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Importante para recuperar parâmetros passados 
// pelo roteador (funciona como um GET em http)
import { useLocalSearchParams } from "expo-router";

export default function editTodos()
{
    // Recupera o id do todo de um array de valores
    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView>
            {/* Exibe o id do todo */}
            <Text>Id: {id}</Text>
        </SafeAreaView>
    );
}