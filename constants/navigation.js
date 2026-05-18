/**
 * Arquivo de configuração de navegação do app
 * Define as telas disponíveis no menu drawer (navegação lateral)
 * Uso: import { DRAWER_SCREENS } from '../constants/navigation';
 */

// ============================================
// IMPORTS
// Bibliotecas necessárias para navegação
// ============================================

import { Ionicons } from '@expo/vector-icons';  // Ícones do Ionicons (Expo Vector Icons)

// ============================================
// DEFINIÇÃO DAS TELAS DO MENU DRAWER
// Array com configuração de cada tela do menu lateral
// ============================================

/**
 * DRAWER_SCREENS: Array de objetos definindo cada tela
 * - name: nome do arquivo JSX em app/ (sem extensão)
 * - label: texto exibido no menu drawer
 * - title: título exibido no header da tela
 * - icon: nome do ícone Ionicons
 */
export const DRAWER_SCREENS = [
  // ------------------------------------------
  // TELA INICIAL
  // ------------------------------------------
  { 
    name: 'index',           // Arquivo: app/index.jsx
    label: 'Home',           // Nome no menu
    title: 'Home',           // Título no header
    icon: 'home-outline'     // Ícone: casa
  },

  // ------------------------------------------
  // SEÇÃO: MAPAS E LOCALIZAÇÃO
  // ------------------------------------------
  { 
    name: 'route',           // Arquivo: app/route.jsx
    label: 'Route Planner',  // Nome no menu
    title: 'Route Planner',  // Título no header
    icon: 'map-outline'      // Ícone: mapa
  },
  { 
    name: 'gps02',           // Arquivo: app/gps02.jsx
    label: 'Current Location', 
    title: 'Current Location', 
    icon: 'location-outline' // Ícone: localização atual
  },
  { 
    name: 'consultaCEP',     // Arquivo: app/consultaCEP.jsx
    label: 'Address Finder', 
    title: 'Address Finder', 
    icon: 'search-outline'   // Ícone: lupa
  },
  { 
    name: 'gps01',           // Arquivo: app/gps01.jsx
    label: 'Static GPS', 
    title: 'Static GPS', 
    icon: 'location-outline' // Ícone: localização
  },
  { 
    name: 'mapa01',          // Arquivo: app/mapa01.jsx
    label: 'Basic Map', 
    title: 'Basic Map', 
    icon: 'map-outline'      // Ícone: mapa
  },
  { 
    name: 'mapa02',          // Arquivo: app/mapa02.jsx
    label: 'Live Map', 
    title: 'Live Map', 
    icon: 'map-outline'      // Ícone: mapa
  },
  { 
    name: 'mapa03',          // Arquivo: app/mapa03.jsx
    label: 'Manual Map', 
    title: 'Manual Map', 
    icon: 'map-outline'      // Ícone: mapa
  },

  // ------------------------------------------
  // SEÇÃO: REDE E DADOS
  // ------------------------------------------
  { 
    name: 'expressUsers',    // Arquivo: app/expressUsers.jsx
    label: 'User Management', 
    title: 'User Management', 
    icon: 'people-outline'   // Ícone: pessoas
  },
  { 
    name: 'postJson',        // Arquivo: app/postJson.jsx
    label: 'JSON Sender', 
    title: 'JSON Sender', 
    icon: 'send-outline'     // Ícone: enviar
  },
  { 
    name: 'postGetPhp',      // Arquivo: app/postGetPhp.jsx
    label: 'Backend Test', 
    title: 'Backend Test', 
    icon: 'code-slash-outline' // Ícone: código
  },

  // ------------------------------------------
  // SEÇÃO: SENSORES
  // ------------------------------------------
  { 
    name: 'sensor_accell',   // Arquivo: app/sensor_accell.jsx
    label: 'Accelerometer',  // Nome no menu
    title: 'Accelerometer',  // Título no header
    icon: 'speedometer-outline' // Ícone: velocímetro
  },
  { 
    name: 'sensor_motion',  // Arquivo: app/sensor_motion.jsx
    label: 'Motion Sensor', 
    title: 'Motion Sensor', 
    icon: 'pulse-outline'    // Ícone: pulso
  },
  { 
    name: 'sensor_gyroscope', // Arquivo: app/sensor_gyroscope.jsx
    label: 'Gyroscope', 
    title: 'Gyroscope', 
    icon: 'compass-outline'  // Ícone: bússola
  },
  { 
    name: 'sensor_magnetometer', // Arquivo: app/sensor_magnetometer.jsx
    label: 'Magnetometer', 
    title: 'Magnetometer', 
    icon: 'scan-outline'     // Ícone: scanner
  },

  // ------------------------------------------
  // SEÇÃO: NOTIFICAÇÕES
  // ------------------------------------------
  { 
    name: 'notificacoes',    // Arquivo: app/notificacoes.jsx
    label: 'Notifications 1', 
    title: 'Notifications 1', 
    icon: 'notifications-outline' // Ícone: sino
  },
  { 
    name: 'notificacoes2',   // Arquivo: app/notificacoes2.jsx
    label: 'Notifications 2', 
    title: 'Notifications 2', 
    icon: 'notifications-outline' // Ícone: sino
  },
  { 
    name: 'notificacoes3',   // arquivo: app/notificacoes3.jsx
    label: 'Notifications 3', 
    title: 'Notifications 3', 
    icon: 'notifications-outline' // Ícone: sino
  },

  // ------------------------------------------
  // SEÇÃO: BANCO DE DADOS LOCAL
  // ------------------------------------------
  {
    name: 'sqlite_demo',      // Arquivo: app/sqlite_demo.jsx
    label: 'SQLite Demo',
    title: 'SQLite Demo',
    icon: 'server-outline'
  },
  {
    name: 'async_storage',    // Arquivo: app/async_storage.jsx
    label: 'AsyncStorage',
    title: 'AsyncStorage',
    icon: 'save-outline'
  },

  // ------------------------------------------
  // SEÇÃO: LISTAS
  // ------------------------------------------
  {
    name: 'lista_tarefas',    // Arquivo: app/lista_tarefas.jsx
    label: 'Lista de Tarefas',
    title: 'Lista de Tarefas',
    icon: 'checkmark-done-outline'
  },

  // ------------------------------------------
  // SEÇÃO: MÍDIA
  // ------------------------------------------
  {
    name: 'audio',            // Arquivo: app/audio.jsx
    label: 'Player de Áudio',
    title: 'Player de Áudio',
    icon: 'musical-notes-outline'
  },
  {
    name: 'camera',           // Arquivo: app/camera.jsx
    label: 'Câmera / Galeria',
    title: 'Câmera / Galeria',
    icon: 'camera-outline'
  },
  {
    name: 'haptics',          // Arquivo: app/haptics.jsx
    label: 'Feedback Háptico',
    title: 'Feedback Háptico',
    icon: 'phone-portrait-outline'
  },

  // ------------------------------------------
  // OUTROS
  // ------------------------------------------
{
    name: 'teste',           // Arquivo: app/teste.jsx
    label: 'Test Lab',       // Nome no menu
    title: 'Test Lab',       // Título no header
    icon: 'flask-outline'    // Ícone: laboratório
  },
  { 
    name: 'settings',         // Arquivo: app/settings.jsx
    label: 'Configurações',   // Nome no menu
    title: 'Configurações',   // Título no header
    icon: 'settings-outline' // Ícone: engrenagem
  },
];