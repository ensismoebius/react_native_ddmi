import { Text, View, TextInput, Pressable, ImageBackground, StyleSheet } from "react-native";

// Componente que garante que o conteúdo seja mostrado em uma
// área "segura", ou seja que não seja coberta por algum outro 
// elemento da interface gráfica. Este componente depende de 
// SafeAreaProvider pois usa os dados fornecidos pelo mesmo
import { SafeAreaView } from "react-native-safe-area-context";

// Permite o armazenamento e gerenciamento de estados
// dos componentes
import { useState } from "react";

import { data } from "@/data/todos";

import bobEsponja from '@/assets/images/bob.jpg';

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

  // Função para alternar o todo
  const toggleTodo = (id) =>
  {
    setTodos(
      todos.map(
        todo => todo.id === id ? { ...todo, completed: !completed } : todo
      )
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

  // Retorna o componente visual
  return (
    <SafeAreaView style={styles.raiz}>
      <ImageBackground
        source={bobEsponja}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <Text style={text}>Uga</Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  raiz: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff00",
    ImageBackground: bobEsponja
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  text: {
    height: 60,
    width: 150,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 10,
    marginBottom: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10
  }
});