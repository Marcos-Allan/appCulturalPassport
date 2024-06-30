import { SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Signs } from './src/screens/Signs';
import { Home } from './src/screens/Home';
import { SignIn } from './src/screens/SignIn'

import { Provider } from './src/provider';

import LoadingPage from './src/Components/LoadingPage';
import Alert from './src/Components/Alert';

export type RootStackParamList = {
  Home: undefined;
  Signs: undefined;
  SignIn: undefined;
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
            <Stack.Screen name="SignIn" component={SignIn} />
          </Stack.Navigator>
          <LoadingPage />
          <Alert />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}