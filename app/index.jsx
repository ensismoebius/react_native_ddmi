import { Text, View, TextInput, Pressable, ImageBackground, StyleSheet, FlatList } from "react-native";

// Componente que garante que o conteúdo seja mostrado em uma
// área "segura", ou seja que não seja coberta por algum outro 
// elemento da interface gráfica. Este componente depende de 
// SafeAreaProvider pois usa os dados fornecidos pelo mesmo
import { SafeAreaView } from "react-native-safe-area-context";

// Permite o armazenamento e gerenciamento de estados
// dos componentes
import { useContext, useState } from "react";

// Importando ThemeContext
import { ThemeContext } from "@/context/ThemeContext";

// Carrrega os dados que serão mostrados
import { data } from "@/data/todos";

// Carrega uma imagem e atribui a uma variável
import bobEsponja from '@/assets/images/bob.jpg';

// Importando o ícone de lixeira
// Para ver mais ícones vá em: https://icons.expo.fyi/
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Importando outras fontes do pacote instalado
// pelo comando: npm i @expo-google-fonts/inter
// https://github.com/expo/google-fonts
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";

// Alguns ícones usados para o botão de alternância entre temas
import Octicons from '@expo/vector-icons/Octicons';

// Componentes que permitem animação
import Animated, { LinearTransition } from "react-native-reanimated";

export default function Index()
{

  /**
   * Declarando os hooks do react native, lembre-se de que
   * tais hooks não devem ter sua quantidade ou ordem alteradas
   * durante entre as renderizações de um componente.
   * 
   * Um hook é uma função que você chama dentro do seu
   * componente de forma que o framework monitora seu 
   * estado entre renderizações, sendo possível assim, por
   * exemplo fazer um contador que mantém seu valor ao
   * alternar entre telas.
   * 
   * Exemplos:
   * useState → "Memoriza valores"
   * useEffect → "Executa tarefas que são executadas fora do contexto de execução do componente"
   * useContext → "Compartilha informação"
   * 
   * Hooks devem ser chamados sempre dentro do componente em questão
   */


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

  // Preparando o acesso as "variáveis globais" do contexto,
  // usaremos isso para mudar, via um botão, o tema do app.
  // Acessa os valores ATUAIS do Provider (não o valor padrão!)
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  // Carrega a fonte
  const [loaded, error] = useFonts({ Inter_500Medium });
  if (!loaded && !error)
  {
    return null;
  }

  // Create the styles for UI
  const styles = createStyles(theme, colorScheme);

  /* fim dos hooks */

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
        <Pressable
          onPress={
            // Alterna entre os esquemas de cores 'ligth' e 'dark'
            () => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
          }
          style={{ marginLeft: 10 }}
        >
          <Text>
            {
              colorScheme === 'dark'
                ? <Octicons name="moon" size={36} color={theme.text} selectable={undefined} style={{ width: 36 }} />
                : <Octicons name="sun" size={36} color={theme.text} selectable={undefined} style={{ width: 36 }} />
            }
          </Text>
        </Pressable>
      </View>
      <Animated.FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id}
        contentContainerStyle={{ flexGrow: 1 }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
      />
    </SafeAreaView >
  );
}

// Cria as folhas de estilo
function createStyles(theme, colorScheme)
{
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      width: '100%'
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
      fontFamily: 'Inter_500Medium',
      minWidth: 0,
      color: theme.text
    },
    addButton: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10
    },
    addButtonText: {
      fontSize: 18,
      color: theme.buttonText
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
      fontFamily: 'Inter_500Medium',
      color: theme.text
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: 'gray'
    },

  });
}