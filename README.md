# DDMI — React Native / Expo demo app

Collection of Expo/React Native screens demonstrating common mobile features.

## Requirements

- Node.js 18+
- Android device/emulator **or** iOS device/simulator

## Running locally

```bash
npm install
npx expo start          # opens Expo dev menu
npx expo start --android
npx expo start --ios
```

## Building with EAS

```bash
npm install -g eas-cli
eas login
eas build:configure     # updates app.json and creates eas.json
eas build --platform android
eas build --platform ios
```

---

## Screens

### Home (`app/index.jsx`)

Entry point. Lists buttons that navigate to every other screen.

---

### Consultar CEP (`app/consultaCEP.jsx`)

Looks up a Brazilian postal code (CEP) via the public [ViaCEP](https://viacep.com.br) API.

**How to use:**
1. Type an 8-digit CEP (numbers only).
2. Tap **Buscar CEP**.
3. Address, neighborhood, city and state are displayed below.

---

### Enviar dados (`app/postJson.jsx`)

Sends a POST request with a JSON body to the public [JSONPlaceholder](https://jsonplaceholder.typicode.com) test API.

**How to use:**
1. Fill in *Título da mensagem* and *Mensagem*.
2. Tap **Enviar**.
3. The response `id` returned by the server is shown.

---

### GET e POST com PHP (`app/postGetPhp.jsx`)

Demonstrates GET and POST requests to a local PHP backend (`http://localhost/api.php`) protected by an API key header (`X-API-KEY`).

**How to use:**
- Tap **Carregar dados** — performs a GET and displays the JSON response.
- Fill in *Nome* and *Email*, then tap **Enviar** — performs a POST and shows the response.

> The PHP server must be running locally. Update `API_URL` and `API_KEY` in the file to match your setup.

---

### Acelerômetro (`app/sensor_accell.jsx`)

Reads the device accelerometer at 10 Hz and displays live x/y/z values.

**How to use:**
- Values update automatically on mount.
- Tap **Parar** to stop the listener; tap **Iniciar** to resume.

---

### Movimento (`app/sensor_motion.jsx`)

Reads the gyroscope at 20 Hz and plots live x/y/z data as scrolling line charts (Victory Native).

**How to use:**
- Open the screen — data collection starts immediately.
- Scroll down to see the separate X, Y, Z charts.

---

### Giroscópio (`app/sensor_gyroscope.jsx`)

Same as *Movimento* but stores up to 100 data points per axis.

---

### Magnetômetro (`app/sensor_magnetometer.jsx`)

Reads the magnetometer at 20 Hz and plots live x/y/z values as scrolling line charts. Domain is −100 to 100 µT.

---

### GPS1 (`app/gps01.jsx`)

Gets the device's current position **once** on mount.

**How to use:**
- Open the screen and accept the location permission prompt.
- Latitude and longitude are displayed.

---

### GPS2 (`app/gps02.jsx`)

Watches the device position continuously, updating every second or every 1 meter.

**How to use:**
- Open the screen and accept the location permission prompt.
- Coordinates update in real time as you move.

---

### Mapa1 (`app/mapa01.jsx`)

Shows a WebView with OpenStreetMap centered on the device's current location (one-shot fetch).

**How to use:**
- Accept the location permission prompt.
- The map loads and pans to your position.

---

### Mapa2 (`app/mapa02.jsx`)

Same as *Mapa1* but the map re-centers continuously as the device moves.

---

### Mapa3 (`app/mapa03.jsx`)

Manual coordinate input with OSM marker support.

**How to use:**
1. Type a *Latitude* and *Longitude*.
2. Tap **Go**.
3. The map pans to those coordinates and drops a marker.

---

### Notificações 1 (`app/notificacoes.jsx`)

Basic local push notifications using `expo-notifications`.

**How to use:**
- Tap **Schedule Notification** — a notification titled *"Hello from Expo!"* fires after 2 seconds.
- Received notifications are shown on screen.

---

### Notificações 2 (`app/notificacoes2.jsx`)

Same as *Notificações 1* but with trigger `seconds: 0` (fires immediately).

---

### Notificações 3 (`app/notificacoes3.jsx`)

Same as *Notificações 2* but plays a custom sound (`assets/sounds/oloco.mp3`).

---

### Usuários Express (`app/expressUsers.jsx`)

Full CRUD interface against a local Express + MySQL REST API.

**Requires:** the Express server running on `http://localhost:5173/`.

```bash
# in the server directory
node server/index.js
```

The server exposes:

| Method | Endpoint       | Description    |
|--------|----------------|----------------|
| GET    | /api/users     | List all users |
| POST   | /api/users     | Create a user  |
| PUT    | /api/users/:id | Update a user  |
| DELETE | /api/users/:id | Delete a user  |

**How to use:**
- Open the screen — users are fetched automatically.
- **Add:** fill in *Nome* and *E-mail*, tap **Adicionar**.
- **Edit:** tap **Editar** on a row, change the fields, tap **Salvar alteração**. Tap **Cancelar** to abort.
- **Delete:** tap **Excluir** on a row.
- Tap **Recarregar** to manually refresh the list.

> On a physical Android device `localhost` refers to the device itself, not your machine.
> Replace `localhost` in `API_BASE` inside `app/expressUsers.jsx` with your machine's LAN IP (e.g. `192.168.1.x`).
