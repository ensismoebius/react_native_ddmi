import { Text, View, TextInput, Pressable, ImageBackground, StyleSheet, FlatList } from "react-native";

// Componente que garante que o conteúdo seja mostrado em uma
// área "segura", ou seja que não seja coberta por algum outro 
// elemento da interface gráfica. Este componente depende de 
// SafeAreaProvider pois usa os dados fornecidos pelo mesmo
import { SafeAreaView } from "react-native-safe-area-context";

// Permite o armazenamento e gerenciamento de estados
// dos componentes
import { useState } from "react";

// Carrrega os dados que serão mostrados
import { data } from "@/data/todos";

// Carrega uma imagem e atribui a uma variável
import bobEsponja from '@/assets/images/bob.jpg';

// Importando o ícone de lixeira
// Para ver mais ícones vá em: https://icons.expo.fyi/
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Index()
{

  // Cria um estado que pode ser guardado enquanto o programa
  // está sendo executado, "todos" é a variavel criada que 
  // conterá o estado e "setTodos" é a função que vai atualizar 
  // esse estado
  const [todos, setTodos] = useState(
    data.sort(
      (a, b) => b.id - a.id
    )
  );

  // Mesmas coisa aqui
  const [text, setText] = useState('');

  // 2 42 32 

  // Função para alternar o todo
  const toggleTodo = (id) =>
  {
    setTodos(
      todos.map(
        todo =>
        {
          console.log("Todo", todo);
          if (todo.id === id)
          {
            todo.completed = !todo.completed;
          }

          return todo;
        })
    );
  };

  // função para remover o todo
  const removeTodo = (id) =>
  {
    setTodos(
      todos.filter(todo => todo.id !== id)
    );
  };

  // função para adicionar todo
  const addTodo = () =>
  {
    if (text.trim())
    {
      const newId = todos.length > 0 ? todos[0].id + 1 : 0;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      setText('');
    }
  };

  // O layout do item que será mostrado
  // perceba que o corpo da função anônima
  // começa com parênteses eliminando assim 
  // a necessidade do "return"
  const renderItem = ({ item }) =>
  (
    <View style={styles.todoItem}>
      <Text
        style={[
          styles.todoText,
          item.completed && styles.completedText
        ]}
        onPress={
          () =>
          {
            toggleTodo(item.id);
          }
        }>
        {item.title}
      </Text>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons
          name="delete-circle"
          size={36}
          color="red"
          selectable={undefined}
        />
      </Pressable>
    </View>
  );

  // Retorna o componente visual
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          styles={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

// Cria as folhas de estilo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  inputContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto'
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 18,
    minWidth: 0,
    color: 'white'
  },
  addButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: 'black',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto'
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    color: 'white'
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },

});