#!/bin/bash
# Instala todas as dependências do projeto MOBII Reference Rich.
# Expo SDK 54 | React Native 0.81 | React 19.1
# Execute uma vez após clonar o repositório:
#   chmod +x install.sh && ./install.sh

set -e  # para na primeira falha

echo ">>> Instalando dependências do package.json..."
npm install

echo ""
echo ">>> Instalação concluída. Inicie o projeto com: npx expo start"
