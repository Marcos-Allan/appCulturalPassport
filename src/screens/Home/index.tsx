//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View, Image } from "react-native";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DA PÁGINA
import { StackScreenProps } from '@react-navigation/stack';

//LISTA DOS PARAMETROS DA PÁGINA
import { RootStackParamList } from '../../../App';

//IMPORTAÇÃO DOS COMPONENTES
import Menu from "../../Components/Menu";
import MyButton from "../../Components/MyButton";
import TitlePage from "../../Components/TitlePage";
import MenuButton from "../../Components/MenuButton";
import MyText from "../../Components/MyText";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'Home'>;

export const Home:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <View className={`w-full flex-grow-[1] items-center justify-start ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
            <View className={`w-[90%] flex flex-col items-center justify-start`}>
                
                <View className={`w-full mt-8 justify-center flex flex-row items-center`}>
                    <TitlePage text="bem vindo estudante" />
                    <MenuButton />
                </View>

                <MyText text="Seja muito bem-vindo ao nosso app de estudos. Se prepare para os vestibulares com simulados e conteúdos diversos" />
                
                <Image
                    className={`w-[420px]`}
                    source={require('../../../assets/imgs/person_1.png')}
                />
                <MyButton text="iniciar" event={() => navigation.navigate('Signs')} />
            </View>
            <Menu />
        </View>
    )
}