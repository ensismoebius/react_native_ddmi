// npm install victory - native@legacy--save
// npm install react-native-svg --save



import React from 'react';
import { View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import Svg from 'react-native-svg';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Svg width="100%" height="400">
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          width={350}
          height={400}
          standalone={false}
        >
          <VictoryBar
            data={[
              { x: 'A', y: 2 },
              { x: 'B', y: 3 },
              { x: 'C', y: 5 },
            ]}
          />
        </VictoryChart>
      </Svg>
    </View>
  );
}
