# DDMI — Aplicativo Demo React Native / Expo

Coleção de telas demonstrando recursos comuns de desenvolvimento mobile com React Native e Expo.

---

## 📋 Requisitos

- Node.js 18+
- dispositivo Android/emulador **ou** dispositivo iOS/simulador

---

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npx expo start          # abre menu Expo
npx expo start --android
npx expo start --ios
```

---

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch
```

---

## 📦 Build com EAS

```bash
# Instalar EAS CLI globalmente
npm install -g eas-cli

# Login no EAS
eas login

# Configurar build
eas build:configure     # atualiza app.json e cria eas.json

# Build para plataformas
eas build --platform android
eas build --platform ios
```

---

## 📚 Bibliotecas Instaladas

Esta seção detalha cada biblioteca usada no projeto, com exemplos de uso e observações importantes.

---

### Core React Native

#### 📦 `react` (19.0.0)
**Propósito:** Biblioteca core do React para interfaces de usuário.

**Uso básico:**
```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function MeuComponente() {
  const [contador, setContador] = useState(0);
  
  return (
    <View>
      <Text>Contagem: {contador}</Text>
      <TouchableOpacity onPress={() => setContador(c => c + 1)}>
        <Text>Incrementar</Text>
      </TouchableOpacity>
    </View>
  );
}
```

**Dica:** O React 19 trouxe novas funcionalidades como `use` hook e Server Components. Porém, no contexto Expo/React Native, a maioria das APIs continua a mesma.

---

#### 📦 `react-native` (0.79.6)
**Propósito:** Framework para criar apps nativos para iOS e Android.

**Observações:**
- Não use diretamente `import React from 'react'` em todos os arquivos — o JSX transform automático do Expo cuid disso.
- Componentes são sempre `PascalCase` (ex: `View`, `TextInput`, `TouchableOpacity`)

---

### Navigation

#### 📦 `expo-router` (~5.1.11)
**Propósito:** Sistema de arquivos-based routing para Expo. Substitui o React Navigation tradicional.

**Estrutura de arquivos:**
```
app/
├── _layout.tsx     # Layout raiz (obrigatório)
├── index.jsx       # Rota "/" (home)
├── tela1.jsx        # Rota "/tela1"
└── pasta/
    └── teste.jsx   # Rota "/pasta/teste"
```

**Configuração em app/_layout.tsx:**
```javascript
import { Stack } from "expo-router";

export default function Layout() {
  return <Stack />;
}
```

**Quirks:**
- O arquivo deve ser obrigatório `_layout.tsx` ou `_layout.jsx` na raiz de `app/`
- Rotas dinâmicas usam colchetes: `[id].jsx` → `/123`
- Grupos de rota usam parêntesis: `(admin)/page.jsx` → `/page` (não aparece na URL)

**Links entre telas:**
```javascript
import { useRouter } from "expo-router";

function Tela() {
  const router = useRouter();
  
  return (
    <TouchableOpacity onPress={() => router.push('/outra-tela')}>
      <Text>Ir para outra tela</Text>
    </TouchableOpacity>
  );
}
```

---

#### 📦 `@react-navigation/drawer` (~7.9.9)
**Propósito:** Menu lateral navegável.

**Uso detalhado:**
```javascript
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Drawer>
          <Drawer.Screen name="index" component={HomeScreen} />
          <Drawer.Screen name="outra" component={OutraTela} />
        </Drawer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

**Dica:** Para menu customizado, use `drawerContent` prop:
```javascript
<Drawer drawerContent={(props) => <MeuMenuCustomizado {...props} />} />
```

**⚠️ Bug Crítico de Toque (Android):**
Em listas longas de menu no Android, os itens inferiores podem parar de responder ou exigir múltiplos cliques.
**Soluções aplicadas no DDMI:**
1. Substituir `DrawerContentScrollView` por `ScrollView` nativo do `react-native`.
2. Usar `flexGrow: 1` no `contentContainerStyle` do ScrollView.
3. Adicionar um `View` de espaçamento (`bottomSpacer`) ao final da lista.
4. Definir `pointerEvents="none"` em ícones decorativos para evitar roubo de eventos.
5. Desabilitar a Nova Arquitetura no `app.json` (`"newArchEnabled": false`).

---

#### 📦 `@react-navigation/native` (~7.1.6)
**Propósito:** Framework core de navegação (usado indiretamente pelo expo-router).

**Quirks:**
- Para navegação aninhada, use `<Stack.NestedStack>` 
- `navigation.reset()` pode ser usado para redefinir o state da navegação

---

#### 📦 `@react-navigation/bottom-tabs` (~7.3.10)
**Propósito:** Abas inferiores (como WhatsApp, Instagram).

**Exemplo:**
```javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = focused ? 'home' : 'home-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

---

### Sensores e Localização

#### 📦 `expo-location` (~18.1.6)
**Propósito:** Acesso à localização GPS do dispositivo.

**Permissões necessárias (app.json):**
```json
{
  "expo": {
    "android": {
      "permissions": ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"]
    }
  }
}
```

**Uso detalhado:**
```javascript
import * as Location from 'expo-location';

// 1. Solicitar permissão
async function getPermissao() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

// 2. Obter localização atual (uma vez)
async function getLocalizacaoAtual() {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
  return location.coords; // { latitude, longitude, altitude, ... }
}

// 3. Rastrear localização contínua
async function rastrearLocalizacao() {
  const subscription = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 1000,    // atualizar a cada 1s
      distanceInterval: 1,   // ou a cada 1m移动
    },
    (location) => {
      console.log('Nova localização:', location.coords);
    }
  );
  
  // Para de rastrear
  subscription.remove();
}

// 4. Geocoding (endereço ↔ coordenadas)
async function getEndereco(lat, lng) {
  const result = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
  return result[0]; // { street, city, region, country, ... }
}
```

**Quirks:**
- `getCurrentPositionAsync` pode demorar mais em ambientes internos
- use `Accuracy.Balanced` para balance entre precisão e bateria
- `watchPositionAsync` consome mais bateria — sempre chame `.remove()` no cleanup!

**Dicas:**
- Sempre peça permissão antes de usar
- Forneça fallback para quando permissão negada
- Teste em ambiente externo (GPS funciona melhor ao ar livre)

---

#### 📦 `expo-sensors` (~14.1.4)
**Propósito:** Acessar acelerômetro, giroscópio, magnetômetro, etc.

**Acelerômetro:**
```javascript
import { Accelerometer } from 'expo-sensors';

// Configurar intervalo de atualização (em ms)
Accelerometer.setUpdateInterval(100); // 10Hz

// Ler uma vez
const data = await Accelerometer.getAsync();
// data = { x: 0.01, y: -0.02, z: 0.98 }

// Ou ouvir continuamente
useEffect(() => {
  const subscription = Accelerometer.addListener((data) => {
    console.log('Acelerômetro:', data.x, data.y, data.z);
  });
  
  return () => subscription.remove();
}, []);
```

**Giroscópio:**
```javascript
import { Gyroscope } from 'expo-sensors';

Gyroscope.setUpdateInterval(50); // 20Hz

const subscription = Gyroscope.addListener((data) => {
  // data = { x: 0.01, y: -0.02, z: 0.003 }
  // Valores em rad/s
});
```

**Magnetômetro:**
```javascript
import { Magnetometer } from 'expo-sensors';

Magnetometer.setUpdateInterval(50);

// Retorna intensidade do campo magnético em microTesla (µT)
// range típico: -100 a 100 µT
```

**Quirks:**
- Valores são afectados por interferência magnética (aparelhos elétricos,-metal)
- Use média móvel para suavizar ruído
- Eixos: X = esquerda/direita, Y = frente/trás, Z = cima/baixo

**Dica de precisão:**
```javascript
// Para melhor precisão, combine sensores
import { SensorTypes, setUpdateInterval } from 'expo-sensors';

// Configurar múltiplos sensores
setUpdateInterval(SensorTypes.ACCELEROMETER, 50);
setUpdateInterval(SensorTypes.GYROSCOPE, 50);
```

---

### Notificações

#### 📦 `expo-notifications` (~0.31.4)
**Propósito:** Notificações locais (agendadas) e push notifications.

**Configuração necessária:**
```javascript
import * as Notifications from 'expo-notifications';

// Configurar handler para quando app está em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
```

**Notificação agendada:**
```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'Título da notificação',
    body: 'Corpo da mensagem',
    data: { extraData: 'valor' },
  },
  trigger: {
    seconds: 5,       // dispara em 5 segundos
    // ou em data específica:
    // date: new Date(2024, 11, 25, 10, 0)
  },
});
```

**Notificação imediata:**
```javascript
await Notifications.scheduleNotificationAsync({
  content: { title: 'Agora!', body: 'Disparou agora!' },
  trigger: null, // null = imediato
});
```

**Notificação com som customizado:**
```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'Com som!',
    body: 'Som personalizado',
    sound: 'meu-som.mp3',  // deve estar em assets/sounds/
  },
  trigger: null,
});
```

**Quirks:**
- ⚠️ **Push notifications REMOTAS foram removidas do Expo Go no SDK 53** — precisa de development build
- Sons customizados devem estar na pasta `assets/sounds/` e ser referenciados apenas pelo nome do arquivo
- O app deve configurar permission para Android 13+: `Notifications.requestPermissionsAsync()`
- Notificações não aparecem se app está em primeiro plano por padrão — configure `setNotificationHandler`

---

### Rede e Dados

#### 📦 `react-native-webview` (~13.13.5)
**Propósito:** Renderizar conteúdo web dentro do app.

**Uso:**
```javascript
import { WebView } from 'react-native-webview';

function MeuMapa() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>body{margin:0}#map{height:100vh}</style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([-23.5505, -46.6333], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
          L.marker([-23.5505, -46.6333]).addTo(map);
        </script>
      </body>
    </html>
  `;
  
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ html }}
      originWhitelist={['*']}
    />
  );
}
```

**Quirks:**
- WebView não tem acesso direto ao JavaScript do app — use `postMessage` para comunicar
- Para usar câmera/gps dentro WebView, pode precisar config adicional `geolocationEnabled={true}`
- Sempre use `originWhitelist={['*']}` para conteúdo de API externas

**Dicas:**
- Carregue scripts via CDN externos para não aumentar tamanho do APK
- Para páginas que precisam de HTTPS, o WebView já suporta nativamente

---

#### 📦 `expo-web-browser` (~14.2.0)
**Propósito:** Abrir browser externo ou em-app browser.

```javascript
import * as WebBrowser from 'expo-web-browser';

// Abrir browser externo
await WebBrowser.openBrowserAsync('https://expo.dev');

// Abre em mini-browser dentro do app
const result = await WebBrowser.openAuthSessionAsync(
  'https://minha-api.com/auth',
  'meu-scheme://'
);
// result: { type: 'success', url: 'meu-scheme://callback?token=xxx' }
```

---

### UI e Estilização

#### 📦 `@expo/vector-icons` (~14.1.0)
**Propósito:** Ícones de Ionicons, FontAwesome, etc.

**Uso:**
```javascript
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

function MeuIcone() {
  return (
    <View>
      <Ionicons name="home" size={24} color="blue" />
      <MaterialIcons name="menu" size={24} color="red" />
      <FontAwesome name="camera" size={24} color="green" />
    </View>
  );
}
```

**Lista de ícones disponíveis:**
- [Ionicons](https://ionic.io/ionicons)
- [MaterialIcons](https://fonts.google.com/icons)
- [FontAwesome](https://fontawesome.com/icons)
- [Feather](https://feathericons.com)
- [AntDesign](https://ant.design/components/icon)

**Dica:** Para usar em Tab Navigator ou Drawer, passe como função:
```javascript
screenOptions={({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    const iconName = route.name === 'Home' ? 'home' : 'settings';
    return <Ionicons name={iconName} size={size} color={color} />;
  }
})}
```

---

#### 📦 `expo-blur` (~14.1.5)
**Propósito:** Efeito de desfoque (blur) moderno.

```javascript
import { BlurView } from 'expo-blur';

function TelaComBlur() {
  return (
    <View style={{ flex: 1 }}>
      <Image source={require('./fundo.jpg')} style={{ flex: 1 }} />
      <BlurView intensity={50} style={{ padding: 20 }}>
        <Text>Conteúdo com blur atrás</Text>
      </BlurView>
    </View>
  );
}
```

**Quirks:**
- No Android pode ter performance variável
- Intensity 0-100

---

#### 📦 `react-native-svg` (~15.11.2)
**Propósito:** Suporte a SVG em React Native.

**Uso:**

import { Svg, Circle, Rect, Path } from 'react-native-svg';

function IconeSVG() {
  return (
    <Svg height="100" width="100" viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="40" fill="blue" />
      <Rect x="30" y="30" width="40" height="40" fill="red" />
    </Svg>
  );
}
```

Usado por várias bibliotecas de gráficos (Victory Native) e ícones.

---

### Utilitários

#### 📦 `expo-constants` (~17.1.7)
**Propósito:** Constantes do Expo (versão, scheme, etc).

```javascript
import Constants from 'expo-constants';

console.log(Constants.expoVersion);  // "53.0.0"
console.log(Constants.systemFonts);    // ["System", ...]
console.log(Constants.platform);       // { ios: {...}, android: {...} }
```

---

#### 📦 `expo-device` (~7.1.4)
**Propósito:** Informações sobre o dispositivo.

```javascript
import * as Device from 'expo-device';

const device = await Device.getDeviceInfoAsync();
console.log(device.deviceName);       // "iPhone 15 Pro"
console.log(device.brand);            // "Apple"
console.log(device.modelId);          // "iPhone15,4"
```

---

#### 📦 `expo-font` (~13.3.2)
**Propósito:** Carregar fontes customizadas.

```javascript
import * as Font from 'expo-font';

await Font.loadAsync({
  'MinhaFonte': require('./assets/fonts/MinhaFonte.ttf')
});

// Agora usable em StyleSheet
const styles = StyleSheet.create({
  texto: { fontFamily: 'MinhaFonte', fontSize: 16 }
});
```

---

#### 📦 `expo-linking` (~7.1.7)
**Propósito:** Deep linking e links externos.

```javascript
import * as Linking from 'expo-linking';

const url = Linking.createURL('/tela?param=valor');
await Linking.openURL('https://expo.dev');
```

---

#### 📦 `expo-localization` (~16.1.6)
**Propósito:** Detectar idioma do dispositivo.

```javascript
import * as Localization from 'expo-localization';

const locale = Localization.getLocales();
console.log(locale[0].languageCode); // "pt" ou "en"
console.log(locale[0].countryCode);   // "BR" ou "US"
```

---

#### 📦 `expo-haptics` (~14.1.4)
**Propósito:** Feedback háptico (vibração).

```javascript
import * as Haptics from 'expo-haptics';

Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
Haptics.selectionAsync();
```

---

#### 📦 `expo-image` (~2.4.1)
**Propósito:** Componente de imagem otimizado.

```javascript
import { Image } from 'expo-image';

<Image
  source={require('./foto.jpg')}
  contentFit="cover"
  transition={200}
/>
```

---

### Gráficos

#### 📦 `victory-native` (~37.3.6)
**Propósito:** Biblioteca de gráficos para React Native.

**Instalação:**
```bash
npm install victory-native react-native-svg
```

**Exemplo de gráfico de linhas:**
```javascript
import { VictoryLine, VictoryAxis, VictoryTheme } from 'victory-native';

function GraficoSimples() {
  const dados = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 3 },
  ];

  return (
    <View style={{ height: 300 }}>
      <VictoryLine
        data={dados}
        theme={VictoryTheme.material}
        animate={{ duration: 500 }}
        style={{ data: { stroke: 'blue', strokeWidth: 2 } }}
      />
    </View>
  );
}
```

**Gráficos disponíveis:**
- `VictoryLine` — linhas
- `VictoryBar` — barras
- `VictoryPie` — pizza
- `VictoryScatter` — dispersão
- `VictoryChart` — contenedor com eixos automáticos

**Quirks:**
- Depende de `react-native-svg` estar instalado
- Em Android, às vezes precisa de `adb reverse tcp:8081 tcp:8081` para dev server
- Não suporta todos os recursos do Victory para web — consulte documentação

**Dica:** Para atualizar dados em tempo real, use state:
```javascript
const [data, setData] = useState([{ x: 0, y: 0 }]);

// useEffect para adicionar novos pontos
useEffect(() => {
  const interval = setInterval(() {
    setData(prev => [...prev, { x: prev.length, y: Math.random() * 10 }]);
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

---

### Mapas

#### 📦 `react-native-maps` (~1.20.1)
**Propósito:** Mapas nativos para React Native (Google Maps).

```javascript
import MapView, { Marker, Polyline } from 'react-native-maps';

function Mapa() {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: -23.5505,
        longitude: -46.6333,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{ latitude: -23.5505, longitude: -46.6333 }}
        title="São Paulo"
        description="Maior cidade do Brasil"
      />
    </MapView>
  );
}
```

**⚠️ Observação importante:**
- Requer chave de API do Google Cloud Platform
- Configuração em `app.json` obrigatória para produção
- Não funciona no Expo Go (precisa development build)

**Alternativa leve:** Use WebView com OpenStreetMap (já implementado nas telas mapa01-03)

---

#### 📦 `react-native-maps-directions` (~1.9.0)
**Propósito:** Calcular rotas entre pontos com Google Maps.

```javascript
import MapView, { Polyline } from 'react-native-maps';
import Directions from 'react-native-maps-directions';

const origem = { latitude: -23.5505, longitude: -46.6333 };
const destino = { latitude: -23.5611, longitude: -46.6567 };

// Obter rota
const route = await Directions.getRouteBetweenCoordinates({
  origin: origem,
  destination: destino,
  apiKey: 'SUA-API-KEY'
});

// polyline da rota
const coordinates = route.overview_polyline.points;
```

---

### Testes

#### 📦 `jest` (~29.7.0)
#### 📦 `jest-expo` (~53.0.14)
**Propósito:** Framework de testes Jest pré-configurado para Expo.

**Configuração em package.json:**
```json
{
  "jest": {
    "preset": "jest-expo",
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|react-native-svg)"
    ]
  }
}
```

**Exemplo de teste:**
```javascript
// __tests__/meu-componente.test.jsx
import { render } from '@testing-library/react-native';
import MeuBotao from '../components/Button';

test('renderiza botão', () => {
  const { getByText } = render(
    <MeuBotao titulo="Clique" onPress={() => {}} />
  );
  
  expect(getByText('Clique')).toBeTruthy();
});
```

**Executar:**
```bash
npm test              # uma vez
npm run test:watch  # modo watch
```

**Dicas:**
- Testes precisam de mocks para native modules
- Use `jest.mock()` para simular módulos nativos
- Arquivos de teste podem ser `.test.js`, `.test.jsx`, `.spec.js`, ou `.spec.jsx`

---

### Internacionalização

#### 📦 `i18next` (23.11.5)
#### 📦 `react-i18next` (14.2.25)
**Propósito:** Sistema de traduções multilíngue.

**Idiomas suportados:** `en`, `pt-BR`, `eo` (Esperanto)

**Configuração:**
```javascript
// i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import ptBR from './locales/pt-BR.json';
import eo from './locales/eo.json';

const locales = Localization.getLocales();
const deviceLanguage = locales[0]?.languageCode ?? 'en';
const supportedLanguages = ['en', 'pt', 'eo'];
const defaultLanguage = supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      'pt-BR': { translation: ptBR },
      eo: { translation: eo },
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v4',
  });

export default i18n;
```

**Uso em componente:**
```javascript
import { useTranslation } from 'react-i18next';

function MinhaTela() {
  const { t } = useTranslation();
  
  return <Text>{t('nav.home')}</Text>;
}
```

**Arquivo de tradução (locales/pt-BR.json):**
```json
{
  "nav": {
    "home": "Início",
    "routePlanner": "Planejador de Rotas"
  },
  "gps": {
    "waiting": "Aguardando localização...",
    "permissionDenied": "Permissão de localização negada"
  }
}
```

---

### Build e Deploy

#### 📦 `eas-cli` (global)
**Propósito:** CLI para builds EAS (Expo Application Services).

**Instalação:**
```bash
npm install -g eas-cli
```

**Comandos:**
```bash
eas login              # autenticar
eas build:configure # criar eas.json
eas build --platform android   # build para Android
eas build --platform ios       # build para iOS
eas submit   # submeter para stores
```

---

## 📁 Estrutura do Projeto

```
ddmi/
├── app/                    # Telas do Expo Router (Drawer navigation)
├── components/             # Componentes UI reutilizáveis
├── hooks/                  # Custom hooks
├── constants/              # Constantes da aplicação
├── i18n/                  # Internacionalização
├── utils/                 # Utilitários
├── utilidades/            # Utilitários legados
├── __tests__/             # Testes Jest
└── package.json
```

---

## 📦 Compilando Nativamente para Android

### Pré-requisitos

1. **Java Development Kit (JDK) 17+**
   ```bash
   # Ubuntu/Debian
   sudo apt install openjdk-17-jdk
   
   # macOS (via Homebrew)
   brew install openjdk@17
   
   # Verificar instalação
   java -version
   ```

2. **Android SDK**
   ```bash
   # Configurar variáveis de ambiente
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
   
   # Instalar cmdline-tools e platforms via sdkmanager
   sdkmanager "platforms;android-35" "build-tools;35.0.0"
   ```

3. **Gradle** (já incluso no projeto)

### Compilando APK

#### Opção 1: Expo with Prebuild (Recomendado)

```bash
# 1. Gerar projeto nativo Android
npx expo prebuild --platform android

# 2. Compilar APK modo debug
cd android && ./gradlew assembleDebug

# 3. APK será gerado em:
# android/app/build/outputs/apk/debug/app-debug.apk
```

#### Opção 2: Expo Dev Build (com Bundle JS)

```bash
# 1. Criar build nativo
npx expo run:android --variant release

# 2. Ou usando o EAS (Expo Application Services)
npx eas login
npx eas build -p android --profile preview
```

#### Opção 3: Build manual com Gradle

```bash
# Bundle JS manualmente
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

# Compilar
cd android && ./gradlew assembleRelease
```

### APK com JS Bundled (Standalone)

Para gerar APK que funciona **sem servidor Metro**:

```bash
# Debug APK (já inclui bundle)
npx expo prebuild --platform android
cd android && ./gradlew assembleDebug

# Release APK (requer signed keystore)
cd android && ./gradlew assembleRelease
```

**Verificar se APK contém o bundle JS:**
```bash
unzip -l android/app/build/outputs/apk/debug/app-debug.apk | grep -E "bundle|index"
```

---

## 📊 Resumo

| Recurso | Pacote | Como Usar |
|---------|-------|-----------|
| Navegação | expo-router | arquivo em `app/` |
| GPS | expo-location | `Location.getCurrentPositionAsync()` |
| Sensores | expo-sensors | `Accelerometer.addListener()` |
| Mapas Web | react-native-webview | `<WebView source={{ html }} />` |
| Notificações | expo-notifications | `scheduleNotificationAsync()` |
| http | fetch | `fetch(url)` nativo |
| Icons | @expo/vector-icons | `<Ionicons name="" />` |
| Charts | victory-native | `<VictoryLine data={} />` |

---

## 💡 Tips & Quirks

### Dicas Gerais

1. **Sempre use `npx expo install` para instalar dependências** — instala versão compatível com seu SDK
2. **Limpe cache com `npx expo start --clear`** quando houver problemas
3. **Use `expo prebuild`** antes de compilar APK standalone
4. **Teste em dispositivo real** — emuladores não têm GPS/sensores reais
5. **Configure `app.json` com permissions necessárias** antes de compilar

### Quirks Conhecidos

1. **Push notifications removidas do Expo Go no SDK 53** — use development build
2. **Victory Native pode ser lento em Android antiguos** — reduza número de pontos
3. **WebView não suporta geolocation por padrão** — configure `geolocationEnabled={true}`
4. **expo-location pode retornar coordenadas inválidas dentro de lugares fechados** — use espaços abertos para testar
5. **CORS pode bloquear requisições externas** — configure servidor para aceitar seu domínio ou use JSONP
6. **Instabilidade de toque no Drawer (Android)** — Itens inferiores podem parar de responder. Solução: usar `ScrollView` nativo, `flexGrow: 1` e desabilitar `newArchEnabled` no `app.json`.


---

## ⚙️ Sistema de Configurações

O app DDMI inclui um sistema completo de personalização:

### Context API

#### 📦 `AppContext` (contexts/AppContext.js)
**Propósito:** Gerenciar configurações globais do app (idioma e tema).

**Estados gerenciados:**
- `locale`: Idioma atual (en, pt-BR, eo)
- `themeMode`: Modo de tema (light, dark, highContrast, automatic)
- `setLocale()`: Função para alterar idioma
- `setThemeMode()`: Função para alterar tema

**Uso:**
```javascript
import { useAppContext } from '../contexts/AppContext';

function MyComponent() {
  const { locale, setLocale, themeMode, setThemeMode } = useAppContext();
  
  return (
    <View>
      <Text>Idioma: {locale}</Text>
      <Text>Tema: {themeMode}</Text>
    </View>
  );
}
```

#### 📦 `ThemeContext` (contexts/ThemeContext.js)
**Propósito:** Fornecer cores do tema atual baseado no modo selecionado.

**Paletas disponíveis:**
- **Light:** Fundo branco, texto preto
- **Dark:** Fundo preto, texto branco
- **High Contrast:** Preto/branco máximo (acessibilidade)
- **Automatic:** Segue configuração do sistema

**Uso:**
```javascript
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { theme, isDark, highContrast } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>Olá!</Text>
    </View>
  );
}
```

### Tela de Configurações (app/settings.jsx)

Tela que permite usuário selecionar:
- **Idioma:** Português, English, Esperanto
- **Tema:** Claro, Escuro, Alto Contraste, Automático

**Arquitetura:**
1. Settings usa AppContext para exibir valores atuais
2. Ao selecionar opção, chama setLocale() ou setThemeMode()
3. ThemeProvider detecta mudança e atualiza cores
4. I18nSyncer detecta mudança de locale e atualiza traduções

---

## 👍 Agradecimentos

Obrigado por usar o DDMI! 🚀