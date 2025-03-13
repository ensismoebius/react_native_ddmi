import { useRouter } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Index()
{

  const roteador = useRouter();
  function vaiParaOsAfazeres()
  {
    roteador.push("/afazeres");
  }

  return (
    <View>
      <button onClick={vaiParaOsAfazeres} >Afazeres</button>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
