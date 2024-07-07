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
import { ForgoutPassword } from './src/screens/ForgoutPassword';
import { ConfirmCode } from './src/screens/ConfirmCode';
import { SwitchPassword } from './src/screens/SwitchPassword';
import { MyPerfil } from './src/screens/MyPerfil';
import { Materias } from './src/screens/Materias';
import { Exercises } from './src/screens/Exercises';
import { Achievements } from './src/screens/Achievements';
import { Notifications } from './src/screens/Notifications';

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
  ForgoutPassword: undefined;
  ConfirmCode: undefined;
  SwitchPassword: undefined;
  MyPerfil: undefined;
  Materias: undefined;
  Exercises: undefined;
  Achievements: undefined;
  Notifications: undefined;
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
            <Stack.Screen name="ForgoutPassword" component={ForgoutPassword} />
            <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
            <Stack.Screen name="SwitchPassword" component={SwitchPassword} />
            <Stack.Screen name="MyPerfil" component={MyPerfil} />
            <Stack.Screen name="Materias" component={Materias} />
            <Stack.Screen name="Exercises" component={Exercises} />
            <Stack.Screen name="Achievements" component={Achievements} />
            <Stack.Screen name="Notifications" component={Notifications} />
          </Stack.Navigator>
          <LoadingPage />
          <Alert />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}