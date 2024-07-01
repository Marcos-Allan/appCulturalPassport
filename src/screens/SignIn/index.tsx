/**
 * MIT License with Additional Restrictions
 * 
 * Copyright (c) 2024 Marcos Allan Santos Menezes
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * 1. The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * 2. The Software may not be used, modified, or distributed without the prior
 * written permission of the copyright holder.
 * 
 * 3. The Software is provided "as is", without warranty of any kind, express or
 * implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and noninfringement. In no event shall the
 * authors or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising from,
 * out of or in connection with the Software or the use or other dealings in the
 * Software.
 * 
 * By using the Software, you agree to these terms and conditions.
 */

//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View, Pressable, Text, Image, Vibration, Keyboard } from "react-native";

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
import instance from "../../utils/axios";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

export const SignIn:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen, userS, toggleUser, toggleLoading, toggleAlert } = states

    //UTILIZAÇÃO DO HOOK useState
    const [textEmail, setTextEmail] = useState<string>('')
    const [placeholderEmail, setPlaceholderEmail] = useState<string>('Digite seu email')
    const [labelEmail, setLabelEmail] = useState<string>('email')
    const [textPassword, setTextPassword] = useState<string>('')
    const [placeholderPassword, setPlaceholderPassword] = useState<string>('Digite seu password')
    const [labelPassword, setLabelPassword] = useState<string>('Password')

    const [inputFocus, setInputFocus] = useState<number>(0)

    //FUNÇÃO RESPONSÁVEL POR FECHAR O MENU SE ESTIVER ABERTO
    function closeMenu(){
        if(menuOpen == true){
            toggleMenuOpen()
        }else{
            return
        }
    }

    //SISTEMA DE VIBRAÇÃO AO RECEBER MENSAGEM
    const patternessage = [0, 400, 100, 400]
    
    //SISTEMA DE VIBRAÇÃO DE ERRO
    const patternError = [0, 450]

    //FUNÇÃO RESPONSÁVEL POR FAZER LOGIN COM EMAIL E SENHA
    function signin() {
        //DISPENSA O TECLADO
        Keyboard.dismiss()
        
        //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA true
        toggleLoading(true)

        instance.post('/signin', {
            //MANDA OS DADOS PARA O BACKEND JUNTO COM A REQUISIÇÃO
            email: textEmail,
            password: textPassword
        })
        .then(function (response) {
            //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA false
            toggleLoading(false)

            //VERIFICA SE A CONTA FOI ENCONTRADA PELO TIPO DO DADO RETORNADO
            if(typeof response.data === "object"){
                toggleUser(response.data.name, response.data.img, response.data._id, true)

                //MOSTRA MENSAGEM DE SUCESSO
                toggleAlert('success', `Seja bem vindo(a), ${response.data.name}`, true, 5000)
            }else{
                //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA false
                toggleLoading(false)

                //MOSTRA MENSAGEM DE SUCESSO
                toggleAlert('error', response.data, true, 5000)

                //FAZ O CELULAR VIBRAR DE ACORDO COM O PADRÃO FORNECIDO
                Vibration.vibrate(patternError)
            }
        })
        .catch(function (error) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR MAL SUCEDIDA
            console.log(error)
            
            //FAZ O CELULAR VIBRAR DE ACORDO COM O PADRÃO FORNECIDO
            Vibration.vibrate(patternError)
            
            //MOSTRA MENSAGEM DE ERRO
            toggleAlert('error', 'Erro interno no servidor', true, 5000)
        })
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

                <Input
                    label={labelEmail}
                    onChange={setTextEmail}
                    placeholder={placeholderEmail}
                    value={textEmail}
                    icon="email"
                    type="email"
                    inputFocus={inputFocus == 0 ? true : false}
                    onBlur={() => setInputFocus(inputFocus + 1)}
                    onFocus={() => setInputFocus(0)}
                />
                <Input
                    label={labelPassword}
                    onChange={setTextPassword}
                    placeholder={placeholderPassword}
                    value={textPassword}
                    icon="password"
                    type="password"
                    hidden={true}
                    inputFocus={inputFocus == 1 ? true : false}
                    onBlur={() => setInputFocus(inputFocus + 1)}
                    onFocus={() => setInputFocus(1)}
                />

                <MyButton text="entrar" event={() => signin()} />

                <Link text="Esqueceu sua senha?" />
                <Link text="Crie sua conta" />

                <Separation />

                <GoogleLogin />
                
            </View>
            <Menu />
        </Pressable>
    )
}