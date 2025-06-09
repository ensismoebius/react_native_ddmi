import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index()
{

  const roteador = useRouter();

  function teste()
  {
    roteador.push('/teste');
  }

  function abreMapa01()
  {
    roteador.push('/mapa01');
  }

  function abreMapa02()
  {
    roteador.push('/mapa02');
  }

    function abreMapa03()
  {
    roteador.push('/mapa03');
  }

  function abreGPS01()
  {
    roteador.push('/gps01');
  }

  function abreGPS02()
  {
    roteador.push('/gps02');
  }

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
  function abreAcelerometro()
  {
    roteador.push('/sensor_accell');
  }

  function abreMovimentacao()
  {
    roteador.push('/sensor_motion');
  }

  function abreGisroscopio()
  {
    roteador.push('/sensor_gyroscope');
  }
  function abreMagnetometro()
  {
    roteador.push('/sensor_magnetometer');
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
      <Button title="Acelerômetro" onPress={abreAcelerometro} />
      <Button title="Movimento" onPress={abreMovimentacao} />
      <Button title="Giroscópio" onPress={abreGisroscopio} />
      <Button title="Magnetômetro" onPress={abreMagnetometro} />
      <Button title="GPS1" onPress={abreGPS01} />
      <Button title="GPS2" onPress={abreGPS02} />
      <Button title="Mapa1" onPress={abreMapa01} />
      <Button title="Mapa2" onPress={abreMapa02} />
      <Button title="Mapa3" onPress={abreMapa03} />
      <Button title="Teste" onPress={teste} />
    </View>
  );
}
