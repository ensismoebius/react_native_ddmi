#!/bin/bash
# Instala todas as dependências do projeto MOBII Reference Rich.
# Execute uma vez após clonar o repositório:
#   chmod +x install.sh && ./install.sh

set -e  # para na primeira falha

echo ">>> [1/2] Instalando dependências do package.json..."
npm install

# Esses pacotes são usados no código-fonte mas não constam no package.json.
# npx expo install resolve automaticamente a versão compatível com o Expo SDK.
echo ""
echo ">>> [2/2] Instalando pacotes ausentes do package.json..."

# Aula 14 — SQLite
npx expo install expo-sqlite

# Aula 15 — AsyncStorage
npx expo install @react-native-async-storage/async-storage

# Aula 17 — Player de áudio
npx expo install expo-av

# Aula 18 — Câmera e galeria
npx expo install expo-image-picker

echo ""
echo ">>> Instalação concluída. Inicie o projeto com: npx expo start"
