// npm install react-native-svg
// npm install victory - native@legacy--save
// npm install react-native-svg --save

import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory-native';

const MAX_POINTS = 50;

export default function GyroscopeChartScreen()
{
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [bufferX, setBufferX] = useState([]);
  const [bufferY, setBufferY] = useState([]);
  const [bufferZ, setBufferZ] = useState([]);

  useEffect(() =>
  {
    Gyroscope.setUpdateInterval(50);
    const subscription = Gyroscope.addListener(gyroData =>
    {
      setData(gyroData);

      setBufferX(old =>
      {
        const newArray = [...old, gyroData.x];
        if (newArray.length > MAX_POINTS) newArray.shift();
        return newArray;
      });

      setBufferY(old =>
      {
        const newArray = [...old, gyroData.y];
        if (newArray.length > MAX_POINTS) newArray.shift();
        return newArray;
      });

      setBufferZ(old =>
      {
        const newArray = [...old, gyroData.z];
        if (newArray.length > MAX_POINTS) newArray.shift();
        return newArray;
      });
    });

    return () => subscription.remove();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Giroscópio com gráfico</Text>
      <Text style={styles.text}>x: {data.x.toFixed(3)}</Text>
      <Text style={styles.text}>y: {data.y.toFixed(3)}</Text>
      <Text style={styles.text}>z: {data.z.toFixed(3)}</Text>

      <Text style={styles.axisLabel}>Eixo X, Y, Z</Text>


      <VictoryChart
        height={150}
        padding={{ top: 20, left: 50, right: 30, bottom: 40 }}
        domain={{ y: [-5, 5] }}
      >
        <VictoryLine
          theme={VictoryTheme.clean}
          data={bufferX.map((y, i) => ({ x: i, y }))}
          style={{ data: { stroke: "#c43a31" } }}
          interpolation="basisOpen"
        />
      </VictoryChart>


      <VictoryChart
        height={150}
        padding={{ top: 20, left: 50, right: 30, bottom: 40 }}
        domain={{ y: [-5, 5] }}
      >
        <VictoryLine
          theme={VictoryTheme.clean}
          data={bufferY.map((y, i) => ({ x: i, y }))}
          style={{ data: { stroke: "#0074D9" } }}
          interpolation="basisOpen"
        />
      </VictoryChart>


      <VictoryChart
        height={150}
        padding={{ top: 20, left: 50, right: 30, bottom: 40 }}
        domain={{ y: [-5, 5] }}
      >
        <VictoryLine
          theme={VictoryTheme.clean}
          data={bufferZ.map((y, i) => ({ x: i, y }))}
          style={{ data: { stroke: "#2ECC40" } }}
          interpolation="basisOpen"
        />
      </VictoryChart>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  text: { fontSize: 16, textAlign: 'center', marginBottom: 4 },
  axisLabel: { fontSize: 14, fontWeight: 'bold', marginTop: 12, textAlign: 'center' },
});
