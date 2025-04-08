import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index()
{
  const roteador = useRouter();
  function vaiParaOCep()
  {
    roteador.push("/cep");
  }
  return (
    <View>
      <Text>API do CEP</Text>
      <Button title="Abrir CEP" onPress={vaiParaOCep} />
    </View>
  );
}
