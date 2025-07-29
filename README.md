# Compilar usando o serviço EAS
npx expo install --check

sudo npm install -g eas-cli
eas login
eas build:configure
__Vai mudar os arquivos App.jason e criar o eas.json__
eas build --platform android
eas build --platform ios