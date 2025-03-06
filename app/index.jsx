import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index()
{
  const roteador = useRouter();

  function vaiPraBatata()
  {
    roteador.push('/batata');
  }

  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Vamos pra batata" onPress={vaiPraBatata} />
    </View>
  );
}
