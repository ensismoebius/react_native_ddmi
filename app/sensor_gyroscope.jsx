import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory';

const MAX_POINTS = 100;

export default function GyroscopeChartScreen()
{
    const [data, setData] = useState({ x: 0, y: 0, z: 0 });
    const [bufferX, setBufferX] = useState([]);
    const [bufferY, setBufferY] = useState([]);
    const [bufferZ, setBufferZ] = useState([]);

    useEffect(() =>
    {
        Gyroscope.setUpdateInterval(50); // 20 Hz
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

            <Text style={styles.axisLabel}>Eixo X</Text>
            <VictoryChart
                theme={VictoryTheme.material}
                height={150}
                padding={{ top: 20, bottom: 40, left: 40, right: 20 }}
                domain={{ y: [-5, 5] }}
            >
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryLine
                    data={bufferX.map((y, i) => ({ x: i, y }))}
                    style={{ data: { stroke: 'red' } }}
                    interpolation="basis"
                />
            </VictoryChart>

            <Text style={styles.axisLabel}>Eixo Y</Text>
            <VictoryChart
                theme={VictoryTheme.material}
                height={150}
                padding={{ top: 20, bottom: 40, left: 40, right: 20 }}
                domain={{ y: [-5, 5] }}
            >
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryLine
                    data={bufferY.map((y, i) => ({ x: i, y }))}
                    style={{ data: { stroke: 'green' } }}
                    interpolation="basis"
                />
            </VictoryChart>

            <Text style={styles.axisLabel}>Eixo Z</Text>
            <VictoryChart
                theme={VictoryTheme.material}
                height={150}
                padding={{ top: 20, bottom: 40, left: 40, right: 20 }}
                domain={{ y: [-5, 5] }}
            >
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryLine
                    data={bufferZ.map((y, i) => ({ x: i, y }))}
                    style={{ data: { stroke: 'blue' } }}
                    interpolation="basis"
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
