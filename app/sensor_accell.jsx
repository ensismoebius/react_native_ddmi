import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Button } from '../components/Button';
import { useTranslation } from '../hooks/useTranslation';

export default function AccelerometerScreen() {
  const [info, setInfo] = useState({ x: 0, y: 0, z: 0 });
  const [collecting, setCollecting] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const sub = Accelerometer.addListener(setInfo);
    setCollecting(sub);

    return () => {
      sub && sub.remove();
      setCollecting(null);
    };
  }, []);

  const handleStart = () => {
    if (!collecting) {
      const sub = Accelerometer.addListener(setInfo);
      setCollecting(sub);
    }
  };

  const handleStop = () => {
    if (collecting) {
      collecting.remove();
      setCollecting(null);
    }
  };

  const title = t ? t('sensor.accelerometer') : 'Acelerômetro';
  const startText = t ? t('common.start') : 'Iniciar';
  const stopText = t ? t('common.stop') : 'Parar';
  const axisX = t ? t('sensor.axisX') : 'X';
  const axisY = t ? t('sensor.axisY') : 'Y';
  const axisZ = t ? t('sensor.axisZ') : 'Z';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{axisX}: {info.x.toFixed(2)}</Text>
      <Text style={styles.text}>{axisY}: {info.y.toFixed(2)}</Text>
      <Text style={styles.text}>{axisZ}: {info.z.toFixed(2)}</Text>
      <View style={styles.buttons}>
        <Button 
          title={startText} 
          onPress={handleStart} 
          disabled={collecting !== null}
          variant="secondary"
        />
        <Button 
          title={stopText} 
          onPress={handleStop} 
          disabled={collecting === null}
          variant="danger"
        />
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