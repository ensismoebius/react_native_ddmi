# Roteiros de Aula — DDMI: Demonstrações React Native / Expo

## Como usar este documento

Cada aula corresponde a uma tela do projeto. O professor deve:
1. Ter o projeto rodando com `npx expo start` antes da aula
2. Abrir o arquivo referenciado no VSCode
3. Ter um dispositivo Android/iOS físico ou emulador pronto
4. Seguir o roteiro na ordem — cada aula constrói sobre as anteriores

Os alunos devem **digitar o código junto**, não copiar. O aprendizado vem do processo.

---

## Índice

### Módulo 0 — Fundamentos
- [Aula 1 — Estrutura do Projeto e Expo Router](#aula-1)

### Módulo 1 — Rede e APIs
- [Aula 2 — Consumindo API REST: Consulta de CEP](#aula-2)
- [Aula 3 — Enviando Dados com POST JSON](#aula-3)
- [Aula 4 — Backend PHP com Autenticação por Chave de API](#aula-4)
- [Aula 5 — CRUD Completo com Express.js](#aula-5)

### Módulo 2 — GPS e Mapas
- [Aula 6 — GPS Estático: uma leitura de localização](#aula-6)
- [Aula 7 — GPS em Tempo Real e Mapa ao Vivo](#aula-7)
- [Aula 8 — Mapas com OpenStreetMap e WebView](#aula-8)
- [Aula 9 — Planejador de Rotas](#aula-9)

### Módulo 3 — Sensores
- [Aula 10 — Acelerômetro](#aula-10)
- [Aula 11 — Giroscópio com Gráficos em Tempo Real](#aula-11)
- [Aula 12 — Magnetômetro](#aula-12)

### Módulo 4 — Notificações
- [Aula 13 — Notificações Locais e Som Customizado](#aula-13)

### Módulo 5 — Armazenamento Local
- [Aula 14 — Banco de Dados Local com SQLite](#aula-14)
- [Aula 15 — AsyncStorage: Chave-Valor Persistente](#aula-15)

### Módulo 6 — Listas
- [Aula 16 — FlatList com Dados Reais](#aula-16)

### Módulo 7 — Mídia
- [Aula 17 — Player de Áudio](#aula-17)
- [Aula 18 — Câmera e Galeria de Fotos](#aula-18)
- [Aula 19 — Feedback Háptico](#aula-19)

### Módulo 8 — Arquitetura
- [Aula 20 — Context API: Tema e Idioma](#aula-20)

### Módulo 9 — Manutenção e Infraestrutura
- [Aula 21 — Upgrade do Expo SDK](#aula-21)

---

<a name="aula-1"></a>
## Aula 1 — Estrutura do Projeto e Expo Router

**Arquivos:** `app/_layout.tsx`, `app/index.jsx`, `constants/navigation.js`
**Duração estimada:** 40 minutos
**Pré-requisitos:** Node.js instalado, noção básica de JavaScript e JSX
**Dependências:** `npx expo install expo-router @expo/vector-icons react-native-safe-area-context react-native-gesture-handler @react-navigation/drawer @react-navigation/native`

### Objetivo
O aluno entende como o Expo Router organiza telas como arquivos, como funciona o menu drawer, e consegue criar uma nova tela que aparece no menu.

### Conceitos ensinados
- Roteamento baseado em arquivos (file-based routing)
- O papel do `_layout.tsx` como raiz da navegação
- Drawer Navigator (menu lateral deslizante)
- `useRouter` e `router.push()` para navegar entre telas
- Diferença entre `Stack` e `Drawer`

### Roteiro

#### 1. Abertura (5 min)
"Quando a gente abre qualquer app no celular, existe uma lógica de navegação por baixo — como o app decide qual tela mostrar. Em React Native, essa lógica é chamada de navegação. Hoje vamos ver como o Expo Router resolve isso de um jeito muito elegante: cada arquivo na pasta `app/` vira uma tela automaticamente. Sem configuração manual, sem código extra."

#### 2. Teoria (10 min)
"No Expo Router, o sistema de arquivos É o sistema de rotas. Criei o arquivo `app/perfil.jsx`? Agora existe a rota `/perfil`. É a mesma ideia do Next.js para quem conhece web.

O arquivo `_layout.tsx` é especial — ele define o contêiner em volta de todas as telas. No nosso projeto ele configura o Drawer, que é aquele menu que abre deslizando da esquerda.

A hierarquia é:
```
GestureHandlerRootView
  └── SafeAreaProvider
      └── AppProvider (nosso contexto de configurações)
          └── ThemeProvider (nosso contexto de tema)
              └── Drawer (navegação)
                  └── Telas individuais
```

Cada camada dessa tem um papel. O `GestureHandlerRootView` é obrigatório para o gesto de arrastar o drawer funcionar."

#### 3. Código ao vivo (15 min)
"Vamos abrir o `constants/navigation.js`. Esse arquivo centraliza todas as telas do menu. Cada objeto tem:
- `name`: o nome do arquivo em `app/` (sem extensão)
- `label`: o texto que aparece no menu
- `title`: o título no cabeçalho da tela
- `icon`: nome do ícone do Ionicons

Agora vamos fazer juntos: criar uma nova tela. Crie o arquivo `app/ola_mundo.jsx`:

```jsx
import { View, Text } from 'react-native';

export default function OlaMundo() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Olá, Mundo!</Text>
    </View>
  );
}
```

Agora adicione no `navigation.js`:
```js
{ name: 'ola_mundo', label: 'Olá Mundo', title: 'Minha Tela', icon: 'star-outline' }
```

Salve. O Expo atualiza sozinho. Abra o menu lateral — sua tela apareceu."

#### 4. Demonstração (5 min)
Mostrar no celular: abrir o drawer deslizando da borda esquerda, clicar na nova tela, mostrar que o título no cabeçalho bate com o `title` definido.

#### 5. Exercícios
1. **Fácil:** Mude o ícone da tela recém-criada para `heart-outline` e veja a mudança.
2. **Médio:** Adicione um botão na tela `ola_mundo.jsx` que usa `useRouter` para navegar para outra tela do app (ex: `/consultaCEP`).
3. **Desafio:** Crie uma tela com dois `Text` mostrando seu nome e a data de hoje, usando `new Date().toLocaleDateString('pt-BR')`.

### Perguntas para fixação
1. O que acontece se você criar um arquivo `app/teste.jsx` mas não adicionar ele em `navigation.js`? (A tela existe e é acessível via `router.push('/teste')`, mas não aparece no drawer.)
2. Qual a diferença entre `label` e `title` em um item do drawer?
3. Por que o `GestureHandlerRootView` precisa ser o elemento raiz?

---

<a name="aula-2"></a>
## Aula 2 — Consumindo API REST: Consulta de CEP

**Arquivo:** `app/consultaCEP.jsx`
**Duração estimada:** 35 minutos
**Pré-requisitos:** Aula 1, conhecimento de `useState` e `useEffect`
**Dependências:** nenhuma nova — usa `fetch()` nativo do JavaScript e React Native built-ins. API: https://viacep.com.br (pública)

### Objetivo
O aluno consegue fazer uma requisição HTTP GET para uma API pública, tratar estados de carregamento e erro, e exibir os dados retornados.

### Conceitos ensinados
- `fetch()` nativo do JavaScript para requisições HTTP
- `.then()` encadeado para processar resposta
- `useState` para carregamento, erro e dados
- Validação de entrada antes de chamar a API
- `Alert.alert()` para mensagens de erro nativas

### Roteiro

#### 1. Abertura (5 min)
"Quase todo app de verdade precisa buscar dados de um servidor. O seu app de clima busca temperatura, o de música busca as músicas, o de e-commerce busca os produtos. Hoje vamos aprender a mecânica básica disso usando uma API real e gratuita: o ViaCEP. Você digita um CEP brasileiro e ele devolve o endereço completo."

#### 2. Teoria (8 min)
"O `fetch()` é uma função nativa do JavaScript — funciona no browser e no React Native. Ela retorna uma Promise. Quando a resposta chega, precisamos convertê-la para JSON com `.json()`, que também é uma Promise. Por isso encadeamos dois `.then()`.

O fluxo é sempre o mesmo:
1. Usuário clica no botão
2. A gente ativa um estado `carregando = true` (mostra spinner)
3. Chama o `fetch()`
4. Quando retorna, salva os dados no estado
5. `carregando = false`

Se der erro em qualquer ponto, cai no `.catch()`.

A API ViaCEP tem um comportamento especial: se o CEP não existe, ela retorna 200 OK mas com `{ erro: true }` no body. Por isso precisamos checar isso manualmente."

#### 3. Código ao vivo (15 min)
"Abra o `app/consultaCEP.jsx`. Vamos construir do zero:

Primeiro os estados:
```jsx
const [cep, setCep] = useState('');
const [dados, setDados] = useState(null);
const [carregando, setCarregando] = useState(false);
```

A função de busca:
```jsx
async function carregaDadosDoCEP() {
  if (cep.length !== 8) {
    Alert.alert('Erro', 'O CEP deve ter 8 dígitos');
    return;
  }
  setCarregando(true);
  await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(resposta => resposta.json())
    .then(dadosEmJson => {
      if (dadosEmJson.erro) {
        Alert.alert('Erro', 'CEP não encontrado');
        setDados(null);
      } else {
        setDados(dadosEmJson);
      }
    })
    .catch(erro => Alert.alert('Erro de rede', erro.message))
    .finally(() => setCarregando(false));
}
```

No JSX, explique cada peça: o `TextInput` com `keyboardType='numeric'`, o `ActivityIndicator` condicional, e o bloco `{dados && (...)}` que só aparece quando temos dados."

#### 4. Demonstração (5 min)
Testar com um CEP válido (ex: `01310100` — Av. Paulista), um CEP inválido (ex: `00000000`), e um CEP com menos de 8 dígitos.

#### 5. Exercícios
1. **Fácil:** Adicione um botão "Limpar" que faz `setDados(null)` e `setCep('')`.
2. **Médio:** Mostre também o CEP completo (`dados.cep`) e o DDD (`dados.ddd`) no resultado.
3. **Desafio:** Formate o CEP automaticamente enquanto o usuário digita: `12345-678`. Dica: use `onChangeText` para aplicar uma máscara.

### Perguntas para fixação
1. Por que usamos `.finally()` em vez de setar `carregando = false` dentro de cada `.then()` e `.catch()`?
2. O que acontece se chamarmos `fetch()` sem `await`?
3. Por que a ViaCEP retorna 200 OK mesmo quando o CEP não existe?

---

<a name="aula-3"></a>
## Aula 3 — Enviando Dados com POST JSON

**Arquivo:** `app/postJson.jsx`
**Duração estimada:** 30 minutos
**Pré-requisitos:** Aula 2
**Dependências:** nenhuma nova — usa `fetch()` nativo. API: https://jsonplaceholder.typicode.com (pública)

### Objetivo
O aluno consegue enviar dados estruturados para um servidor via POST com corpo JSON, e processar a resposta.

### Conceitos ensinados
- Diferença entre GET (buscar) e POST (enviar)
- `method: 'POST'` no fetch
- `headers: { 'Content-Type': 'application/json' }` — obrigatório para POST JSON
- `body: JSON.stringify(objeto)` — serializar objeto JavaScript em string JSON
- API pública de teste: jsonplaceholder.typicode.com

### Roteiro

#### 1. Abertura (5 min)
"Na aula passada a gente buscou dados — foi um GET. Hoje vamos enviar dados — o POST. É o que acontece quando você preenche um formulário e clica em 'Enviar'. O celular manda os dados do formulário para o servidor, e o servidor processa e responde."

#### 2. Teoria (8 min)
"No HTTP, GET é 'me dá esses dados' e POST é 'toma esses dados'. Para POST, precisamos configurar três coisas no fetch:
- `method: 'POST'` — muda o verbo HTTP
- `headers: { 'Content-Type': 'application/json' }` — avisa o servidor que o corpo é JSON
- `body: JSON.stringify({ ... })` — o dado em si, convertido para string

O `JSON.stringify()` converte um objeto JavaScript `{ nome: 'João' }` na string `'{"nome":"João"}'`. O servidor então desconverte do lado dele.

Vamos usar o JSONPlaceholder, uma API fake para testes. Ele aceita POST e responde como se tivesse salvo, mas na verdade descarta tudo. Perfeito para aprender."

#### 3. Código ao vivo (12 min)
"Abra `app/postJson.jsx`. Dois estados de entrada (titulo e mensagem) e um estado de resposta:

```jsx
const [titulo, setTitulo] = useState('');
const [mensagem, setMensagem] = useState('');
const [dados, setDados] = useState(null);

async function enviaDados() {
  const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, mensagem })
  });
  const json = await resposta.json();
  setDados(json);
}
```

Note que o JSONPlaceholder devolve o objeto que você mandou mais um `id` gerado. Mostre `dados.id` na tela para confirmar que o servidor respondeu."

#### 4. Demonstração (3 min)
Preencher o formulário e enviar. Mostrar o `id` retornado na tela. Abrir o Network tab no console do Expo para mostrar a requisição saindo.

#### 5. Exercícios
1. **Fácil:** Adicione validação: se `titulo` estiver vazio, mostre um `Alert` e não envie.
2. **Médio:** Após envio bem-sucedido, limpe os campos do formulário automaticamente.
3. **Desafio:** Use `fetch` para fazer um GET em `https://jsonplaceholder.typicode.com/posts` e mostre a lista de posts em uma `FlatList`.

### Perguntas para fixação
1. O que acontece se você esquecer o `Content-Type: application/json` no cabeçalho?
2. Qual a diferença entre `JSON.stringify()` e `JSON.parse()`? Quando usar cada um?
3. Por que o JSONPlaceholder retorna um `id` mesmo sendo uma API fake?

---

<a name="aula-4"></a>
## Aula 4 — Backend PHP com Autenticação por Chave de API

**Arquivo:** `app/postGetPhp.jsx`, `api.php`
**Duração estimada:** 40 minutos
**Pré-requisitos:** Aulas 2 e 3
**Dependências:** nenhuma nova no app — usa `fetch()` nativo. Backend: PHP com Apache/Nginx rodando `api.php` na rede local

### Objetivo
O aluno entende como proteger uma API com chave de autenticação no cabeçalho, e como o app mobile consome essa API tanto via GET quanto via POST.

### Conceitos ensinados
- Autenticação por cabeçalho HTTP (`X-API-KEY`)
- Headers personalizados no fetch
- CORS — o que é e como o servidor PHP configura
- Diferença de comportamento GET vs POST no servidor
- `file_get_contents('php://input')` no PHP para ler corpo JSON

### Roteiro

#### 1. Abertura (5 min)
"Nas aulas anteriores usamos APIs públicas que qualquer um pode chamar. Mas em aplicações reais, você não quer que qualquer pessoa acesse sua API. Você quer autenticação. Hoje vamos ver o padrão mais simples: a chave de API no cabeçalho. O app manda a chave, o servidor verifica, e só responde se a chave bater."

#### 2. Teoria (10 min)
"A autenticação por chave de API funciona assim: você define uma string secreta no servidor (ex: `'abc123secret'`). O app precisa mandar essa string no cabeçalho de cada requisição. Se não mandar, ou mandar errada, o servidor retorna 403 Forbidden.

No PHP, `getallheaders()` captura todos os cabeçalhos. A gente pega o `X-API-KEY` e compara com a constante definida. Se diferente, morre com 403.

Outro ponto importante: CORS. Quando o app React Native faz requisições HTTP, o servidor precisa responder com `Access-Control-Allow-Origin: *` para autorizar. Sem esse header, a requisição é bloqueada. Em desenvolvimento, esse bloqueio pode aparecer mesmo em apps nativos quando o Metro bundler está no meio."

#### 3. Código ao vivo (18 min)
"Primeiro vamos olhar o `api.php` — o servidor. Identifique cada bloco:
1. Os headers CORS no topo
2. A verificação `X-API-KEY`
3. O bloco `if GET`: retorna dados JSON fixos
4. O bloco `if POST`: lê o corpo com `json_decode(file_get_contents('php://input'))` e ecoa de volta

Agora o `app/postGetPhp.jsx`. Duas funções: `carregarDados` (GET) e `enviaDados` (POST):

```jsx
const API_URL = 'http://SEU_IP_LOCAL/api.php';
const API_KEY = 're98wr6ew8r6rew76r89e6rwer6w98r6ywe9r6r6w87e9wr6ew06r7';

async function carregarDados() {
  const resposta = await fetch(API_URL, {
    method: 'GET',
    headers: { 'X-API-KEY': API_KEY }
  });
  const json = await resposta.json();
  setDados(json);
}
```

**Atenção:** o IP deve ser o IP da máquina na rede local, não `localhost`. O celular não sabe quem é `localhost` — ele é outro dispositivo na rede."

#### 4. Demonstração (5 min)
Mostrar: GET funcionando, POST funcionando, e o que acontece quando você apaga a chave da requisição (403 Forbidden).

#### 5. Exercícios
1. **Fácil:** Modifique o `api.php` para retornar um campo a mais no GET: `"cidade": "São Paulo"`.
2. **Médio:** Adicione tratamento de erro no app para quando o servidor retornar 403.
3. **Desafio:** Implemente no PHP um endpoint DELETE que aceite um `id` via body JSON e retorne o id recebido confirmando a deleção.

### Perguntas para fixação
1. Por que usamos `X-API-KEY` como nome do header e não simplesmente `senha`?
2. Por que `localhost` não funciona quando o app está rodando no celular físico?
3. O que acontece com CORS em apps nativos? É um problema real?

---

<a name="aula-5"></a>
## Aula 5 — CRUD Completo com Express.js

**Arquivo:** `app/expressUsers.jsx`
**Duração estimada:** 45 minutos
**Pré-requisitos:** Aulas 2, 3 e 4
**Dependências:** nenhuma nova no app — usa `fetch()` nativo. Backend: Node.js + Express (`npm install express cors`)

### Objetivo
O aluno implementa as quatro operações de um CRUD (Create, Read, Update, Delete) consumindo uma API Express, e gerencia o estado da lista de usuários no frontend.

### Conceitos ensinados
- Os quatro verbos HTTP: GET, POST, PUT, DELETE
- Gerenciamento de estado de lista (adicionar, editar, remover item)
- Modo de edição: reutilizar o mesmo formulário para criar e editar
- `FlatList` com `TouchableOpacity` por item
- Limpeza de formulário após operação

### Roteiro

#### 1. Abertura (5 min)
"CRUD é a base de 80% dos apps do mundo: listar, criar, editar e deletar. Instagram: criar post (C), ver feed (R), editar legenda (U), apagar post (D). Hoje vamos construir um CRUD de usuários consumindo uma API Express. O frontend é o app React Native; o backend é um servidor Express rodando na sua máquina."

#### 2. Teoria (10 min)
"O protocolo HTTP tem um verbo para cada operação:
- `GET /users` → lista todos
- `POST /users` → cria um novo
- `PUT /users/42` → atualiza o usuário de id 42
- `DELETE /users/42` → apaga o usuário de id 42

No frontend, a lógica de UI precisa refletir isso. Temos um estado `editingUser`: se for `null`, o formulário está em modo de criação; se tiver um usuário, está em modo de edição. O mesmo botão 'Salvar' decide qual verbo usar baseado nesse estado."

#### 3. Código ao vivo (22 min)
"Abra `app/expressUsers.jsx`. Vamos entender o estado:

```jsx
const [users, setUsers] = useState([]);
const [editingUser, setEditingUser] = useState(null); // null = criar; objeto = editar
const [name, setName] = useState('');
const [email, setEmail] = useState('');
```

A função `saveUser` decide GET ou PUT:
```jsx
async function saveUser() {
  const url = editingUser ? `${API_BASE}/${editingUser.id}` : API_BASE;
  const method = editingUser ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });
  clearForm();
  await fetchUsers(); // recarrega a lista
}
```

`deleteUser` usa DELETE:
```jsx
async function deleteUser(id) {
  await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  await fetchUsers();
}
```

`startEdit` preenche o formulário com os dados do usuário clicado:
```jsx
function startEdit(user) {
  setEditingUser(user);
  setName(user.name);
  setEmail(user.email);
}
```

Na `FlatList`, cada item tem botões Editar e Excluir."

#### 4. Demonstração (5 min)
Criar dois usuários, editar um deles, deletar o outro. Mostrar que a lista atualiza após cada operação.

#### 5. Exercícios
1. **Fácil:** Adicione confirmação antes de deletar: `Alert.alert('Confirmar', 'Deseja excluir?', [botões])`.
2. **Médio:** Adicione um campo "telefone" ao formulário e ao item da lista.
3. **Desafio:** Implemente busca local: um `TextInput` de filtro que filtra a lista de usuários pelo nome sem chamar a API novamente.

### Perguntas para fixação
1. Por que recarregamos a lista com `fetchUsers()` após cada operação em vez de atualizar o estado local?
2. Qual a diferença semântica entre `PUT` e `PATCH`?
3. Por que a função `clearForm` é importante para a UX?

---

<a name="aula-6"></a>
## Aula 6 — GPS Estático: uma leitura de localização

**Arquivo:** `app/gps01.jsx`
**Duração estimada:** 30 minutos
**Pré-requisitos:** Aula 1, `useState` e `useEffect`
**Dependências:** `npx expo install expo-location`

### Objetivo
O aluno solicita permissão de localização ao usuário e obtém as coordenadas GPS do dispositivo uma única vez.

### Conceitos ensinados
- Sistema de permissões em apps mobile (por que existe)
- `Location.requestForegroundPermissionsAsync()` — solicitar permissão
- `Location.getCurrentPositionAsync()` — ler localização uma vez
- IIFE dentro do `useEffect` para funções async
- Padrão de estados: `null` (ainda não leu), valor (leu), erro

### Roteiro

#### 1. Abertura (5 min)
"Todo app que usa o GPS precisa pedir permissão ao usuário. É uma exigência do Android e iOS — o sistema operacional protege dados sensíveis como localização, câmera e microfone. O usuário decide se quer compartilhar. Hoje vamos ver como fazer essa solicitação e ler a posição atual."

#### 2. Teoria (8 min)
"Existem dois tipos de permissão de localização:
- **Foreground** (`requestForegroundPermissionsAsync`): funciona só enquanto o app está aberto e visível. Suficiente para 90% dos casos.
- **Background** (`requestBackgroundPermissionsAsync`): rastreia mesmo com o app fechado. Requer justificativa para as lojas.

O `getCurrentPositionAsync` retorna um objeto com `coords`: `{ latitude, longitude, altitude, accuracy, ... }`.

A precisão (`accuracy`) controla o trade-off entre velocidade e exatidão. `Accuracy.High` usa GPS puro (mais lento, mais preciso). `Accuracy.Balanced` usa WiFi + GPS (mais rápido, menos preciso). Para primeira leitura, `Balanced` já resolve."

#### 3. Código ao vivo (12 min)
```jsx
useEffect(() => {
  (async () => {                    // IIFE async — explique o padrão
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permissão de localização negada');
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
  })();
}, []); // [] = executa só uma vez, ao montar
```

"O `(async () => { ... })()` é um IIFE — Immediately Invoked Function Expression. Usamos ele porque o `useEffect` não aceita função `async` diretamente (retorno de async é uma Promise, mas o useEffect espera uma função de cleanup ou `undefined`)."

#### 4. Demonstração (3 min)
Mostrar no celular físico com GPS ativado. Mostrar que na primeira vez aparece o diálogo de permissão. Segunda vez já mostra direto. Mostrar o que acontece se negar a permissão.

#### 5. Exercícios
1. **Fácil:** Mostre a precisão da leitura (`location.coords.accuracy`) em metros.
2. **Médio:** Adicione um botão "Atualizar" que busca a localização novamente ao ser pressionado.
3. **Desafio:** Use `Location.reverseGeocodeAsync({ latitude, longitude })` para converter as coordenadas em endereço legível.

### Perguntas para fixação
1. Por que não podemos usar `async` diretamente na função passada ao `useEffect`?
2. O que acontece se o usuário negar a permissão e depois quiser usar o GPS?
3. Por que o emulador pode retornar coordenadas diferentes de onde você está?

---

<a name="aula-7"></a>
## Aula 7 — GPS em Tempo Real e Mapa ao Vivo

**Arquivo:** `app/gps02.jsx`
**Duração estimada:** 40 minutos
**Pré-requisitos:** Aula 6
**Dependências:** `npx expo install expo-location react-native-webview`

### Objetivo
O aluno implementa monitoramento contínuo de localização e exibe um mapa atualizado em tempo real via WebView com Leaflet.

### Conceitos ensinados
- `Location.watchPositionAsync()` — observar posição continuamente
- Função de cleanup no `useEffect` (cancelar subscription)
- `WebView` para renderizar HTML/JavaScript dentro do app
- Template HTML gerado dinamicamente com coordenadas
- Leaflet — biblioteca de mapas open source

### Roteiro

#### 1. Abertura (5 min)
"O GPS estático da aula anterior pega sua posição uma vez e para. Mas e se você está andando e quer o mapa acompanhando? Precisamos de atualização contínua. Hoje vamos usar o `watchPositionAsync`, que funciona como um listener — toda vez que você se move, ele avisa. E vamos mostrar isso num mapa real."

#### 2. Teoria (10 min)
"`watchPositionAsync` retorna uma subscription. Você pode pensar nela como um 'contrato': enquanto o contrato estiver ativo, cada nova posição acionará seu callback.

**Ponto crítico:** quando o usuário sai da tela, esse contrato precisa ser cancelado. Senão o GPS continua rodando em segundo plano, gastando bateria. Fazemos isso no cleanup do `useEffect`:

```jsx
return () => { if (subscription) subscription.remove(); };
```

Esse `return` dentro do `useEffect` é executado quando o componente é desmontado.

O mapa usa Leaflet, uma biblioteca JavaScript de mapas, rodando dentro de um `WebView`. O app gera HTML dinamicamente com as coordenadas e injeta na WebView. Não precisa de chave de API — usa tiles do OpenStreetMap, que são gratuitos."

#### 3. Código ao vivo (18 min)
```jsx
useEffect(() => {
  let subscription;

  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') { setErrorMsg('Permissão negada'); return; }

    subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,     // atualiza a cada 1 segundo
        distanceInterval: 1,    // ou a cada 1 metro movido
      },
      (loc) => setLocation(loc) // callback: nova posição chega aqui
    );
  })();

  return () => { if (subscription) subscription.remove(); };
}, []);
```

"Agora o mapa. A função `getLocationMapHtml(lat, lon)` gera HTML com Leaflet. Esse HTML é passado para a WebView via `source={{ html: ... }}`. A WebView renderiza o HTML como se fosse um browser."

#### 4. Demonstração (5 min)
Mostrar o mapa aparecendo com marcador na posição atual. Se possível, andar alguns metros e mostrar o marcador se movendo (ou recarregando).

#### 5. Exercícios
1. **Fácil:** Mostre as coordenadas atuais em texto abaixo do mapa além de no marcador.
2. **Médio:** Guarde um histórico das últimas 5 posições e trace uma linha no mapa com elas (Leaflet Polyline).
3. **Desafio:** Calcule a distância total percorrida usando a fórmula de Haversine entre posições consecutivas.

### Perguntas para fixação
1. O que acontece se você esquecer o `subscription.remove()` no cleanup?
2. Por que usamos `WebView` para o mapa em vez de `react-native-maps`?
3. Qual a diferença entre `timeInterval` e `distanceInterval` no watchPositionAsync?

---

<a name="aula-8"></a>
## Aula 8 — Mapas com OpenStreetMap e WebView

**Arquivos:** `app/mapa01.jsx`, `app/mapa02.jsx`, `app/mapa03.jsx`
**Duração estimada:** 35 minutos
**Pré-requisitos:** Aula 7
**Dependências:** `npx expo install expo-location react-native-webview` (mapa03 só precisa de `react-native-webview`)

### Objetivo
O aluno compreende três variações de uso de mapas WebView: mapa estático, mapa ao vivo, e mapa controlado por coordenadas inseridas manualmente.

### Conceitos ensinados
- Três padrões diferentes de interação com mapas
- Marcadores no Leaflet (`L.marker`)
- URL parametrizada do OpenStreetMap com marcador (`?mlat=&mlon=`)
- `Platform.OS` para código específico de plataforma
- `SafeAreaView` para evitar sobreposição com barra de status

### Roteiro

#### 1. Abertura (5 min)
"Mapas são um dos recursos mais pedidos em apps. Vamos ver três variantes: um mapa simples que mostra uma localização fixa, um mapa que acompanha sua posição, e um mapa onde você digita as coordenadas. Cada um resolve um caso de uso diferente."

#### 2. Teoria (8 min)
"Os três mapas usam o mesmo mecanismo: WebView + OpenStreetMap. O que varia é como as coordenadas chegam:
- `mapa01`: coordenadas vêm do GPS, lidas uma vez
- `mapa02`: coordenadas vêm do GPS em tempo real
- `mapa03`: coordenadas vêm de inputs do usuário

O `mapa03` mostra um URL especial do OpenStreetMap com marcador: `?mlat=LAT&mlon=LON#map=15/LAT/LON`. Esse formato nativo do OSM coloca um pino vermelho na coordenada, sem precisar de JavaScript extra."

#### 3. Código ao vivo (15 min)
Foco no `mapa03` (mais interativo):

```jsx
const [latitude, setLatitude] = useState('');
const [longitude, setLongitude] = useState('');
const [mapCoords, setMapCoords] = useState(null);

function handleGoToLocation() {
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);
  if (!isNaN(lat) && !isNaN(lon)) {
    setMapCoords({ latitude: lat, longitude: lon });
  }
}

// URL com marcador nativo do OSM
const osmUrl = mapCoords
  ? `https://www.openstreetmap.org/?mlat=${mapCoords.latitude}&mlon=${mapCoords.longitude}#map=15/${mapCoords.latitude}/${mapCoords.longitude}`
  : 'https://www.openstreetmap.org';
```

"Mostrem a diferença: `mapCoords` começa `null`, o mapa carrega o OSM padrão. Após digitar e apertar 'Go', `mapCoords` tem valor, e a URL muda — o mapa abre naquele ponto com o marcador."

#### 4. Demonstração (5 min)
Testar com as coordenadas de São Paulo: `-23.5505, -46.6333`. Mostrar o marcador aparecendo.

#### 5. Exercícios
1. **Fácil:** Adicione um botão no `mapa03` que preenche as coordenadas do Polo Norte (`90.0, 0.0`).
2. **Médio:** Combine `mapa01` com `mapa03`: ao abrir, mostra a localização atual, mas também permite o usuário digitar novas coordenadas.
3. **Desafio:** Adicione histórico de buscas — guarde as últimas 3 coordenadas pesquisadas e mostre como botões de atalho.

### Perguntas para fixação
1. Qual a vantagem de usar OpenStreetMap em vez do Google Maps?
2. O que é `Platform.OS` e quando usar?
3. Por que `parseFloat` pode retornar `NaN` e como prevenir erros com ele?

---

<a name="aula-9"></a>
## Aula 9 — Planejador de Rotas

**Arquivo:** `app/route.jsx`
**Duração estimada:** 45 minutos
**Pré-requisitos:** Aulas 6, 7 e 8
**Dependências:** `npx expo install expo-location react-native-webview`

### Objetivo
O aluno integra geocoding (endereço → coordenadas), roteamento (cálculo de caminho) e visualização de mapa para construir um planejador de rotas completo.

### Conceitos ensinados
- Geocoding com API Nominatim (OpenStreetMap)
- Roteamento com OSRM (Open Source Routing Machine)
- GeoJSON para representar geometria de rotas
- `L.geoJSON()` e `fitBounds()` no Leaflet
- Encadeamento de múltiplas chamadas assíncronas
- `User-Agent` obrigatório no Nominatim

### Roteiro

#### 1. Abertura (5 min)
"Vocês já viram GPS, já viram mapa. Hoje vamos juntar tudo e criar algo parecido com o Google Maps: você digita um destino, e o app traça a rota da sua posição atual até lá. São três APIs trabalhando juntas: Nominatim converte o endereço em coordenadas, OSRM calcula a rota, e Leaflet desenha tudo no mapa."

#### 2. Teoria (12 min)
"O fluxo tem 3 etapas:

**Etapa 1 — Geocoding:** converter 'Av. Paulista, São Paulo' em `{ lat: -23.56, lon: -46.65 }`. Usamos Nominatim, a API de geocoding do OpenStreetMap. **Atenção:** o Nominatim exige o header `User-Agent` em toda requisição — sem ele, retorna erro 403.

**Etapa 2 — Roteamento:** dado ponto A (posição atual) e ponto B (destino), calcular o caminho de carro. Usamos OSRM, serviço gratuito e open source. Retorna um objeto GeoJSON com a geometria da rota.

**Etapa 3 — Visualização:** injetamos o GeoJSON no Leaflet via `L.geoJSON()`. O método `fitBounds()` ajusta o zoom automaticamente para mostrar a rota inteira na tela.

Se qualquer etapa falhar, capturamos o erro e mostramos para o usuário. Nunca deixar o app travar silenciosamente."

#### 3. Código ao vivo (20 min)
Mostrar a função `createRoute` em partes:

```jsx
// Etapa 1: geocoding
const geoRes = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destAddress)}`,
  { headers: { 'User-Agent': 'DDMI-App' } }
);
const geoData = await geoRes.json();
if (!geoData.length) throw new Error('Endereço não encontrado');
const { lat: destLat, lon: destLon } = geoData[0];

// Etapa 2: roteamento
const routeRes = await fetch(
  `https://router.project-osrm.org/route/v1/driving/${startLoc.longitude},${startLoc.latitude};${destLon},${destLat}?overview=full&geometries=geojson`
);
const routeData = await routeRes.json();
if (routeData.code !== 'Ok') throw new Error('Rota não encontrada');
const geometry = JSON.stringify(routeData.routes[0].geometry);

// Etapa 3: gerar HTML com mapa e rota
// (mostrar o template Leaflet com L.geoJSON e fitBounds)
```

#### 4. Demonstração (5 min)
Digitar "Aeroporto de Congonhas, São Paulo" e mostrar a rota ser desenhada a partir da localização atual.

#### 5. Exercícios
1. **Fácil:** Mostre a distância da rota em km (está em `routeData.routes[0].distance` em metros).
2. **Médio:** Mostre o tempo estimado de viagem (está em `routeData.routes[0].duration` em segundos).
3. **Desafio:** Adicione suporte a modo de transporte: bicicleta (`/cycling/`) e pedestres (`/foot/`) além de carro.

### Perguntas para fixação
1. Por que o Nominatim exige o header `User-Agent`?
2. O que é GeoJSON? Que tipo de dado ele representa?
3. Por que `encodeURIComponent()` é necessário no endereço de destino?

---

<a name="aula-10"></a>
## Aula 10 — Acelerômetro

**Arquivo:** `app/sensor_accell.jsx`
**Duração estimada:** 30 minutos
**Pré-requisitos:** Aula 1, `useState` e `useEffect`
**Dependências:** `npx expo install expo-sensors`

### Objetivo
O aluno acessa o acelerômetro do dispositivo em tempo real e compreende os três eixos de medição e como controlar a subscription do sensor.

### Conceitos ensinados
- `expo-sensors`: API comum a todos os sensores
- `Accelerometer.setUpdateInterval(ms)` — frequência de atualização
- `Accelerometer.addListener(callback)` — subscription de dados
- Os três eixos: X (esquerda/direita), Y (frente/trás), Z (cima/baixo)
- `subscription.remove()` para parar o sensor (economia de bateria)

### Roteiro

#### 1. Abertura (5 min)
"O celular tem sensores físicos que medem o mundo real. O acelerômetro mede forças de aceleração nos três eixos do espaço. Quando você inclina o celular, sacode, ou cai no chão, o acelerômetro detecta. É com ele que o app sabe se você virou o celular de paisagem para retrato, ou que um jogo detecta inclinação para guiar um carro."

#### 2. Teoria (8 min)
"O acelerômetro retorna `{ x, y, z }` em unidades de `g` (gravidade terrestre ≈ 9.8 m/s²). Com o celular parado na mesa:
- `x ≈ 0`: sem aceleração lateral
- `y ≈ 0`: sem aceleração frontal
- `z ≈ 1`: gravidade puxando para baixo

Se você inclinar o celular lateralmente, `x` muda. Se sacudir para frente e trás, `y` muda. Se jogar para cima, `z` diminui momentaneamente.

A API de todos os sensores do `expo-sensors` tem a mesma forma: `setUpdateInterval()` + `addListener()` + `remove()`. Aprendeu um, aprendeu todos."

#### 3. Código ao vivo (12 min)
```jsx
useEffect(() => {
  Accelerometer.setUpdateInterval(100); // 10 Hz — 10 leituras por segundo
  const sub = Accelerometer.addListener(dados => {
    setInfo(dados); // { x, y, z }
  });
  return () => sub.remove(); // cleanup: para o sensor ao sair da tela
}, []);
```

"Explique o `setUpdateInterval`: 100ms = 10 Hz. Para jogos use 16ms (60 Hz). Para monitoramento casual, 500ms já basta. Quanto menor o intervalo, mais processamento."

#### 4. Demonstração (5 min)
Colocar o celular na mesa (valores próximos a 0, 0, 1). Inclinar nos eixos e mostrar os valores mudando. Sacudir para demonstrar picos.

#### 5. Exercícios
1. **Fácil:** Mude o intervalo para 500ms e observe que os valores atualizam mais devagar.
2. **Médio:** Calcule e exiba a magnitude total da aceleração: `Math.sqrt(x² + y² + z²)`.
3. **Desafio:** Detecte um "shake" — se a magnitude ultrapassar 2g por 3 leituras consecutivas, mostre um alerta "Sacudida detectada!".

### Perguntas para fixação
1. Por que `z` ≈ 1 quando o celular está parado horizontalmente?
2. Qual o impacto de usar `setUpdateInterval(16)` (60 Hz) na bateria?
3. O que acontece se você chamar `addListener` várias vezes sem chamar `remove()`?

---

<a name="aula-11"></a>
## Aula 11 — Giroscópio com Gráficos em Tempo Real

**Arquivos:** `app/sensor_gyroscope.jsx`, `app/sensor_motion.jsx`
**Duração estimada:** 40 minutos
**Pré-requisitos:** Aula 10
**Dependências:** `npx expo install expo-sensors victory-native react-native-svg`

### Objetivo
O aluno lê dados do giroscópio e visualiza os valores históricos em gráficos de linha em tempo real usando Victory Native.

### Conceitos ensinados
- Giroscópio: medição de velocidade angular (rad/s)
- Buffer circular: manter os últimos N pontos com `.shift()`
- `VictoryChart` e `VictoryLine` para gráficos
- Diferença entre `sensor_gyroscope.jsx` e `sensor_motion.jsx` (mesma lógica, demonstra que o padrão se repete)
- Atualização de state com função de callback para evitar estado obsoleto

### Roteiro

#### 1. Abertura (5 min)
"O giroscópio mede velocidade angular — quão rápido o celular está rotacionando em cada eixo. Valores em radianos por segundo. Quando o app de realidade aumentada sabe que você virou a cabeça 30 graus, é o giroscópio falando. Hoje além de mostrar os números, vamos visualizá-los em gráficos em tempo real — mais bonito e didático."

#### 2. Teoria (10 min)
"O desafio de gráficos em tempo real é o buffer: você não quer guardar infinitos pontos, apenas os últimos 50. O padrão é:
```js
setBufferX(anterior => {
  const novo = [...anterior, valorNovo];
  if (novo.length > MAX_POINTS) novo.shift(); // remove o mais antigo
  return novo;
});
```

O `novo.shift()` remove o primeiro elemento (o mais antigo). Assim o array sempre tem no máximo `MAX_POINTS` elementos — é um buffer circular.

Importante: usamos a forma de `setState` com callback (`anterior => ...`) em vez de `setBufferX([...bufferX, valor])`. Por quê? Porque o listener do sensor dispara fora do ciclo de render normal. Se usarmos `bufferX` diretamente, pode estar desatualizado (estado obsoleto / stale state). A forma com callback garante que sempre trabalha com o valor mais recente."

#### 3. Código ao vivo (18 min)
```jsx
const MAX_POINTS = 50;
const [bufferX, setBufferX] = useState([]);

useEffect(() => {
  Gyroscope.setUpdateInterval(50); // 20 Hz
  const sub = Gyroscope.addListener(dados => {
    setBufferX(ant => {
      const novo = [...ant, dados.x];
      if (novo.length > MAX_POINTS) novo.shift();
      return novo;
    });
    // repetir para bufferY, bufferZ
  });
  return () => sub.remove();
}, []);
```

"Agora o gráfico com Victory Native:
```jsx
<VictoryChart height={150} domain={{ y: [-5, 5] }}>
  <VictoryLine
    data={bufferX.map((y, i) => ({ x: i, y }))}
    style={{ data: { stroke: 'red' } }}
    interpolation='basisOpen' // suaviza a linha
  />
</VictoryChart>
```"

#### 4. Demonstração (5 min)
Mostrar os três gráficos em tempo real. Rotacionar o celular devagar e mostrar como a curva reage.

#### 5. Exercícios
1. **Fácil:** Mude a cor dos gráficos dos eixos Y e Z.
2. **Médio:** Adicione linhas de referência horizontal em y=0 usando `VictoryAxis`.
3. **Desafio:** Calcule a velocidade angular total (magnitude dos três eixos) e mostre um quarto gráfico.

### Perguntas para fixação
1. Por que usamos a forma `setState(ant => ...)` em vez de `setState([...array, valor])`?
2. O que é o `shift()` e por que não usamos `slice(-MAX_POINTS)` em vez dele?
3. Qual a diferença entre `interpolation='linear'` e `interpolation='basisOpen'` no gráfico?

---

<a name="aula-12"></a>
## Aula 12 — Magnetômetro

**Arquivo:** `app/sensor_magnetometer.jsx`
**Duração estimada:** 25 minutos
**Pré-requisitos:** Aulas 10 e 11
**Dependências:** `npx expo install expo-sensors victory-native react-native-svg`

### Objetivo
O aluno acessa o magnetômetro e compreende o que ele mede, suas limitações práticas, e como visualizar os dados.

### Conceitos ensinados
- Magnetômetro: medição de campo magnético em microTesla (µT)
- Aplicação: bússola digital
- Interferência magnética: metais e aparelhos elétricos
- Reutilização do padrão de buffer circular da aula anterior

### Roteiro

#### 1. Abertura (4 min)
"O magnetômetro mede o campo magnético ao redor do celular em três eixos. A aplicação mais conhecida é a bússola — com os três valores você consegue calcular a direção do norte magnético. Mas ele é sensível: coloque o celular perto de um alto-falante ou de objetos metálicos e os valores vão variar muito."

#### 2. Teoria (6 min)
"Os valores são em microTesla (µT). O campo magnético terrestre varia entre 25 µT e 65 µT dependendo da localização. Qualquer metal ou corrente elétrica próxima distorce essa leitura — por isso apps de bússola pedem para você girar o celular em '8' para calibrar.

Para calcular o ângulo norte (heading) a partir dos valores X e Y:
```js
const heading = Math.atan2(dados.y, dados.x) * (180 / Math.PI);
```
Não vamos implementar isso hoje, mas é um exercício interessante."

#### 3. Código ao vivo (10 min)
A estrutura é idêntica ao giroscópio — só muda `Gyroscope` por `Magnetometer` e o `domain` do gráfico de `[-5, 5]` para `[-100, 100]`. Use isso para reforçar que o padrão aprendido na aula 11 se aplica diretamente.

#### 4. Demonstração (3 min)
Mostrar os valores em repouso. Depois aproximar um ímã (ou outro celular) e mostrar os valores variando drasticamente.

#### 5. Exercícios
1. **Fácil:** Calcule e exiba o heading (direção norte) com a fórmula `Math.atan2(y, x) * (180 / Math.PI)`.
2. **Desafio:** Construa uma bússola visual simples usando `transform: [{ rotate: \`${heading}deg\` }]` em uma seta.

### Perguntas para fixação
1. Por que apps de bússola pedem calibração?
2. Qual sensor você usaria para detectar se o celular está próximo a um metal?

---

<a name="aula-13"></a>
## Aula 13 — Notificações Locais e Som Customizado

**Arquivos:** `app/notificacoes.jsx`, `app/notificacoes2.jsx`, `app/notificacoes3.jsx`
**Duração estimada:** 40 minutos
**Pré-requisitos:** Aula 1
**Dependências:** `npx expo install expo-notifications expo-device`

### Objetivo
O aluno implementa notificações locais com permissão, configura handler de primeiro plano, agenda notificações com delay e usa som customizado.

### Conceitos ensinados
- Diferença entre notificação local e push notification
- `Notifications.setNotificationHandler()` — comportamento em primeiro plano
- `Notifications.requestPermissionsAsync()` — permissão (obrigatória no iOS, opcional no Android 13+)
- `Notifications.scheduleNotificationAsync()` — disparar notificação
- `trigger: { seconds: N }` — agendamento
- `sound: 'nome_do_arquivo.mp3'` — som customizado
- Listeners: `addNotificationReceivedListener` e `addNotificationResponseReceivedListener`

### Roteiro

#### 1. Abertura (5 min)
"Notificações são uma das ferramentas mais poderosas de engajamento de apps. Existem dois tipos: **locais** (geradas pelo próprio app, sem servidor) e **push** (enviadas por servidor remoto). Hoje focamos nas locais — mais simples e que funcionam no Expo Go. Push notifications no Expo Go foram removidas no SDK 53 e precisam de development build."

#### 2. Teoria (10 min)
"O fluxo mínimo de notificação local:
1. Configurar o handler (o que acontece quando chega enquanto o app está aberto)
2. Pedir permissão
3. Agendar a notificação

O handler `setNotificationHandler` define `shouldShowAlert`, `shouldPlaySound` e `shouldSetBadge`. Por padrão, quando o app está em primeiro plano, notificações não aparecem — você precisa ativar com `shouldShowAlert: true`.

Os listeners permitem reagir:
- `addNotificationReceivedListener`: disparado quando a notificação chega (app em primeiro plano)
- `addNotificationResponseReceivedListener`: disparado quando o usuário toca na notificação

Sons customizados: coloque o arquivo `.mp3` em `assets/sounds/` e referencie só pelo nome `'oloco.mp3'` no campo `sound`. O Expo copia para o lugar certo na build."

#### 3. Código ao vivo (18 min)
Mostre as três telas em progressão:

`notificacoes.jsx` — básico:
```jsx
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Solicitar permissão
const { status } = await Notifications.getPermissionsAsync();
if (status !== 'granted') await Notifications.requestPermissionsAsync();

// Agendar
await Notifications.scheduleNotificationAsync({
  content: { title: 'Olá!', body: 'Esta é uma notificação.' },
  trigger: { seconds: 2 },
});
```

`notificacoes3.jsx` — com som:
```jsx
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'O loco meu!',
    body: 'Com som customizado!',
    sound: 'oloco.mp3', // arquivo em assets/sounds/
  },
  trigger: { seconds: 0 }, // imediato
});
```

#### 4. Demonstração (5 min)
Disparar cada tipo de notificação. Mostrar que ao minimizar o app e disparar novamente, a notificação aparece na barra do sistema.

#### 5. Exercícios
1. **Fácil:** Agende uma notificação para 10 segundos no futuro.
2. **Médio:** Implemente um campo de texto onde o usuário digita o título da notificação antes de disparar.
3. **Desafio:** Use `trigger: { repeats: true, seconds: 30 }` para criar uma notificação recorrente, e adicione um botão para cancelar todas com `Notifications.cancelAllScheduledNotificationsAsync()`.

### Perguntas para fixação
1. Qual a diferença entre `addNotificationReceivedListener` e `addNotificationResponseReceivedListener`?
2. Por que precisa remover os listeners no cleanup do useEffect?
3. Por que push notifications não funcionam mais no Expo Go a partir do SDK 53?

---

<a name="aula-14"></a>
## Aula 14 — Banco de Dados Local com SQLite

**Arquivo:** `app/sqlite_demo.jsx`
**Duração estimada:** 45 minutos
**Pré-requisitos:** Aula 1, noção básica de SQL
**Dependências:** `npx expo install expo-sqlite` (incluído no Expo SDK 53+)

### Objetivo
O aluno implementa um CRUD completo em banco de dados SQLite local: criar tabela, inserir, consultar, atualizar e deletar registros.

### Conceitos ensinados
- `expo-sqlite`: banco relacional embutido no app
- `openDatabaseSync()` — abrir/criar banco de dados
- `execSync()` para DDL (CREATE TABLE)
- `runAsync()` para DML (INSERT, UPDATE, DELETE)
- `getAllAsync()` para SELECT — retorna array de objetos
- Parâmetros posicionais `?` para prevenir SQL Injection
- Estado `editingId` para alternar entre modo criar e editar
- Diferença entre SQLite e AsyncStorage

### Roteiro

#### 1. Abertura (5 min)
"AsyncStorage (que vemos na próxima aula) é ótimo para salvar uma string ou um objeto simples. Mas e quando você tem centenas ou milhares de registros que precisam ser filtrados, ordenados, relacionados? Para isso existe o SQLite — um banco de dados completo que roda dentro do próprio app, sem servidor. É o mesmo SQL que você conhece, só que local."

#### 2. Teoria (12 min)
"SQLite é o banco de dados mais usado no mundo — está em praticamente todo celular, browser e sistema embarcado. No Expo, o `expo-sqlite` v14+ usa uma API síncrona para DDL e assíncrona para DML:

```
openDatabaseSync('nome.db')  → abre/cria o arquivo .db no storage do app
execSync('CREATE TABLE ...')  → execução síncrona de DDL
runAsync('INSERT ...')        → execução assíncrona, retorna Promise
getAllAsync('SELECT ...')      → retorna Promise<Array<Objeto>>
```

**Parâmetros posicionais:** nunca concatene strings SQL com variáveis do usuário. Use `?` e passe os valores como array:
```js
db.runAsync('INSERT INTO pessoas (nome) VALUES (?)', [nome]);
```
Isso previne SQL Injection — se o usuário digitar `'; DROP TABLE pessoas;--`, o driver trata como string literal, não como código SQL."

#### 3. Código ao vivo (20 min)
```jsx
const db = SQLite.openDatabaseSync('demo.db');
const [editingId, setEditingId] = useState(null); // null = criar; número = editar

// CREATE — INSERT
async function addItem() {
  await db.runAsync('INSERT INTO people (name) VALUES (?);', [name]);
  clearForm();  fetchItems();
}

// READ — SELECT
async function fetchItems() {
  const rows = await db.getAllAsync('SELECT * FROM people;');
  setItems(rows);
}

// UPDATE — UPDATE SET
async function updateItem() {
  await db.runAsync('UPDATE people SET name = ? WHERE id = ?;', [name, editingId]);
  clearForm();  fetchItems();
}

// DELETE — DELETE WHERE
function deleteItem(id) {
  Alert.alert('Excluir', 'Confirmar?', [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive',
      onPress: async () => { await db.runAsync('DELETE FROM people WHERE id = ?;', [id]); fetchItems(); } },
  ]);
}
```

Mostre que `editingId` controla o texto do botão: "Adicionar" vs "Atualizar". Ao clicar em "Editar" num item, o `TextInput` já aparece preenchido.

#### 4. Demonstração (5 min)
Adicionar 3 itens, editar um, deletar outro, fechar e reabrir — itens persistem. Demonstra persistência e CRUD completo.

#### 5. Exercícios
1. **Fácil:** Observe que o botão muda de "Adicionar" para "Atualizar" ao entrar no modo edição.
2. **Médio:** Adicione confirmação via `Alert` antes de deletar (já incluído no código — estude o padrão).
3. **Desafio:** Adicione uma segunda coluna `email TEXT` e atualize o formulário para incluir esse campo.

### Perguntas para fixação
1. O que é `IF NOT EXISTS` no `CREATE TABLE` e por que é importante?
2. Por que `execSync` é síncrono mas `runAsync` é assíncrono?
3. Como o banco SQLite persiste os dados? Onde o arquivo `.db` fica armazenado?

---

<a name="aula-15"></a>
## Aula 15 — AsyncStorage: Chave-Valor Persistente

**Arquivo:** `app/async_storage.jsx`
**Duração estimada:** 35 minutos
**Pré-requisitos:** Aula 14 (para comparar com SQLite)
**Dependências:** `npx expo install @react-native-async-storage/async-storage`

### Objetivo
O aluno implementa um CRUD completo com AsyncStorage usando o padrão de array JSON serializado: adiciona, lê, edita e remove itens persistentes sem SQL.

### Conceitos ensinados
- `AsyncStorage.setItem(chave, valor)` — gravar string (C e U)
- `AsyncStorage.getItem(chave)` — ler (retorna `null` se não existir) (R)
- `AsyncStorage.removeItem(chave)` — apagar a chave inteira (D total)
- `JSON.stringify` / `JSON.parse` para armazenar arrays de objetos
- Padrão: uma chave guarda o array inteiro; Update = map; Delete = filter
- Estado `editandoId` para alternar modo criar/editar (igual ao SQLite)
- Convenção de nomenclatura de chaves com `@prefixo:`
- Quando usar AsyncStorage vs SQLite

### Roteiro

#### 1. Abertura (5 min)
"AsyncStorage é o 'caderno de anotações rápidas' do app. Não é um banco relacional — não tem tabelas nem SQL. É simplesmente um dicionário persistente: você dá uma chave e um valor, e ele guarda. Perfeito para token de autenticação, preferências do usuário, último estado da tela."

#### 2. Teoria (10 min)
"A API é simples, mas tem um detalhe importante: **os valores são sempre strings**. Para guardar um número, você converte: `String(42)`. Para guardar um objeto, usa `JSON.stringify({ nome: 'João' })`. Para ler de volta, `JSON.parse(valor)`.

Convenção de chaves: use `@nomeapp:categoria` para evitar colisão com outras bibliotecas que também usam AsyncStorage. Ex: `@ddmi:token_usuario`, `@ddmi:tema`.

**AsyncStorage vs SQLite:**
- AsyncStorage: poucos itens simples, sem relações, sem queries. Token, configurações, cachê simples.
- SQLite: muitos registros, com filtros, ordenação, relações entre tabelas. Produtos, mensagens, histórico.

A operação é sempre assíncrona — use `await`."

#### 3. Código ao vivo (15 min)
```jsx
const CHAVE_NOTAS = '@meuapp:notas';

// READ — carrega array JSON ao montar
async function carregarNotas() {
  const json = await AsyncStorage.getItem(CHAVE_NOTAS);
  setNotas(json ? JSON.parse(json) : []);
}

// Helper: persiste o array e atualiza o estado
async function persistir(lista) {
  await AsyncStorage.setItem(CHAVE_NOTAS, JSON.stringify(lista));
  setNotas(lista);
}

// CREATE — acrescenta item ao array
async function adicionarNota() {
  await persistir([...notas, { id: Date.now(), texto }]);
}

// UPDATE — substitui o texto do item editado
async function atualizarNota() {
  await persistir(notas.map(n => n.id === editandoId ? { ...n, texto } : n));
}

// DELETE — remove item pelo id
async function excluirNota(id) {
  await persistir(notas.filter(n => n.id !== id));
}

// DELETE ALL — apaga a chave inteira
async function excluirTudo() {
  await AsyncStorage.removeItem(CHAVE_NOTAS);
  setNotas([]);
}
```

"O Update usa `Array.map` e o Delete usa `Array.filter` — as mesmas primitivas do Aula 16. O `JSON.stringify` serializa o array inteiro; o `JSON.parse` restaura. Mostre que `editandoId` controla o botão, igual ao SQLite."

#### 4. Demonstração (3 min)
Criar 3 notas, editar uma, deletar outra, fechar o app, reabrir — lista persiste. Limpar tudo e confirmar que sumiu.

#### 5. Exercícios
1. **Fácil:** Observe que editar uma nota usa o mesmo padrão `editandoId` do SQLite — o botão muda de "Adicionar" para "Salvar edição".
2. **Médio:** Adicione um campo `prioridade` (alta/média/baixa) à nota e exiba na lista com cor diferente.
3. **Desafio:** Implemente um histórico de buscas de CEP: cada CEP consultado é salvo como nota no AsyncStorage. Ao abrir a tela de CEP, carregue e exiba os últimos 5 buscados.

### Perguntas para fixação
1. O que `getItem` retorna se a chave não existir?
2. Por que usar `JSON.stringify` para salvar objetos?
3. Quando você escolheria AsyncStorage em vez de SQLite para armazenar dados de usuário?

---

<a name="aula-16"></a>
## Aula 16 — FlatList com Dados Reais

**Arquivo:** `app/lista_tarefas.jsx`
**Duração estimada:** 35 minutos
**Pré-requisitos:** Aula 1, `useState`
**Dependências:** nenhuma nova — usa apenas React Native built-ins

### Objetivo
O aluno renderiza uma lista de dados com `FlatList`, implementa toggle de estado por item e compreende por que `FlatList` é superior a `.map()` para listas longas.

### Conceitos ensinados
- `FlatList` — virtualização de lista (renderiza só o visível)
- `keyExtractor` — identificador único por item (obrigatório)
- `renderItem` — função de renderização por item
- `ItemSeparatorComponent` — separador visual entre itens
- `ListEmptyComponent` — componente exibido quando lista vazia
- Imutabilidade: `array.map()` para criar novo array sem modificar o original
- `TouchableOpacity` com `activeOpacity` para feedback visual

### Roteiro

#### 1. Abertura (5 min)
"Listas são onipresentes em apps: feed do Instagram, lista de contatos, histórico de pedidos. Quando a lista tem dezenas de itens, usar `.map()` com `ScrollView` renderiza todos de uma vez — pode travar em listas longas. `FlatList` resolve isso com virtualização: só renderiza os itens que aparecem na tela. Os outros são descartados da memória e recriados quando necessário."

#### 2. Teoria (10 min)
"Comparação direta:

```jsx
// ❌ .map() — renderiza TUDO de uma vez
<ScrollView>
  {dados.map(item => <Text key={item.id}>{item.nome}</Text>)}
</ScrollView>

// ✅ FlatList — renderiza só o visível
<FlatList
  data={dados}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item }) => <Text>{item.nome}</Text>}
/>
```

O `keyExtractor` é obrigatório. Ele permite ao React identificar cada item sem re-renderizar toda a lista quando um item muda. Sem ele, qualquer mudança re-renderiza tudo.

Para alterar um item sem modificar o array original, usamos `array.map()` com um ternário:
```js
tarefas.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
```
'Se for o id que procuro, cria uma cópia com o campo invertido. Se não for, devolve igual.'"

#### 3. Código ao vivo (15 min)
```jsx
import { listaDeAfazeres } from '../dados/afazeres';

const [tarefas, setTarefas] = useState(listaDeAfazeres);

function alternarConcluido(id) {
  setTarefas(ant =>
    ant.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
  );
}

function renderItem({ item }) {
  return (
    <TouchableOpacity onPress={() => alternarConcluido(item.id)} activeOpacity={0.7}>
      <Text style={item.completed && { textDecorationLine: 'line-through' }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

<FlatList
  data={tarefas}
  keyExtractor={item => item.id.toString()}
  renderItem={renderItem}
  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
  ListEmptyComponent={<Text>Nenhuma tarefa.</Text>}
/>
```

#### 4. Demonstração (3 min)
Tocar em itens para marcar/desmarcar. Mostrar o texto riscado ao concluir.

#### 5. Exercícios
1. **Fácil:** Adicione um contador "X de Y concluídas" acima da lista.
2. **Médio:** Adicione um botão "Nova Tarefa" que abre um `Alert.prompt` para digitar e adiciona ao array.
3. **Desafio:** Implemente filtros: botões "Todas", "Pendentes", "Concluídas" que filtram a lista exibida (sem alterar o estado original).

### Perguntas para fixação
1. Por que `keyExtractor` é necessário? O que acontece sem ele?
2. Qual a diferença entre `FlatList` e `SectionList`?
3. Por que não modificamos o array diretamente com `tarefas[0].completed = true`?

---

<a name="aula-17"></a>
## Aula 17 — Player de Áudio

**Arquivo:** `app/audio.jsx`
**Duração estimada:** 40 minutos
**Pré-requisitos:** Aula 1, `useRef`
**Dependências:** `npx expo install expo-av`

### Objetivo
O aluno carrega e reproduz um arquivo de áudio local com controles play/pause/stop e barra de progresso.

### Conceitos ensinados
- `expo-av`: carregamento e controle de áudio
- `Audio.Sound.createAsync()` — carrega o arquivo
- `sound.playAsync()`, `pauseAsync()`, `stopAsync()` — controles
- `sound.setOnPlaybackStatusUpdate()` — callback de progresso
- `useRef` para guardar referência ao objeto Sound sem causar re-render
- `sound.unloadAsync()` — liberar memória no cleanup
- Cálculo de porcentagem para barra de progresso

### Roteiro

#### 1. Abertura (5 min)
"Reproductores de música, podcasts, mensagens de voz, efeitos sonoros em jogos — todo app de mídia precisa de reprodução de áudio. O `expo-av` cobre isso com uma API clara. Hoje vamos construir um player completo com play/pause/stop e uma barra de progresso que avança em tempo real."

#### 2. Teoria (12 min)
"`Audio.Sound.createAsync()` carrega o arquivo e retorna um objeto `sound`. Esse objeto tem todos os métodos de controle.

**Por que `useRef` em vez de `useState`?**
O objeto `sound` não é um valor que afeta a UI diretamente. Ele é uma referência ao player de áudio. Se usássemos `useState`, cada vez que o status do áudio atualizasse, o componente re-renderizaria desnecessariamente. Com `useRef`, guardamos a referência sem triggar re-renders.

```
useRef  → guarda referência, não causa re-render
useState → guarda valor de UI, causa re-render
```

`setOnPlaybackStatusUpdate` é chamado ~4 vezes por segundo com o status atual. O campo `didJustFinish` é `true` exatamente no momento em que o áudio termina — use isso para resetar a posição ao início.

**Cleanup obrigatório:** `sound.unloadAsync()` libera a memória do decoder de áudio. Sem isso, o arquivo continua decodificando em background mesmo após sair da tela — consome CPU e RAM."

#### 3. Código ao vivo (18 min)
```jsx
const soundRef = useRef(null);

useEffect(() => {
  async function carregarAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/oloco.mp3'),
      { shouldPlay: false }
    );
    soundRef.current = sound;

    sound.setOnPlaybackStatusUpdate(status => {
      if (!status.isLoaded) return;
      setTocando(status.isPlaying);
      setPosicaoMs(status.positionMillis ?? 0);
      setDuracaoMs(status.durationMillis ?? 0);
      if (status.didJustFinish) {
        sound.setPositionAsync(0);
        setTocando(false);
      }
    });
    setCarregando(false);
  }
  carregarAudio();
  return () => { soundRef.current?.unloadAsync(); }; // cleanup
}, []);
```

Barra de progresso:
```jsx
const progresso = duracaoMs > 0 ? posicaoMs / duracaoMs : 0;
<View style={{ width: `${progresso * 100}%`, height: 4, backgroundColor: 'blue' }} />
```

#### 4. Demonstração (5 min)
Tocar o áudio, pausar no meio, retomar, parar e mostrar que volta ao início.

#### 5. Exercícios
1. **Fácil:** Mostre o tempo restante em vez da posição atual.
2. **Médio:** Implemente um botão de reiniciar (volta ao início sem pausar).
3. **Desafio:** Implemente um slider de progresso interativo usando `PanResponder` ou `Slider` do `@react-native-community/slider` que permite pular para qualquer ponto com `sound.setPositionAsync(ms)`.

### Perguntas para fixação
1. Por que usamos `useRef` para guardar o objeto `sound` em vez de `useState`?
2. O que acontece se você esquecer de chamar `unloadAsync` ao sair da tela?
3. Quantas vezes por segundo o `setOnPlaybackStatusUpdate` é chamado?

---

<a name="aula-18"></a>
## Aula 18 — Câmera e Galeria de Fotos

**Arquivo:** `app/camera.jsx`
**Duração estimada:** 35 minutos
**Pré-requisitos:** Aula 1
**Dependências:** `npx expo install expo-image-picker`

### Objetivo
O aluno solicita permissão de câmera/galeria, captura ou seleciona uma imagem, e exibe a imagem selecionada na tela com seus metadados.

### Conceitos ensinados
- `expo-image-picker`: abstração sobre câmera e galeria nativas
- `requestCameraPermissionsAsync` e `requestMediaLibraryPermissionsAsync`
- `launchCameraAsync()` — abrir câmera
- `launchImageLibraryAsync()` — abrir galeria
- `resultado.canceled` e `resultado.assets[0]`
- Componente `Image` com `resizeMode` e `source={{ uri }}`
- `MediaTypeOptions.Images/Videos/All`
- Configuração de `app.json` para permissões em produção

### Roteiro

#### 1. Abertura (5 min)
"Câmera é um dos recursos mais pedidos em apps: tirar foto de perfil, escanear documento, mandar foto no chat. O `expo-image-picker` cuida de toda a complexidade do acesso nativo à câmera e galeria. Você chama uma função, o sistema abre a câmera, o usuário tira a foto, você recebe a URI."

#### 2. Teoria (10 min)
"Permissões separadas: câmera e galeria são permissões diferentes no Android e iOS. Você precisa pedir cada uma separadamente.

O resultado de `launchCameraAsync` e `launchImageLibraryAsync` tem a mesma estrutura:
```js
{
  canceled: false,          // true se usuário fechou sem escolher
  assets: [
    {
      uri: 'file:///...',   // caminho local da imagem
      width: 3000,
      height: 4000,
      type: 'image',
    }
  ]
}
```

`resultado.assets` é sempre um array, mesmo com seleção única. Por isso acessamos `resultado.assets[0]`.

Grafia americana: `canceled` (com um 'd' — não 'cancelled').

Para produção (build real), você deve declarar as permissões em `app.json`. No Expo Go, funciona sem."

#### 3. Código ao vivo (15 min)
```jsx
async function abrirCamera() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão negada', 'Precisamos da câmera.');
    return;
  }
  const resultado = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
  });
  if (!resultado.canceled) {
    setImagemSelecionada(resultado.assets[0]);
  }
}
```

Exibição:
```jsx
<Image source={{ uri: imagemSelecionada.uri }} style={{ width: '100%', height: 260 }} resizeMode='cover' />
```

#### 4. Demonstração (3 min)
Mostrar ambos os fluxos: câmera (tirar nova foto) e galeria (escolher existente). Exibir dimensões da imagem selecionada.

#### 5. Exercícios
1. **Fácil:** Exiba o tipo da imagem (`imagemSelecionada.type`) e o tamanho em KB se disponível.
2. **Médio:** Adicione `allowsMultipleSelection: true` na galeria e exiba todas as imagens em uma `FlatList` horizontal.
3. **Desafio:** Faça upload da imagem para `https://api.imgur.com/3/image` (API gratuita) e mostre a URL retornada.

### Perguntas para fixação
1. Por que `resultado.assets` é um array mesmo quando selecionamos apenas uma imagem?
2. O que é `resizeMode: 'cover'` vs `'contain'`? Quando usar cada um?
3. Por que precisamos declarar permissões em `app.json` para builds de produção?

---

<a name="aula-19"></a>
## Aula 19 — Feedback Háptico

**Arquivo:** `app/haptics.jsx`
**Duração estimada:** 20 minutos
**Pré-requisitos:** Aula 1
**Dependências:** `npx expo install expo-haptics`

### Objetivo
O aluno implementa os três tipos de feedback háptico do `expo-haptics` e entende quando usar cada um para melhorar a experiência do usuário.

### Conceitos ensinados
- `Haptics.impactAsync(style)` — simular colisão física
- `Haptics.notificationAsync(type)` — feedback de resultado de operação
- `Haptics.selectionAsync()` — feedback de seleção de item
- Háptico como linguagem: cada padrão comunica algo diferente
- Funciona apenas em dispositivos físicos

### Roteiro

#### 1. Abertura (4 min)
"Você já reparou que quando você recebe uma mensagem no iPhone, é diferente de quando você desliza para deletar, que é diferente de quando dá erro? Cada vibração tem um padrão. Isso é design háptico — usar vibração como uma linguagem para comunicar ao usuário o que está acontecendo, sem precisar olhar para a tela."

#### 2. Teoria (6 min)
"Os três tipos:

**Impact** — simula um objeto batendo em outro. Três intensidades: Light (selecionou um item), Medium (confirmou uma ação), Heavy (ação importante ou destrutiva).

**Notification** — feedback de resultado: Success (dois pulsos curtos: 'deu certo'), Error (três pulsos: 'deu errado'), Warning (um pulso prolongado: 'atenção').

**Selection** — vibração discreta para quando o usuário navega entre opções num picker, slider ou tab bar. Deve ser sutil e rápido.

**Importante:** `expo-haptics` não retorna Promise e não tem erro — é fire-and-forget. Chame sem `await`. Em emuladores e no simulador iOS, não há feedback — teste em dispositivo físico."

#### 3. Código ao vivo (8 min)
```jsx
import * as Haptics from 'expo-haptics';

// Impact
<Button onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)} title='Leve' />
<Button onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)} title='Forte' />

// Notification
<Button onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)} title='Sucesso' />
<Button onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)} title='Erro' />

// Selection
<Button onPress={() => Haptics.selectionAsync()} title='Seleção' />
```

"A API toda é só isso — simples de usar, impacto grande na experiência."

#### 4. Demonstração (2 min)
Testar no celular físico, tocando em cada botão e descrevendo o que se sente.

#### 5. Exercícios
1. **Aplicação:** Adicione `Haptics.notificationAsync(Success)` ao botão "Salvar" do AsyncStorage quando salvar com sucesso.
2. **Aplicação:** Adicione `Haptics.impactAsync(Heavy)` ao botão "Apagar" do SQLite antes de deletar.

### Perguntas para fixação
1. Quando você usaria `Selection` em vez de `Impact Light`?
2. Por que não precisamos de `await` ao chamar funções do `expo-haptics`?

---

<a name="aula-20"></a>
## Aula 20 — Context API: Tema e Idioma

**Arquivo:** `app/settings.jsx`, `contexts/AppContext.js`, `contexts/ThemeContext.js`
**Duração estimada:** 50 minutos
**Pré-requisitos:** Aulas 1 a 3, React hooks
**Dependências:** `npx expo install i18next react-i18next expo-localization`

### Objetivo
O aluno compreende o Context API do React, implementa providers de estado global para idioma e tema, e consome esses contextos em qualquer componente do app.

### Conceitos ensinados
- Problema do prop drilling — motivação para Context API
- `createContext()`, `useContext()`, `Provider`
- Context para tema: como cores mudam em toda a UI ao mesmo tempo
- Context para idioma: integração com i18next
- Modo automático: `useColorScheme()` do React Native
- `useMemo` para evitar re-renders desnecessários de providers

### Roteiro

#### 1. Abertura (8 min)
"Imagine que você quer que todo componente do app saiba qual tema está ativo (claro ou escuro). Você poderia passar o tema como `prop` de pai para filho — mas com componentes aninhados em 5 ou 6 níveis, fica impossível de manter. Isso se chama 'prop drilling'. O Context API resolve: é como uma variável global, mas gerenciada de forma limpa pelo React."

#### 2. Teoria (15 min)
"O Context API tem 3 peças:

```
createContext()  → cria o 'canal de comunicação'
Provider         → 'transmissor': define o valor atual
useContext()     → 'receptor': qualquer componente pode ler o valor
```

Estrutura:
```jsx
// 1. Criar
const TemaContext = createContext(null);

// 2. Prover (em volta de toda a árvore)
function TemaProvider({ children }) {
  const [tema, setTema] = useState('light');
  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  );
}

// 3. Consumir (em qualquer filho, independente da profundidade)
function MeuBotao() {
  const { tema } = useContext(TemaContext);
  return <View style={{ backgroundColor: tema === 'dark' ? '#000' : '#fff' }} />;
}
```

No nosso projeto temos dois contextos:
- `AppContext`: gerencia `locale` (idioma) e `themeMode` (nome do tema)
- `ThemeContext`: a partir do `themeMode`, calcula e fornece as cores do tema atual

O `ThemeContext` lê o `AppContext` para saber o modo, e usa `useColorScheme()` para o modo automático (segue o sistema operacional)."

#### 3. Código ao vivo (20 min)
Abrir `contexts/AppContext.js` e `contexts/ThemeContext.js`. Ler em voz alta e explicar:

```jsx
// AppContext.js — gerencia configurações
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [locale, setLocale] = useState('pt-BR');
  const [themeMode, setThemeMode] = useState('light');

  const valor = useMemo(
    () => ({ locale, setLocale, themeMode, setThemeMode }),
    [locale, themeMode]   // só recria o objeto se esses valores mudarem
  );

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
```

"O `useMemo` aqui é importante: sem ele, o objeto `valor` é recriado a cada render do `AppProvider`, causando re-render desnecessário em todos os consumidores. Com `useMemo`, só recria quando `locale` ou `themeMode` mudam de verdade."

Depois abre `app/settings.jsx` e mostra o consumo:
```jsx
const { locale, setLocale, themeMode, setThemeMode } = useAppContext();
const { theme } = useTheme();
```

#### 4. Demonstração (5 min)
Mudar o tema na tela de Settings e mostrar as cores mudando em todo o app (cabeçalho, fundo, textos). Mudar o idioma e mostrar os textos atualizando.

#### 5. Exercícios
1. **Fácil:** Adicione um quinto tema 'sepia' com fundo `#f5e6d3` e texto `#3d2b1f`.
2. **Médio:** Crie um novo contexto `UserContext` que guarda nome e avatar do usuário, e exiba o nome no drawer.
3. **Desafio:** Persista o `themeMode` e `locale` no AsyncStorage: ao abrir o app, carregue as preferências salvas anteriormente.

### Perguntas para fixação
1. O que é prop drilling e por que é problemático?
2. Qual a diferença entre `createContext(null)` e `createContext({ tema: 'light' })`?
3. Por que usamos `useMemo` no valor do Provider?
4. O que acontece quando você chama `useContext()` em um componente que está fora do `Provider`?

---

<a name="aula-21"></a>
## Aula 21 — Upgrade do Expo SDK

**Arquivo:** `app/upgrade_guide.jsx`
**Duração estimada:** 50 minutos
**Pré-requisitos:** Aula 1 concluída; projeto funcionando com o SDK atual
**Dependências:** nenhuma (apenas react-native core + `contexts/ThemeContext.js`)

### Objetivo
O aluno entende por que o SDK Expo é versionado, o que muda entre versões, e executa um upgrade guiado de ponta a ponta — sem quebrar o projeto.

### Conceitos ensinados
- Ciclo de release do Expo SDK (anual, alinhado com React Native)
- Como o `expo install` difere do `npm install`
- Flags `--check` e `--fix` do `npx expo install`
- Conflitos de peer dependencies e como resolvê-los manualmente
- `sdkVersion` no `app.json`
- Breaking changes: onde procurar e o que costuma mudar

### Roteiro

#### 1. Abertura (5 min)
"Todo ecossistema de software evolui. O Expo lança uma nova versão do SDK a cada alguns meses, trazendo suporte a versões mais novas do React Native, correções de bugs, novas APIs e melhorias de performance. Fazer o upgrade cedo — logo após o lançamento — é mais fácil do que acumular múltiplas versões para atualizar de uma vez. Hoje vamos ver o processo completo."

#### 2. Teoria (10 min)

**Por que o `npx expo install` existe?**

"O `npm install` instala a versão mais recente de qualquer pacote. Mas no ecossistema Expo, cada SDK espera versões específicas dos pacotes nativos — `expo-camera`, `expo-sensors`, `react-native-reanimated` etc. Se você instalar versões erradas, o app pode compilar mas travar em runtime, ou simplesmente não funcionar no dispositivo.

O `npx expo install` resolve isso: em vez de buscar a última versão, ele consulta o manifesto do SDK instalado e instala a versão exata esperada."

```bash
# NÃO faça:
npm install expo-camera

# Faça:
npx expo install expo-camera
```

**O manifesto de compatibilidade**

"O arquivo `node_modules/expo/bundledNativeModules.json` (ou equivalente por SDK) lista as versões corretas de cada pacote nativo para aquele SDK. As flags `--check` e `--fix` leem esse arquivo e comparam com o `package.json`."

**`sdkVersion` no `app.json`**

"O campo `sdkVersion` instrui o serviço Expo Application Services (EAS) sobre qual versão do SDK usar para builds na nuvem. Deve ser atualizado manualmente após o upgrade."

#### 3. Demonstração ao vivo (20 min)
Abrir o terminal e executar os passos do checklist da tela `upgrade_guide.jsx`:

**Passo 1 — Consultar o changelog**
"Antes de qualquer comando, abra `expo.dev/changelog` e leia os breaking changes. Identifique quais pacotes do seu projeto têm mudanças de API. Anote."

**Passo 2 — Atualizar o pacote expo**
```bash
npm install expo@latest
```
"Isso atualiza apenas o pacote `expo`. As dependências nativas ainda estão na versão antiga — por isso precisamos do próximo passo."

**Passo 3 — Verificar o que está desatualizado**
```bash
npx expo install --check
```
"Ele compara cada pacote nativo do `package.json` com o que o novo SDK espera. Lista tudo que está fora. Copie essa lista."

**Passo 4 — Corrigir automaticamente**
```bash
npx expo install --fix
```
"Internamente chama `npm install` com as versões corretas. Se houver conflito de peer deps, vai falhar. Nesse caso, use a lista do passo anterior e instale manualmente:

```bash
# Exemplo (versões fictícias para ilustração):
npm install expo-camera@~15.0.8 expo-sensors@~15.0.8 react-native-reanimated@~4.1.1
```

A técnica é: copiar o output do `--check`, formatar como argumento único do `npm install`."

**Passo 5 — Atualizar `app.json`**
```json
{
  "expo": {
    "sdkVersion": "54.0.0"
  }
}
```

**Passo 6 — Checar breaking changes no código**
"Abra cada arquivo que usa pacotes com breaking changes no changelog. Os mais comuns:
- `expo-router`: mudanças na API de Drawer e Tabs entre versões major
- `react-native-reanimated`: v3 → v4 remove `useAnimatedStyle` inline em alguns casos
- `expo-av`: substituído por `expo-audio` e `expo-video` no SDK 51+"

**Passo 7 — Atualizar comentários de dependência**
"Nos arquivos fonte, cada bloco de comentário `// Dependências:` lista as versões. Após o upgrade, atualize esses números para documentar o SDK correto."

**Passo 8 — Testar**
```bash
npx expo start
```
"Navegue por todas as telas. Priorize as que usam câmera, sensores, notificações e banco de dados — são as mais suscetíveis a breaking changes nativos."

#### 4. Tela interativa (10 min)
"Agora vamos à tela `Guia de Upgrade` no app. Ela implementa esse mesmo checklist como uma lista interativa. Cada item pode ser marcado como concluído — a barra de progresso avança conforme você completa os passos."

Mostrar o código do componente `Passo` em `app/upgrade_guide.jsx`:
```jsx
function Passo({ passo, concluido, onToggle }) {
  // ...
  return (
    <TouchableOpacity onPress={onToggle}>
      {/* checkbox visual */}
      {/* descrição */}
      {/* comando em monospace */}
      {/* aviso em amarelo se houver */}
    </TouchableOpacity>
  );
}
```

"Esse padrão — lista de objetos + `Set` de IDs concluídos + toggle — é muito comum em apps de checklist, onboarding e tutoriais."

Mostrar o estado:
```jsx
const [concluidos, setConcluidos] = useState(new Set());

function togglePasso(id) {
  setConcluidos(prev => {
    const novo = new Set(prev);
    if (novo.has(id)) novo.delete(id);
    else novo.add(id);
    return novo;
  });
}
```

"Por que `new Set(prev)` em vez de modificar o Set diretamente? Em React, o estado deve ser imutável — modificar o objeto existente não dispara re-render. Criar um novo `Set` garante que o React detecte a mudança."

#### 5. Exercícios
1. **Fácil:** Adicione um botão "Resetar" que limpa todos os checkboxes (volta `concluidos` para `new Set()`).
2. **Médio:** Persista o progresso no AsyncStorage: ao reabrir o app, os passos marcados devem permanecer marcados.
3. **Desafio:** Adicione um campo de texto em cada passo para o aluno anotar observações (ex: versão instalada, erro encontrado). Persista as anotações junto com o estado dos checkboxes.

### Perguntas para fixação
1. Qual a diferença entre `npm install expo@latest` e `npx expo install expo`?
2. O que acontece se o `sdkVersion` no `app.json` ficar desatualizado?
3. Por que criar `new Set(prev)` ao invés de usar `.add()` direto no `prev`?
4. Em quais tipos de pacotes é mais provável encontrar breaking changes entre versões de SDK?

---

## Apêndice — Ordem Sugerida por Semana

| Semana | Aulas | Foco |
|--------|-------|------|
| 1 | 1 | Setup, estrutura, primeiro componente |
| 2 | 2, 3 | Consumo de APIs REST |
| 3 | 4, 5 | Backend próprio, CRUD completo |
| 4 | 6, 7 | GPS e localização |
| 5 | 8, 9 | Mapas e rotas |
| 6 | 10, 11, 12 | Sensores físicos |
| 7 | 13 | Notificações |
| 8 | 14, 15 | Armazenamento local |
| 9 | 16, 17 | Listas e mídia |
| 10 | 18, 19 | Câmera e háptico |
| 11 | 20 | Arquitetura, Context API |
| 12 | 21 | Manutenção: upgrade do SDK |
| 13 | — | Projeto final integrador |

---

## Projeto Final Sugerido

**App de Diário Pessoal com Localização**

O aluno deve construir um app que:
1. Lista entradas do diário (FlatList — Aula 16)
2. Permite criar nova entrada com texto (POST/SQLite — Aulas 5, 14)
3. Salva a localização GPS de onde a entrada foi escrita (Aula 6)
4. Mostra um mapa com os pontos onde cada entrada foi criada (Aula 8)
5. Notifica às 21h para o usuário escrever a entrada do dia (Aula 13)
6. Suporta tema claro e escuro (Aula 20)

Este projeto integra pelo menos 6 módulos diferentes, validando o aprendizado completo do curso.
