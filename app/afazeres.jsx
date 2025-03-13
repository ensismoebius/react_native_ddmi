import { Button, FlatList, Text, TextInput, View } from "react-native";
// Permite o armazenamento e gerenciamento de estados
// dos componentes
import { useState } from "react";

// Carrrega os dados que serão mostrados
import { dados } from "@/dados/afazeres";

export default function Afazeres()
{
    // Cria um estado que pode ser guardado enquanto o programa
    // está sendo executado, "todos" é a variavel criada que 
    // conterá o estado e "setTodos" é a função que vai atualizar 
    // esse estado
    const [afazeres, setAfazeres] = useState(
        dados.sort(
            (a, b) => b.id - a.id
        )
    );

    // Mesmas coisas aqui
    const [tarefa, setTarefa] = useState('');

    return (
        <View>
            <Text>Digite uma tarefa</Text>
            <TextInput
                placeholder="Tarefa"
                placeholderTextColor="gray"
                value={tarefa}
                onChangeText={setTarefa}
            />
            <Button title="Adicionar" />

            <FlatList
                data={afazeres}
                keyExtractor={tarefa => tarefa.id}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </View>
    );
}
