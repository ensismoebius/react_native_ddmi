import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index()
{
  const roteador = useRouter();
  function abreAfazeres()
  {
    roteador.push('/afazeres');
  }

  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button onPress={abreAfazeres} title="Abre afazeres" />
    </View>
  );
}
