import { useRouter } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Index()
{

  const roteador = useRouter();

  function vaiParaOCep()
  {
    roteador.push("/cep");
  }

  function vaiParaOsAfazeres()
  {
    roteador.push("/afazeres");
  }

  return (
    <View>
      <Button onClick={vaiParaOsAfazeres} >Afazeres</Button>

      <Button
        title="Vai para cep"
        onPress={vaiParaOCep}
      />

      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
