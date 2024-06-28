import { SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Signs } from './src/screens/Signs';
import { Home } from './src/screens/Home';

import { Provider } from './src/provider';

export type RootStackParamList = {
  Home: undefined;
  Signs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider>
      <SafeAreaView style={{ flex: 1,}}>
        <StatusBar barStyle="default" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Signs" component={Signs} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}