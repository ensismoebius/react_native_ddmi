import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function AccelerometerScreen()
{
  const [info, setInfo] = useState({ x: 0, y: 0, z: 0 });
  const [collecting, setCollecting] = useState(null);

  useEffect(() =>
  {
    Accelerometer.setUpdateInterval(100); // 100ms = 10Hz
    const sub = Accelerometer.addListener(setInfo);
    setCollecting(sub);

    return () =>
    {
      sub && sub.remove();
      setCollecting(null);
    };
  }, []);

  const handleStart = () =>
  {
    if (!collecting)
    {
      const sub = Accelerometer.addListener(setInfo);
      setCollecting(sub);
    }
  };

  const handleStop = () =>
  {
    if (collecting)
    {
      collecting.remove();
      setCollecting(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acelerômetro</Text>
      <Text style={styles.text}>x: {info.x.toFixed(2)}</Text>
      <Text style={styles.text}>y: {info.y.toFixed(2)}</Text>
      <Text style={styles.text}>z: {info.z.toFixed(2)}</Text>
      <View style={styles.buttons}>
        <Button title="Iniciar" onPress={handleStart} disabled={collecting !== null} />
        <Button title="Parar" onPress={handleStop} disabled={collecting === null} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  text: { fontSize: 18, marginVertical: 5 },
  buttons: { flexDirection: 'row', marginTop: 20, gap: 10 },
});
