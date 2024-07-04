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
import { View, Pressable, Vibration, Keyboard } from "react-native";

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
import MyText from "../../Components/MyText";

//IMPORTAÇÃO DA CONFIGURAÇÃO BASE DO AXIOS
import instance from "../../utils/axios";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'ConfirmCode'>;

export const ConfirmCode:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen, toggleLoading, toggleAlert } = states

    //UTILIZAÇÃO DO HOOK useState
    const [textCode, setTextCode] = useState<string>('')
    const [placeholderCode, setPlaceholderCode] = useState<string>('Digite o código')
    const [labelCode, setLabelCode] = useState<string>('código')

    //ESTADOS DOS INPUTS
    const [stateCode, setStateCode] = useState<boolean | string>('neutro')
    const [formValidate, setFormValidate] = useState<boolean>(false)

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

    //FUNÇÃO RESPONSÁVEL POR PEGAR O TEXTO DIGITADO DO INPUT
    function handleInputCode(text:string){
        //SETA O TESTA DO INPUT COM O VALOR RECEBIDO POR PARÂMETRO
        setTextCode(text)
        
        //VERIFICA SE O EMAIL TEM PELO MENOS 16 CARACTERES
        if(textCode.length >= 2){
            //TESTA O INPUT COM REGEX
            validateInputCode()
        }
    }

    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputCode(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoCode = /^\d{3}-\d{2}/
        
        //VERIFICA SE O INPUT ESTÁ DENTRO DO PADRÃO DO REGEX
        if(padraoCode.test(textCode) == true){
            setStateCode(true)
        }else if(textCode.length == 0){
            setStateCode('neutro')
        }else{
            setStateCode(false)
        }
    }

    //FUNÇÃO RESPONSÁVEL POR ENVIAR CÓDIGO PARA O EMAIL DO USUÁRIO
    function verifyCode() {

        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        instance.get(`/verifycode/${textCode}`)
        .then(function (response) {
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)

            //ESCREVE NO CONSOLE DO SITE 
            console.log(response.data)

            //VERIFICA SE A CONTA EXISTE NO BANCO DE DADOS
            if(response.data == "Código de verificação errado"){
                //COLOCA ALERT NA TELA
                toggleAlert(`error`, `Código Inválido`, true, 5000)

                //FAZ O CELULAR VIBRAR DE ACORDO COM O PADRÃO FORNECIDO
                Vibration.vibrate(patternError)
            }else if(response.data == "Código de verificação correto"){
                //COLOCA ALERT NA TELA
                toggleAlert(`success`, `Autenticação bem-sucedida`, true, 5000)
                //REDIRECIONA O USUÁRIO PARA A PRÓXIMA PÁGINA
                navigation.navigate('SwitchPassword')
            }

        })
        .catch(function (error) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR MAL SUCEDIDA
            console.log('ocorreu algum erro: ', error);

            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `lamentamos, erro interno no servidor`)
            
            //FAZ O CELULAR VIBRAR DE ACORDO COM O PADRÃO FORNECIDO
            Vibration.vibrate(patternError)

            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
        })
    }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA OU QUANDO HAVER MUDANÇAS NOS ESTADOS
    useEffect(() => {
        //VERIFICA SE OS ESTADOS DOS INPUTS ESTÃO CERTOS
        if(stateCode == true){
            setFormValidate(true)
        }else{
            setFormValidate(false)
        }
    },[stateCode]) 

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
                    <TitlePage text="confirm o código" />
                    <MenuButton />
                </View>

                <View className="mb-8">
                    <MyText text="Digite o código que foi enviado por email" />
                </View>

                <Input
                    label={labelCode}
                    onChange={handleInputCode}
                    placeholder={placeholderCode}
                    value={textCode}
                    icon="code"
                    type="email"
                    state={stateCode}
                    textError="código inválido"
                    textSuccess="código dentro do padrão"
                />

                <View className="mb-8">
                    <MyText text="enviaremos um código para o endereço de email digitado" />
                </View >

                <MyButton text="enviar" event={() => verifyCode()} disabled={formValidate} />
                
            </View>
            <Menu event={() => navigation.navigate('MyPerfil')} />
        </Pressable>
    )
}