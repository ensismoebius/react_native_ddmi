import { Stack } from "expo-router";

// Componente que fornece as informações sobre as áreas seguras
// do dispositivo atual, ou seja, as partes que não são cobertas
// por algum outro elemento da interface gráfica
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/context/ThemeContext";

// Tanto faz o nome dessa função 
export default function RootLayout()
{
  return (
    // Envolve os elementos do app para que tenha acesso ao 
    // contexto ligado a esse Provider
    < ThemeProvider >
      <SafeAreaProvider>
        {/* Organiza as telas que forem aparecendo de forma empilhada */}
        {/*
        Se quiser aplicar "headerShown: false" para todas as telas.
        Use <Stack screenOptions={{ headerShown: false }}>
        */}
        <Stack>

          {/*******************
          ** Rotas estáticas **
          *********************/}

          {/* Além de empilhada a tela NÂO tem o cabeçalho */}
          <Stack.Screen name="index" options={{ headerShown: false }} />

          {/* Além de empilhada a tela NÂO tem o cabeçalho */}
          {/*
          Aqui é importante informar se a rota 
          "admin" vai ter ou não cabeçalhos por padrão 
          */}
          <Stack.Screen name="admin" options={{ headerShown: false }} />

          {/*******************
          ** Rotas dinâmicas **
          *********************/}

          <Stack.Screen name="todos/[id]" options={{ headerShown: false }} />

        </Stack>
      </SafeAreaProvider>
    </ThemeProvider >
  );
}
