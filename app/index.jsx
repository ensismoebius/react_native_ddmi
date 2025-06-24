import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const roteador = useRouter();


  function vaiParaOMapa01() {
    roteador.push("/mapa01");
  }

  function vaiParaOMapa02() {
    roteador.push("/mapa02");
  }

  function vaiParaOCep() {
    roteador.push("/cep");
  }

  function vaiParaMinhaAPI() {
    roteador.push("/minhaAPI");
  }

  return (
    <View>
      <Text>API do CEP</Text>
      <Button title="Abrir CEP" onPress={vaiParaOCep} />
      <Button title="Abrir Minha API" onPress={vaiParaMinhaAPI} />

      <Button title="Abrir Mapa 01" onPress={vaiParaOMapa01} />
      <Button title="Abrir Mapa 02" onPress={vaiParaOMapa02} />
    </View>
  );
}
