import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index()
{

  const roteador = useRouter();


  function abreConsultaCEP()
  {
    roteador.push('/consultaCEP');
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
    </View>
  );
}
