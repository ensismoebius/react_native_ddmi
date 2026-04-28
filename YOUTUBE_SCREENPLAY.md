# Screenplay YouTube - DDMI: De Zero a Herói

## Título do Vídeo
**"DO ZERO AO APP COMPLETO! React Native + Expo Tutorial Completo em Português"**

## Duração Estimada
**45-60 minutos** (vídeo completo)
**Episódios sugeridos:** 4-5 partes de ~12 minutos cada

---

## EPISÓDIO 1: Fundamentos e Setup (12 min)

### 00:00 - 00:30 | INTRO
```
[NARRADOR]
Bem-vindo ao tutorial mais completo de React Native em português!
Hoje a gente vai construir do zero um app completo de demonstrações.
O DDMI -um app que mostra GPS, sensores, mapas, notificaciones,
integração com APIs, e muito mais.
Se você ALWAYS quis aprender React Native mas não sabia por onde começar,
este vídeo é pra você. Bora lá!
```

### 00:30 - 02:00 | O QUE VAMOS CONSTRUIR
```
[NARRADOR]
Antes de colocar a mão na massa, deixa eu te mostrar o que a gente vai fazer.
(Mostrar o app funcionando)

Este app tem:
- 🌐 Integração com APIs REST ( CEP, Express, PHP )
- 📍 GPS e Localização em tempo real  
- 🗺️ Mapas interativos com Leaflet
- 📱 Sensores do celular (acelerômetro, giroscópio)
- 🔔 Notificações locais
- 🌎 Sistema de tradução (Português, Inglês, Esperanto)
- 🎨 Tema escuro, claro e alto contraste

E o melhor: tudo isso rodando num celular Android ou iOS real.
E também no navegador!
```

### 02:00 - 04:00 | FERRAMENTAS NECESSÁRIAS
```
[NARRADOR]
Vamos precisar de algumas ferramentas. Deixa eu te mostrar cada uma:

1. **Node.js** - Runtime de JavaScript
   - Baixar em nodejs.org
   - Versão LTS recomendada (18 ou 20)

2. **Visual Studio Code** - Editor de código
   - Gratuito, muito usado pela comunidade
   - Extensões que vamos instalar: ESLint, Prettier

3. **Expo CLI** - Nossa ferramenta principal
   - Já vem com o Expo
   - Permite criar apps rápidos

4. **Git** - Controle de versão
   - Para salvar nosso progresso
```

### 04:00 - 06:00 | CRIANDO O PROJETO
```
[NARRADOR]
Agora vamos criar o projeto. Abre o terminal e digita:

npx create-expo-app@latest DDMI --template blank

(Aguardarinstalação)

Perfeito! Projeto criado. Agora vamos entrar na pasta:

cd DDMI

E iniciar o servidor:

npm start  ou  npx expo start

(Vai abrir no navegador)
```

### 06:00 - 08:00 | ESTRUTURA DO PROJETO
```
[NARRADOR]
Vamos explorar a estrutura que foi criada:

- **app/** - Onde ficam as telas (expo-router)
- **assets/** - Imagens e fontes
- **package.json** - Dependências do projeto

Mas espera, a gente vai criar uma estrutura melhor.
Vamos usar uma arquitetura limpa e organizada.
```

### 08:00 - 10:00 | INSTALANDO DEPENDÊNCIAS
```
[NARRADOR]
Agora vamos instalar as bibliotecas que vamos usar:

npx expo install expo-location expo-sensors expo-notifications
npx expo install react-native-webview expo-constants expo-linking
npx expo install @expo/vector-icons expo-font expo-blur
npx expo install react-native-maps victory-native
npx expo install i18next react-i18next expo-localization
npx expo install @react-navigation/native @react-navigation/drawer

(Vai instalando cada linha, explicando brevemente cada库)
```

### 10:00 - 12:00 | RESUMO E PRÓXIMO PASSO
```
[NARRADOR]
Beleza! Primeiro episódio está pronto.
Vimos:
- O que vamos construir
- Ferramentas necessárias
- Como criar o projeto
- Estrutura básica
- Instalar dependências

No próximo episódio: vamos criar nosso primeiro componente,
aprender sobre styled components, e fazer a tela inicial.
Não esquece de dar like e se increver!
A gente seve no próximo episódio!
```

---

## EPISÓDIO 2: Componentes e Estilização (12 min)

### 00:00 - 00:30 | REVIEW
```
[NARRADOR]
E aí, pessoal! Bem-vindos ao episódio 2.
No episódio anterior a gente criou o projeto e instalou as dependências.
Hoje vamos criar nossa primeira estrutura de componentes.
```

### 00:30 - 03:00 | TEMA CENTRALIZADO
```
[NARRADOR]
Uma boa prática em React Native é ter um arquivo de tema centralizado.
Todas as cores, espaçamentos, fontes em um só lugar.
Então quando você quiser mudar a cor do app, muda em um lugar só!

Vamos criar: constants/theme.js

(Escrever o código passo a passo)

Aqui definimos:
- colors: todas as cores do app
- radii: bordas arredondadas
- spacing: espaçamentos
- typography: tamanhos de fonte
```

### 03:00 - 06:00 | COMPONENTES REUTILIZÁVEIS  
```
[NARRADOR]
Agora vamos criar componentes reutilizáveis.
São componentes que vamos usar em várias partes do app.

Criando: components/Button.jsx
- Várias variantes (primary, secondary, danger)
- Estados (loading, disabled)
- Tamanhos (small, medium, large)

Criando: components/Card.jsx
- Container com sombra
- Borda arredondada

Criando: components/TextInput.jsx
- Campo de texto estilizado
- Estados de erro e desabilitado

Cada componente com props bem definidas!
```

### 06:00 - 09:00 | TELA INICIAL E FIXING BUGS
```
[NARRADOR]
Agora vamos criar a tela inicial do app.
Vai ter um menu organizado por seções.

Criando: app/index.jsx

- Header com nome do app
- Lista de seções:
  - Rede e Dados (CEP, APIs)
  - Sensores (acelerômetro, etc)
  - Maps (GPS, localização)
  - Notificações
  - Outros
  
Cada seção com botões que navegam para as funcionalidade específicas.

DICA DE OURO: Se você notar que os botões do menu lateral param de funcionar no Android, 
não entre em pânico! Isso é um bug conhecido da Nova Arquitetura do React Native.
A gente resolve isso usando um ScrollView nativo e desabilitando o 'newArchEnabled' no app.json.
Tudo isso já está implementad no projeto!
```

### 09:00 - 11:00 | TESTANDO NO CELULAR
```
[NARRADOR]
Vamos testar! Abra o app no seu celular.

Scanear o QRcode do terminal.
Vai abrir a tela inicial com o menu.
Os botões já funcionam e navegam para páginas vazias agora.
```

### 11:00 - 12:00 | RESUMO
```
[NARRADOR]
Épisode 2 pronto!
Aprendemos:
- Criar tema centralizado
- Componentes reutilizáveis
- Tela inicial com navegação

Próximo: GPS e localização!
```

---

## EPISÓDIO 3: GPS e Mapas (12 min)

### 00:00 - 00:30 | INTRO GPS
```
[NARRADOR]
Episode 3! Agora a gente vai trabalhar com localização.
Vou te mostrar como acessar o GPS do celular,
como mostrar coordenadas, e até um mapa interativo.
```

### 00:30 - 03:00 | PERMISSÕES
```
[NARRADOR]
Primeiro passo: permissões.
O Android e iOS pedem permissão para usar o GPS.
No Expo isso é superfácil com expo-location.

Vamos criar: app/gps01.jsx

(Escrever código passo a passo)

requestForegroundPermissionsAsync() - pede permissão
getCurrentPositionAsync() - pega localização atual
```

### 03:00 - 05:00 | GPS ESTÁTICO
```
[NARRADOR]
GPS 1: Uma leitura só. Quando abre a tela, busca local atual uma vez.
Mostra latitude e longitude na tela.
Simples assim!
```

### 05:00 - 08:00 | GPS TEMPO REAL
```
[NARRADOR]
GPS 2: Tempo real. Usa watchPositionAsync()
Atualiza a cada segundo - mostra no mapa!
Vou criar um mapa usando Leaflet dentro de WebView.
É leve e funciona no Expo Go!
```

### 08:00 - 10:00 | MAPAS INTERATIVOS
```
[NARRADOR]
Agora vamos fazer mapas mais complexos.
Vou mostrar três exemplos:

Mapa 1: Mapa básico estático
Mapa 2: Mapa que segue sua localização
Mapa 3: Mapa que você controla manualmente

Todos usando Leaflet via WebView - funciona everywhere!
```

### 10:00 - 12:00 | RESUMO
```
[NARRADOR]
Episode 3 completo!
- Permissões de localização
- Pegar coordenadas uma vez
-.watchPositionAsync para tempo real
- Mapas com Leaflet

Próximo episodio: Sensores!
```

---

## EPISÓDIO 4: Sensores e Notificações (12 min)

### 00:00 - 00:30 | INTRO SENSORES
```
[Narrador]Episode 4! Agora vamos mexer com os sensores do celular.
Acelerômetro, giroscópio, magnetômetro, sensor de movimento.
Muito legal!
```

### 00:30 - 03:00 | ACELERÔMETRO
```
[Narrador]
Acelerômetro mede a aceleração do dispositivo em 3 eixos: X, Y, Z.
Útil para detectar se o celular está em movimento, inclinação, etc.

Criando: app/sensor_accell.jsx

Explicar cada eixo:
- X: esquerda/direita
- Y: cima/baixo  
- Z: frente/trás

Mostrar os valores em tempo real na tela!
```

### 03:00 - 05:00 | GIROSCOPIO E MAGNETÔMETRO
```
[Narrador]
Giroscópio: mede rotação do dispositivo.
Magnetômetro: mede campo magnético (como uma bússola)

Cada sensor tem API similar (addListener, remove).
```

### 05:00 - 07:00 | NOTIFICAÇÕES
```
[Narrador]
Agora: notificações locais!
Expo Notifications permite agendarsem servidor.

Criando: app/notificacoes.jsx
- Notificação básica
- Com som
- Agendada (dispara depois de X segundos)

ATENÇÃO: No Expo Go SDK 53, push notifications só funcionam
em development build. Mas local notifications funcionam everywhere!
```

### 07:00 - 10:00 | REDE E APIs
```
[Narrador]
Agora vamos integrar com servidor!
Vou mostrar como buscar dados de APIs externas.

1. Consulta CEP - ViaCEP API (gratuita!)
   - Digita CEP
   - Retorna endereço

2. POST JSON - Enviar dados
   - Formulário simples
   - Enviar via fetch()

3. PHP Backend - Exemplo simples
   - Servidor PHP retorna dados
```

### 10:00 - 12:00 | RESUMO E ENCERRAMENTO
```
[Narrador]
Episódio 4 pronto!
Vimos:
- Sensores (acelerômetro, giroscópio, magnetômetro)
- Notificações locais
- Integração com APIs REST

Mas ainda tem mais! No próximo episódio:
- Sistema de tradução (i18n)
- Tema escuro/claro
- Compilar APK!
```

---

## EPISÓDIO 5: i18n, Tema e Build Final (12 min)

### 00:00 - 00:30 | INTRO FINAL
```
[Narrador]
Último episódio! Vamos completar o app.
Vou mostrar:
- Sistema de tradução multilíngue
- Tema (claro, escuro, alto contraste)
- Como compilar um APK para distribuir
```

### 00:30 - 03:00 | TRADUÇÕES (i18n)
```
[Narrador]
Vamos fazer o app em 3 idiomas:
Português, Inglês, Esperanto!

Criando: i18n/index.js (config i18next)
Criando: i18n/locales/pt-BR.json
Criando: i18n/locales/en.json
Criando: i18n/locales/eo.json

Cada arquivo tem as traduções em formato chave-valor.
```

### 03:00 - 05:00 | CONTEXT API - CONFIGURAÇÕES
```
[Narrador]
Agora: Context API! Conceito super importante em React.

Vamos criar: contexts/AppContext.js
- Gerencia idioma e tema
- Disponibiliza para todo o app

E: contexts/ThemeContext.js
- Fornece cores baseado no tema
- Suporta light, dark, highContrast, automatic
```

### 05:00 - 07:00 | TELA DE CONFIGURAÇÕES
```
[Narrador]
Tela de configurações: app/settings.jsx

- Selector de idioma (3 opções)
- Selector de tema (4 opções)

Tudo integrado com os contexts que criamos!
```

### 07:00 - 09:00 | COMPILANDO APK
```
[Narrador]
MOMENTO IMPORTANTÍSSIMO: Compilar APK!

Primeiro, gerar projeto nativo:
npx expo prebuild --platform android

Isso cria a pasta android/ comtodo o código nativo.

Agora compilar:
cd android
./gradlew assembleDebug

APK gerado em: android/app/build/outputs/apk/debug/app-debug.apk

Este APK já inclui o JavaScript bundlado!
Funciona SEM precisar do Metro bundler!
```

### 09:00 - 10:00 | REVIEW COMPLETO
```
[Narrador]
VAMOS REVISAR TUDO que construímos!

- ✅ Layout com navegação drawer
- ✅ Tela inicial com seções
- ✅ GPS (estático e tempo real)
- ✅ Mapas com Leaflet
- ✅ Sensores (acelerômetro, etc)
- ✅ Notificações locais
- ✅ Integração API (CEP, JSON, PHP)
- ✅ Sistema de tradução múltipla
- ✅ Tema (claro, escuro, contraste)
- ✅ APK compilado e pronto para分发
```

### 10:00 - 12:00 | AGRADECIMENTOS
```
[Narrador]
Pessoal, chegamos ao fim deste tutorial!
O DDMI está completo e funcionando.

O que vocês aprenderam:
- React Native + Expo do zero
- Componentes reutilizáveis
- Context API
- GPS e sensores
- Mapas
- Notificações
- Integração com APIs
- i18n (traduções)
- Theme switching
- Build de APK

Se vocês quiserem ver o código completo,
está no GitHub (link na descrição).

Deixa nos comentários o que vocês querem aprender next!
Like, inscreve, e vamos lá para próximo tutorial!

Valeu, pessoal! 🚀
```

---

## NOTAS DE PRODUÇÃO

### DICAS PARA GRAVAÇÃO
1. **Use Teleprompter** - Screenplay ajuda a não perder o roteiro
2. **Mostre o código** - Grave a tela do VSCode enquanto explica
3. **Demonstre no celular real** - Mais impacto que emulador
4. **精神精神** - Dê energia! Tutorial也要divertido

### IDEIAS PARA PRÓXIMOS TUTORIAIS
- Login com Firebase
- Banco de dados local (SQLite)
- Câmera e Galeria
- Publicar na Google Play Store
- React Native CLI vs Expo (avançado)

### HASHTAGS RECOMENDADAS
#ReactNative #Expo #Mobile #Tutorial #Programação #DesenvolvimentoMobile #JavaScript #iOS #Android #Código

---

**FIM DO SCREENPLAY**