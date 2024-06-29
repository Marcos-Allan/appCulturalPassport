//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View, Pressable } from "react-native";

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from "react";

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
import Return from "../../Components/Return";
import Input from "../../Components/Input";
import Link from "../../Components/Link";
import Separation from "../../Components/Separation";
import GoogleLogin from "../../Components/GoogleLogin";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

export const SignIn:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen } = states

    //UTILIZAÇÃO DO HOOK useState
    const [textEmail, setTextEmail] = useState<string>('')
    const [placeholderEmail, setPlaceholderEmail] = useState<string>('Digite seu email')
    const [labelEmail, setLabelEmail] = useState<string>('email')
    const [textPassword, setTextPassword] = useState<string>('')
    const [placeholderPassword, setPlaceholderPassword] = useState<string>('Digite seu password')
    const [labelPassword, setLabelPassword] = useState<string>('Password')

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
            className={`w-full flex-grow-[1] items-center justify-start ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
            <View className={`w-[90%] flex flex-col items-center justify-start`}>
                
                <View className={`w-[90%] mt-8 justify-center flex flex-row items-center mb-5`}>
                    <Return event={() => navigation.goBack()} />
                    <TitlePage text="login" />
                    <MenuButton />
                </View>

                <Input label={labelEmail} onChange={setTextEmail} placeholder={placeholderEmail} value={textEmail} icon="email" type="email" />
                <Input label={labelPassword} onChange={setTextPassword} placeholder={placeholderPassword} value={textPassword} icon="password" type="password" hidden={true} />

                <MyButton text="entrar" event={() => navigation.navigate('Home')} />

                <Link text="Esqueceu sua senha?" />
                <Link text="Crie sua conta" />

                <Separation />

                <GoogleLogin />

            </View>
            <Menu />
        </Pressable>
    )
}