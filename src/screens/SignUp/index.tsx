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
import { View, Pressable, Vibration, Keyboard, ScrollView } from "react-native";

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
type Props = StackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUp:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen, userS, toggleUser, toggleLoading, toggleAlert } = states

    //UTILIZAÇÃO DO HOOK useState
    const [textName, setTextName] = useState<string>('')
    const [textLastName, setTextLastName] = useState<string>('')
    const [textDataNasc, setTextDataNasc] = useState<string>('')
    const [textEmail, setTextEmail] = useState<string>('')
    const [textPassword, setTextPassword] = useState<string>('')
    const [textConfirmPassword, setTextConfirmPassword] = useState<string>('')

    const [labelName, setLabelName] = useState<string>('nome')
    const [labelLastName, setLabelLastName] = useState<string>('sobrenome')
    const [labelDataNasc, setLabelDataNasc] = useState<string>('11/06/2006')
    const [labelEmail, setLabelEmail] = useState<string>('email')
    const [labelPassword, setLabelPassword] = useState<string>('senha')
    const [labelConfirmPassword, setLabelConfirmPassword] = useState<string>('confirme a senha')

    const [placeholderName, setPlaceholderName] = useState<string>('Digite seu nome ou nickname')
    const [placeholderLastName, setPlaceholderLastName] = useState<string>('Digite seu sobrenome')
    const [placeholderDataNasc, setPlaceholderDataNasc] = useState<string>('Digite sua data de nascimento')
    const [placeholderEmail, setPlaceholderEmail] = useState<string>('Digite seu email')
    const [placeholderPassword, setPlaceholderPassword] = useState<string>('Digite sua senha')
    const [placeholderConfirmPassword, setPlaceholderConfirmPassword] = useState<string>('Confirme a senha')

    //ESTADOS DOS INPUTS
    const [stateName, setStateName] = useState<boolean | string>('neutro')
    const [stateLastName, setStateLastName] = useState<boolean | string>('neutro')
    const [stateDataNasc, setStateDataNasc] = useState<boolean | string>('neutro')
    const [stateEmail, setStateEmail] = useState<boolean | string>('neutro')
    const [statePassword, setStatePassword] = useState<boolean | string>('neutro')
    const [stateConfirmPassword, setStateConfirmPassword] = useState<boolean | string>('neutro')

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
    function handleInputName(text:string){
        //SETA O TESTA DO INPUT COM O VALOR RECEBIDO POR PARÂMETRO
        setTextName(text)
        
        //VERIFICA SE O INPUR TEM PELO MENOS 16 CARACTERES
        if(textName.length >= 4){
            //TESTA O INPUT COM REGEX
            validateInputName()
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR PEGAR O TEXTO DIGITADO DO INPUT
    function handleInputLastName(text:string){
        //SETA O TESTA DO INPUT COM O VALOR RECEBIDO POR PARÂMETRO
        setTextLastName(text)
        
        //VERIFICA SE O INPUT TEM PELO MENOS 16 CARACTERES
        if(textLastName.length >= 4){
            //TESTA O INPUT COM REGEX
            validateInputLastName()
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR PEGAR O TEXTO DIGITADO DO INPUT
    function handleInputDataNasc(text:string){
        //SETA O TESTA DO INPUT COM O VALOR RECEBIDO POR PARÂMETRO
        setTextDataNasc(text)
        
        //VERIFICA SE O INPUT TEM PELO MENOS 16 CARACTERES
        if(textDataNasc.length >= 4){
            //TESTA O INPUT COM REGEX
            validateInputDataNasc()
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR PEGAR O TEXTO DIGITADO DO INPUT
    function handleInputEmail(text:string){
        //SETA O TESTA DO INPUT COM O VALOR RECEBIDO POR PARÂMETRO
        setTextEmail(text)
        
        //VERIFICA SE O INPUT TEM PELO MENOS 16 CARACTERES
        if(textEmail.length >= 16){
            //TESTA O INPUT COM REGEX
            validateInputEmail()
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR PEGAR O TEXTO DIGITADO DO INPUT
    function handleInputPassword(text:string){
        //SETA O TESTA DO INPUT COM O VALOR RECEBIDO POR PARÂMETRO
        setTextPassword(text)
        
        //VERIFICA SE O INPUT TEM PELO MENOS 16 CARACTERES
        if(textPassword.length >= 5){
            //TESTA O INPUT COM REGEX
            validateInputPassword()
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR PEGAR O TEXTO DIGITADO DO INPUT
    function handleInputConfirmPassword(text:string){
        //SETA O TESTA DO INPUT COM O VALOR RECEBIDO POR PARÂMETRO
        setTextConfirmPassword(text)
        
        //VERIFICA SE O INPUT TEM PELO MENOS 16 CARACTERES
        if(textConfirmPassword.length >= 5){
            //TESTA O INPUT COM REGEX
            validateInputConfirmPassword()
        }
    }

    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputName(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoName = /^[A-Za-z' -]{1,50}$/
        
        //VERIFICA SE O INPUT ESTÁ DENTRO DO PADRÃO DO REGEX
        if(padraoName.test(textName) == true){
            setStateName(true)
        }else if(textName.length == 0){
            setStateName('neutro')
        }else{
            setStateName(false)
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputLastName(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoLastName = /^[A-Za-z' -]{1,50}$/
        
        //VERIFICA SE O INPUT ESTÁ DENTRO DO PADRÃO DO REGEX
        if(padraoLastName.test(textLastName) == true){
            setStateLastName(true)
        }else if(textLastName.length == 0){
            setStateLastName('neutro')
        }else{
            setStateLastName(false)
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputDataNasc(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoDataNasc = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{1}$/
        
        //VERIFICA SE O INPUT ESTÁ DENTRO DO PADRÃO DO REGEX
        if(padraoDataNasc.test(textDataNasc) == true){
            setStateDataNasc(true)
        }else if(textDataNasc.length == 0){
            setStateDataNasc('neutro')
        }else{
            setStateDataNasc(false)
        }
    }

    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputEmail(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoEmail = /^[\w._-]+@[\w._-]+\.[\w]{2,}/i
        
        //VERIFICA SE O INPUT ESTÁ DENTRO DO PADRÃO DO REGEX
        if(padraoEmail.test(textEmail) == true){
            setStateEmail(true)
        }else if(textEmail.length == 0){
            setStateEmail('neutro')
        }else{
            setStateEmail(false)
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputPassword(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoPassword = /^[\w._-]{6,10}$/i

        //VERIFICA SE O INPUT ESTÁ DENTRO DO PADRÃO DO REGEX
        if(padraoPassword.test(textPassword) == true){
            setStatePassword(true)
        }else if(textPassword.length == 0){
            setStatePassword('neutro')
        }else{
            setStatePassword(false)
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputConfirmPassword(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoConfirmPassword = new RegExp(`\^${textPassword.slice(0, -1)}$`)

        //VERIFICA SE O INPUT ESTÁ DENTRO DO PADRÃO DO REGEX
        if(padraoConfirmPassword.test(textConfirmPassword) == true){
            setStateConfirmPassword(true)
        }else if(textConfirmPassword.length == 0){
            setStateConfirmPassword('neutro')
        }else{
            setStateConfirmPassword(false)
        }
    }

    //FUNÇÃO RESPONSÁVEL POR CRAIR CONTA NO BANCO DE DADOS
    function signup(){
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        //FAZ UMA REQUISIÇÃO POST PARA O BACKEND DA APLICAÇÃO
        instance.post('/signup', {
            //MANDA OS DADOS PARA O BACKEND JUNTO COM A REQUISIÇÃO
            name: textName,
            email: textEmail,
            password: textPassword
        })
        .then(function (response) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR BEM SUCEDIDA
            
            //MOSTRA A RESPOSTA DA REQUISIÇÃO NO CONSOLE DO BROWSER
            console.log(response.data)
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)

            //MUDA O ESTILO DO INPUT PARA PADRÃO
            setStateName('neutro')
            setStateLastName('neutro')
            setStateDataNasc('neutro')
            setStateEmail('neutro')
            setStatePassword('neutro')
            setStateConfirmPassword('neutro')

            //MUDA O VALOR DO INPUT PARA VAZIO
            setTextName('')
            setTextLastName('')
            setTextDataNasc('')
            setTextEmail('')
            setTextPassword('')
            setTextConfirmPassword('')
            
            //TRATAMENTO CASO A CONTA JA EXISTA NO BANCO DE DADOS
            if(response.data == 'Usuário já cadastrado com esse email'){
                //COLOCA ALERT NA TELA
                toggleAlert('error', 'A conta ja existe', true, 5000)

                //FAZ O CELULAR VIBRAR DE ACORDO COM O PADRÃO FORNECIDO
                Vibration.vibrate(patternError)

                //LEVA O USUÁRIO A TELA DE LOGIN
                navigation.navigate('SignIn')
            }else{
                //COLOCA ALERT NA TELA
                toggleAlert('success', 'Conta criada com sucesso', true, 5000)

                //LEVA O USUÁRIO A TELA DE LOGIN
                navigation.navigate('SignIn')
            }
            
        })
        .catch(function (error) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR MAL SUCEDIDA
            console.log('ocorreu algum erro: ', error)

            //COLOCA ALERT NA TELA
            toggleAlert('error', 'erro de servidor', true, 5000)

            //FAZ O CELULAR VIBRAR DE ACORDO COM O PADRÃO FORNECIDO
            Vibration.vibrate(patternError)
        })
    }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA OU QUANDO HAVER MUDANÇAS NOS ESTADOS
    useEffect(() => {
        //VERIFICA SE OS ESTADOS DOS INPUTS ESTÃO CERTOS
        if(stateName == true && stateLastName == true && stateDataNasc == true && stateEmail == true && statePassword == true && stateConfirmPassword == true){
            setFormValidate(true)
        }else{
            setFormValidate(false)
        }
    },[stateName, stateLastName, stateDataNasc, stateEmail, statePassword, stateConfirmPassword]) 

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
                    <TitlePage text="cadastrar" />
                    <MenuButton />
                </View>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center'}}
                    style={{ minWidth: '100%', maxHeight: '70%' }}
                >
                    <View className="w-full justify-center items-center h-full">
                    <Input
                        label={labelName}
                        onChange={handleInputName}
                        placeholder={placeholderName}
                        value={textName}
                        icon="person"
                        type="text"
                        state={stateName}
                        textError="quantidade de caracteres insuficiente"
                        textSuccess="nome aceito"
                    />
                    <Input
                        label={labelLastName}
                        onChange={handleInputLastName}
                        placeholder={placeholderLastName}
                        value={textLastName}
                        icon="person"
                        type="text"
                        state={stateLastName}
                        textError="quantidade de caracteres insuficiente"
                        textSuccess="sobrenome aceito"
                    />
                    <Input
                        label={labelDataNasc}
                        onChange={handleInputDataNasc}
                        placeholder={placeholderDataNasc}
                        value={textDataNasc}
                        icon="person"
                        type="text"
                        state={stateDataNasc}
                        textError="data de nascimento inválida"
                        textSuccess="data válida"
                    />
                    <Input
                        label={labelEmail}
                        onChange={handleInputEmail}
                        placeholder={placeholderEmail}
                        value={textEmail}
                        icon="email"
                        type="email"
                        state={stateEmail}
                        textError="email não encontrado ou fora do padrão"
                        textSuccess="email dentro do padrão"
                    />
                    <Input
                        label={labelPassword}
                        onChange={handleInputPassword}
                        placeholder={placeholderPassword}
                        value={textPassword}
                        icon="password"
                        type="password"
                        hidden={true}
                        state={statePassword}
                        textError="senha incorreta ou fora do padrão"
                        textSuccess="senha dentro do padrão"
                    />
                    <Input
                        label={labelConfirmPassword}
                        onChange={handleInputConfirmPassword}
                        placeholder={placeholderConfirmPassword}
                        value={textConfirmPassword}
                        icon="password"
                        type="password"
                        hidden={true}
                        state={stateConfirmPassword}
                        textError="as senhas não são iguais"
                        textSuccess="as senha são idênticas"
                    />

                    </View>
                </ScrollView>
                
                <MyButton text="entrar" disabled={formValidate} event={() => signup()}/>

                <Link text="Esqueceu sua senha?" event={() => navigation.navigate('Home')}/>

            </View>
            <Menu />
        </Pressable>
    )
}