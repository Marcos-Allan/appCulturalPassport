//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { SafeAreaView, StatusBar } from 'react-native'

//IMPORTAÇÃO DAS BIBLIOTECAS
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//IMPORTAÇÃO DAS PÁGINAS
import { Home } from './src/screens/Home';
import { Signs } from './src/screens/Signs';
import { SignIn } from './src/screens/SignIn'
import { SignUp } from './src/screens/SignUp';

//IMPORTAÇÃO DO PROVEDOR DE ESTADOS GLOBAIS
import { Provider } from './src/provider';

//IMPORTAÇÃO DOS COMPONENTES
import LoadingPage from './src/Components/LoadingPage';
import Alert from './src/Components/Alert';

//TIPAGEM DAS PÁGINAS
export type RootStackParamList = {
  Home: undefined;
  Signs: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

//CONFIGURAÇÃO DAS ROTAS DAS PÁGINAS COM A TIPAGEM DAS PRÓPRIAS
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="default" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Signs" component={Signs} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
          <LoadingPage />
          <Alert />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}