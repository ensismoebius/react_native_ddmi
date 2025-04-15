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

  function vaiParaMinhaAPI()
  {
    roteador.push("/minhaAPI");
  }

  return (
    <View>
      <Button onClick={vaiParaOsAfazeres} title="Afazeres" />

      <Button
        title="Vai para cep"
        onPress={vaiParaOCep}
      />

      <Button
        title="Vai para minha API"
        onPress={vaiParaMinhaAPI}
      />

      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
