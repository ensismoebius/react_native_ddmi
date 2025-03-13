import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
// Carrrega os dados que serão mostrados
import { listaDeAfazeres } from "@/dados/afazeres";

export default function Index()
{
    const [nomeDaTarefa, setNomeDaTarefa] = useState('');

    // Cria um estado que pode ser guardado enquanto o programa
    // está sendo executado, "afazeres" é a variavel criada que 
    // conterá o estado e "setAfazeres" é a função que vai atualizar 
    // esse estado
    const [afazeres, setAfazeres] = useState(
        listaDeAfazeres.sort(
            (a, b) => b.id - a.id
        )
    );

    // O layout do item que será mostrado
    // perceba que o corpo da função anônima
    // começa com parênteses eliminando assim 
    // a necessidade do "return"
    const layoutDoItem = ({ item }) =>
    (
        <View>
            <Text>{item.title}</Text>
            <Button title="x" />
        </View>
    );

    // função para adicionar tarefa
    const adicionarAfazeres = () =>
    {
        if (nomeDaTarefa.trim())
        {
            const newId = listaDeAfazeres.length > 0 ? afazeres[0].id + 1 : 0;

            setAfazeres([{ id: newId, title: nomeDaTarefa, completed: false }, ...listaDeAfazeres]);

            setNomeDaTarefa('');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Digite uma tarefa"
                placeholderTextColor="gray"
                value={nomeDaTarefa}
                onChangeText={setNomeDaTarefa}
            />
            <Button />
            <FlatList
                data={listaDeAfazeres}
                renderItem={layoutDoItem}
            />
        </View>
    );
}
