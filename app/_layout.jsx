import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { Colors } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout()
{
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Um observador que executa um código toda vez
  // que algo observado mudar.
  // No caso a variável "loaded" é que está sendo observada.
  // Quando esta muda a função anônima mostrada é executada.
  // Neste caso, um função que esconde a tela de splash.
  useEffect(
    () =>
    {
      if (loaded)
      {
        SplashScreen.hideAsync();
      }
    },
    [loaded]
  );

  if (!loaded)
  {
    return null;
  }

  return (
    <Stack screenOptions={
      {
        headerStyle: {
          backgroundColor: theme.headerBackground
        },
        headerTintColor: theme.text,
        headerShadowVisible: 'false'
      }
    }>
      {/* Mostra todas as páginas do diretório (tabs) */}
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}

      {/* Configura a tela index com titulo "Início" e com cabeçalho escondido */}
      <Stack.Screen name='index' options={{ title: 'Início', headerShown: false }} />

      {/* Configura a tela contact com titulo "Contact Us" e exibindo o cabeçalho  */}
      <Stack.Screen name='contact' options={{ title: 'Contact Us', headerShown: true }} />

      {/* Configura a tela contact com titulo "Contact Us" e exibindo o cabeçalho  */}
      <Stack.Screen name='menu' options={{ title: 'Coffe Shop Menu', headerShown: true }} />

      {/* Nem precisava ter isso aqui, pois tb é possível configurar no próprio arquivo "+not-found.tsx" */}
      <Stack.Screen name="+not-found" options={{ headerShown: 'false' }} />
    </Stack>
  );
}

