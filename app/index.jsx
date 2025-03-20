import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index()
{

  const roteador = useRouter();


  function abreConsultaCEP()
  {
    roteador.push('/consultaCEP');
  }
  function abrePost()
  {
    roteador.push('/postJson');
  }
  function abreGetPostPhp()
  {
    roteador.push('/postGetPhp');
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Escolha as ações abaixo:</Text>
      <Button title="Consultar CEP" onPress={abreConsultaCEP} />
      <Button title="Enviar dados" onPress={abrePost} />
      <Button title="GET e POST com php" onPress={abreGetPostPhp} />
    </View>
  );
}
