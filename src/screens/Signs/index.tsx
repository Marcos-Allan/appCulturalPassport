//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View, Pressable, Image } from "react-native";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useEffect } from "react";

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
import Return from "../../Components/Return";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'Signs'>;

export const Signs:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen } = states

    //FUNÇÃO RESPONSÁVEL POR FECHAR O MENU SE ESTIVER ABERTO
    function closeMenu(){
        if(menuOpen == true){
            toggleMenuOpen()
        }else{
            return
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE CARREGA A PÁGINA
    useEffect(() => {
        closeMenu()
    },[])

    return(
        <Pressable
            onPress={closeMenu}
            className={`w-full flex-grow-[1] items-center justify-start ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}
        >
            <View className={`w-[90%] flex flex-col items-center justify-start`}>
                
                <View className={`w-[90%] mt-8 justify-center flex flex-row items-center`}>
                    <Return event={() => navigation.goBack()} />
                    <TitlePage text="salve seu progresso" />
                    <MenuButton />
                </View>

                <MyText text="Faça login ou cadastre-se para não perder seus dados" />
                
                <Image
                    className={`w-[420px]`}
                    source={require('../../../assets/imgs/person_2.png')}
                />

                <MyButton text="fazer login" event={() => navigation.navigate('SignIn')} />
                <MyButton text="criar conta" event={() => navigation.navigate('Home')} />

            </View>
            <Menu />
        </Pressable>
    )
}