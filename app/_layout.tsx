// Import the Drawer component from expo-router for the hamburger menu functionality
import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { DRAWER_SCREENS } from '../constants/navigation';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            drawerActiveBackgroundColor: '#e6f2ff',
            drawerActiveTintColor: '#007AFF',
            drawerInactiveTintColor: '#333',
            drawerLabelStyle: { fontSize: 16, fontWeight: '500' },
          }}
        >
          {DRAWER_SCREENS.map((screen) => (
            <Drawer.Screen 
              key={screen.name}
              name={screen.name} 
              options={{ 
                drawerLabel: screen.label, 
                title: screen.title,
                drawerIcon: ({ color }) => <Ionicons name={screen.icon} size={22} color={color} />
              }} 
            />
          ))}
        </Drawer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}


