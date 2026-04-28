# DDMI — Aplicativo Demo React Native / Expo

Coleção de telas demonstrando recursos comuns de desenvolvimento mobile com React Native e Expo.

---

## 📋 Requisitos

- Node.js 18+
-dispositivo Android/emulador **ou** dispositivo iOS/simulador

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

## 📁 Estrutura do Projeto

```
ddmi/
├── app/                    # Telas do Expo Router (Drawer navigation)
│   ├── _layout.tsx         # Layout raiz com menuDrawer
│   ├── index.jsx           # Tela inicial (Home)
│   ├── gps01.jsx           # GPS único
│   ├── gps02.jsx            # GPS contínuo
│   ├── consultaCEP.jsx      # Consulta CEP
│   ├── route.jsx           # Planejador de rotas
│   ├── sensor_*.jsx       # Sensores (acelerômetro, giroscópio, etc)
│   ├── notificacoes*.jsx   # Notificações
│   └── mapa*.jsx          # Mapas (WebView)
│
├── components/             # Componentes UI reutilizáveis
│   ├── Button.jsx          # Botão com variantes
│   ├── Card.jsx           # Card com sombras
│   ├── TextInput.jsx       # Campo de texto estilizado
│   └── Loading.jsx        # Indicador de carregamento
│
├── hooks/                  # Custom hooks
│   └── useTranslation.js  # Hook para traduções i18n
│
├── constants/              # Constantes da aplicação
│   ├── navigation.js      # Configuração do menuDrawer
│   └── theme.js          # Cores, espaçamentos, tipografia
│
├── i18n/                  # Internacionalização
│   ├── index.js          # Configuração i18next
│   └── locales/
│       ├── en.json       # Traduções em inglês
│       └── pt-BR.json    # Traduções em português
│
├── utils/                 # Utilitários
│   └── mapTemplates.js   # Templates HTML para mapas
│
├── utilidades/            # Utilitários legados
│   ├── estilos.js        # Estilos compartilhados
│   └── coordenadas.js  # Funções de coordenadas
│
├── __tests__/             # Testes Jest
│   ├── navigation.test.js
│   ├── i18n.test.js
│   ├── theme.test.js
│   ├── Button.test.jsx
│   ├── Card.test.jsx
│   └── TextInput.test.jsx
│
└── package.json
```

---

## 🧭 Sistema de Navegação

O aplicativo usa **Drawer Navigation** (menu lateral) do expo-router.

### Configuração

Todas as opções do menu estão centralizadas em `constants/navigation.js`:

```javascript
export const DRAWER_SCREENS = [
  { name: 'index', label: 'Home', title: 'DDMI', icon: 'home-outline' },
  { name: 'route', label: 'Route Planner', title: 'Route Planner', icon: 'map-outline' },
  // ... mais itens
];
```

Para adicionar uma nova tela:
1. Crie o arquivo em `app/nome-da-tela.jsx`
2. Adicione o item em `constants/navigation.js`

---

## 🌎 Internacionalização (i18n)

O app suporta inglês e português brasileiro.

### Arquivos de Tradução

- `i18n/locales/en.json` — Inglês
- `i18n/locales/pt-BR.json` — Português

### Como Usar

```javascript
import { useTranslation } from '../hooks/useTranslation';

function MinhaTela() {
  const { t } = useTranslation();
  
  return <Text>{t('chave.de.translacao')}</Text>;
}
```

### Chaves de Tradução

| Seção | Chaves |
|-------|--------|
| **app** | name, subtitle |
| **nav** | home, routePlanner, currentLocation, etc. |
| **home** | redeEDados, sensores, localizacao, notificacoes, outros |
| **gps** | waiting, permissionDenied |
| **cep** | enterCep, search, address, neighborhood, city, state |
| **sensor** | accelerometer, gyroscope, magnetometer, axisX, axisY, axisZ |
| **common** | loading, error, cancel, save, delete, edit, add, back, go |

---

## 🎨 Tema e Cores

Todas as cores e estilos centralizados em `constants/theme.js`:

```javascript
export const colors = {
  primary: '#007AFF',
  success: '#10B981',
  danger: '#EF4444',
  // ...
};

export const radii = { sm: 8, md: 12, lg: 16 };
export const spacing = { sm: 8, md: 12, lg: 16 };
export const typography = { h1: {...}, body: {...} };
```

---

## 📱 Telas Disponíveis

### Home (`app/index.jsx`)

Ponto de entrada. Lista botões que navegam para todas as outras telas.

---

### GPS Estático (`app/gps01.jsx`)

Obtém a posição atual **uma única vez** ao abrir a tela.

**Como usar:**
1. Abra a tela e aceitar a solicitação de permissão
2. Latitude e longitude são exibidas

---

### Localização Atual (`app/gps02.jsx`)

Acompanha a posição do dispositivo continuamente, atualizando a cada segundo.

**Como usar:**
1. Abra a tela e aceite a permissão de localização
2. Coordenadas atualizam em tempo real conforme você se move

---

### Consulta CEP (`app/consultaCEP.jsx`)

Busca endereço pelo CEP brasileiro via API pública [ViaCEP](https://viacep.com.br).

**Como usar:**
1. Digite um CEP de 8 dígitos (só números)
2. Toque em **Buscar CEP**
3. Endereço, bairro, cidade e estado são exibidos

---

### Planejador de Rotas (`app/route.jsx`)

Planejamento de rotas inteligentes com busca de endereço e direções turn-by-turn usando OSRM.

**Recursos:**
- Busca de endereço via Nominatim API
- Cálculo de rota via OSRM
- Linha azul da rota desenhada no mapa

**Como usar:**
1. Digite um endereço de destino
2. Toque em **Traçar Rota**
3. O mapa mostra a rota até o destino

---

### Acelerômetro (`app/sensor_accell.jsx`)

Lê o acelerômetro do dispositivo a 10 Hz e exibe valores x/y/z em tempo real.

---

### Sensores de Movimento (`app/sensor_motion.jsx`)

Lê o giroscópio a 20 Hz e plota dados x/y/z como gráficos de linha (Victory Native).

---

### Giroscópio (`app/sensor_gyroscope.jsx`)

Mesmo que *Sensor de Movimento* mas armazena até 100 pontos por eixo.

---

### Magnetômetro (`app/sensor_magnetometer.jsx`)

Lê o magnetômetro a 20 Hz e exibe valores x/y/z. Domínio: −100 a 100 µT.

---

### Mapa Básico (`app/mapa01.jsx`)

Mostra WebView com OpenStreetMap centralizado na posição atual (busca única).

**Como usar:**
1. Aceite a permissão de localização
2. O mapa carrega e centraliza na sua posição

---

### Mapa ao Vivo (`app/mapa02.jsx`)

Mesmo que *Mapa Básico* mas o mapa recentraliza conforme o dispositivo se move.

---

### Mapa Manual (`app/mapa03.jsx`)

Entrada manual de coordenadas com suporte a marcadores OSM.

**Como usar:**
1. Digite *Latitude* e *Longitude*
2. Toque em **Ir**
3. O mapa pan para essas coordenadas e adiciona um marcador

---

### Notificações 1 (`app/notificacoes.jsx`)

Notificações push locais básicas usando `expo-notifications`.

**Como usar:**
1. Toque em **Agendar Notificação** — uma notificação "Olá do Expo!" é disparada após 2 segundos
2. Notificações recebidas são mostradas na tela

---

### Notificações 2 (`app/notificacoes2.jsx`)

Mesmo que *Notificações 1* mas com `trigger: { seconds: 0 }` (dispara imediatamente).

---

### Notificações 3 (`app/notificacoes3.jsx`)

Mesmo que *Notificações 2* mas toca um som customizado (`assets/sounds/oloco.mp3`).

---

### Enviar JSON (`app/postJson.jsx`)

Envia request POST com corpo JSON para API pública de teste [JSONPlaceholder](https://jsonplaceholder.com).

**Como usar:**
1. Preencha *Título da mensagem* e *Mensagem*
2. Toque em **Enviar**
3. O `id` retornado pelo servidor é mostrado

---

### Teste de Backend (`app/postGetPhp.jsx`)

Demonstra requests GET e POST para backend PHP local (`http://localhost/api.php`) protegido por header de API key (`X-API-KEY`).

**Como usar:**
1. Toque em **Carregar dados** — executa GET e exibe JSON
2. Preencha *Nome* e *Email*, depois toque em **Enviar** — executa POST e mostra resposta

> O servidor PHP deve estar rodando localmente. Atualize `API_URL` e `API_KEY` no arquivo conforme sua configuração.

---

### Gerenciar Usuários (`app/expressUsers.jsx`)

Interface CRUD completa contra API REST Express + MySQL local.

**Requires:** servidor Express rodando em `http://localhost:5173/`.

```bash
# no diretório do servidor
node server/index.js
```

O servidor expõe:

| Método | Endpoint       | Descrição     |
|--------|----------------|---------------|
| GET    | /api/users     | Listar usuários |
| POST   | /api/users     | Criar usuário |
| PUT    | /api/users/:id | Atualizar usuário |
| DELETE | /api/users/:id | Deletar usuário |

**Como usar:**
1. Abra a tela — usuários são buscados automaticamente
2. **Adicionar:** preencha *Nome* e *E-mail*, toque **Adicionar**
3. **Editar:** toque **Editar** em uma linha, altere campos, toque **Salvar**. Toque **Cancelar** para abortar
4. **Deletar:** toque **Excluir** em uma linha
5. Toque **Recarregar** para atualizar manualmente a lista

> Em dispositivo Android físico, `localhost` se refere ao dispositivo, não ao seu computador.
> Substitua `localhost` em `API_BASE` dentro de `app/expressUsers.jsx` pelo IP da sua rede (ex: `192.168.1.x`).

---

## 🧪 Testando

O projeto usa Jest com `jest-expo` para testes.

```bash
# Executar todos os testes
npm test

# Executar em modo watch
npm run test:watch
```

### Cobertura de Testes

| Módulo | Testes |
|--------|--------|
| Navigation | 3 testes |
| i18n | 5 testes |
| Theme | 5 testes |
| Button | 3 testes |
| Card | 3 testes |
| TextInput | 3 testes |
| **Total** | **22 testes** |

---

## 🚀 Dozero ao App Completo: Guia Passo a Passo

Este guia mostra como criar o app DDMI do zero, uma funcionalidade por vez.

### Passo 1: Criar o Projeto

Comece com um projeto Expo limpo:

```bash
npx create-expo-app@latest ddmi --template blank
cd ddmi
npm install
```

Execute para verificar:
```bash
npx expo start
```

---

### Passo 2: Configurar NavegaçãoDrawer

O app usaDrawer do expo-router para menu lateral.

1. Instale os pacotes necessários:
```bash
npx expo install react-native-gesture-handler react-native-safe-area-context @expo/vector-icons
```

2. Crie `constants/navigation.js`:
```javascript
import { Ionicons } from '@expo/vector-icons';

export const DRAWER_SCREENS = [
  { name: 'index', label: 'Home', title: 'DDMI', icon: 'home-outline' },
  { name: 'route', label: 'Route Planner', title: 'Route Planner', icon: 'map-outline' },
];
```

3. Crie `components/CustomDrawerContent.jsx`:
```javascript
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Ionicons name="rocket" size={40} color="#fff" />
        <Text style={styles.headerText}>DDMI App</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
```

4. Atualize `app/_layout.tsx`:
```javascript
import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { DRAWER_SCREENS } from '../constants/navigation';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: '#fff',
          }}
        >
          {DRAWER_SCREENS.map((screen) => (
            <Drawer.Screen 
              key={screen.name}
              name={screen.name} 
              options={{ 
                drawerLabel: screen.label, 
                title: screen.title,
                drawerIcon: ({ color }) => <Ionicons name={screen.icon} size={22} color={color} />
              }} 
            />
          ))}
        </Drawer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

5. Crie `app/index.jsx`:
```javascript
import { useRouter } from "expo-router";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DDMI</Text>
      <ScrollView>
        <TouchableOpacity onPress={() => router.push('route')}>
          <Text>Route Planner</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold' },
});
```

---

### Passo 3: Adicionar GPS Localização

1. Instale expo-location:
```bash
npx expo install expo-location
```

2. Crie `app/gps01.jsx` (localização única):
```javascript
import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import * as Location from 'expo-location';

export default function Gps01() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {errorMsg ? <Text>{errorMsg}</Text> : 
       location ? <Text>Lat: {location.coords.latitude}, Lon: {location.coords.longitude}</Text> :
       <Text>Loading...</Text>}
    </View>
  );
}
```

3. Crie `app/gps02.jsx` (rastreamento contínuo):
```javascript
import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import * as Location from 'expo-location';

export default function Gps02() {
  const [location, setLocation] = useState(null);
  const [watching, setWatching] = useState(false);

  useEffect(() => {
    return () => {
      if (watching) Location.stopGeoforwardAsync();
    };
  }, [watching]);

  const toggleWatching = async () => {
    if (watching) {
      await Location.stopGeoforwardAsync();
      setWatching(false);
    } else {
      setWatching(true);
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, timeInterval: 1000, distanceMeter: 1 },
        (loc) => setLocation(loc)
      );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title={watching ? "Stop" : "Start"} onPress={toggleWatching} />
      {location && (
        <Text>Lat: {location.coords.latitude}{"\n"}Lon: {location.coords.longitude}</Text>
      )}
    </View>
  );
}
```

---

### Passo 4: Adicionar Mapas (OpenStreetMap WebView)

1. Instale WebView:
```bash
npx expo install react-native-webview
```

2. Crie `app/mapa01.jsx`:
```javascript
import { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { View, ActivityIndicator } from 'react-native';

export default function Mapa01() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setLoading(false);
    })();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  const mapHtml = `
    <!DOCTYPE html>
    <html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>body{margin:0;height:100vh}#map{height:100%}</style></head>
    <body><div id="map"></div>
    <script>
      var map = L.map('map').setView([${location.latitude}, ${location.longitude}], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);
      L.marker([${location.latitude}, ${location.longitude}]).addTo(map);
    </script></body></html>
  `;

  return <WebView style={{ flex: 1 }} source={{ html: mapHtml }} />;
}
```

---

### Passo 5: Adicionar Planejamento de Rotas

Crie `app/route.jsx` com busca de endereço (Nominatim API) e cálculo de rota (OSRM).

---

### Passo 6: Adicionar Sensores

1. Instale sensores:
```bash
npx expo install expo-sensors
```

2. Crie telas para cada sensor (acelerômetro, giroscópio, magnetômetro).

---

### Passo 7: Adicionar Requisições HTTP

1. Sem pacotes adicionais — use fetch nativo do JavaScript.

2. Crie `app/consultaCEP.jsx` para buscar CEPs via ViaCEP API.

---

### Passo 8: Adicionar Notificações

1. Instale notificações:
```bash
npx expo install expo-notifications
```

2. Crie telas de notificação com diferentes configurações de triggers e sons.

---

### Passo 9: Adicionar Gráficos (Victory Native)

Instale para visualização de dados:
```bash
npm install victory-native react-native-svg
```

---

### Passo 10: Adicionar CRUD com Backend Express

Para a tela de gerenciamento de usuários, você precisará de:
1. Servidor Express com MySQL (veja repositório separado)
2. A tela faz requests GET/POST/PUT/DELETE para `/api/users`

---

## 📊 Resumo

| Recurso | Pacote | Arquivos |
|---------|-------|----------|
| Navegação | expo-router | `_layout.tsx`, `navigation.js` |
| GPS | expo-location | `gps01.jsx`, `gps02.jsx` |
| Mapas | react-native-webview | `mapa01.jsx`, `mapa02.jsx`, `mapa03.jsx` |
| Sensores | expo-sensors | `sensor_*.jsx` |
| HTTP | fetch nativo | `consultaCEP.jsx`, `postJson.jsx` |
| Notificações | expo-notifications | `notificacoes*.jsx` |
| Gráficos | victory-native | `teste.jsx` |

