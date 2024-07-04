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
import instance from "../../utils/axios";
import MyText from "../../Components/MyText";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'SwitchPassword'>;

export const SwitchPassword:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen, userS, toggleLoading, toggleAlert } = states

    //UTILIZAÇÃO DO HOOK useState
    const [textPassword, setTextPassword] = useState<string>('')
    const [placeholderPassword, setPlaceholderPassword] = useState<string>('Digite a nova senha')
    const [labelPassword, setLabelPassword] = useState<string>('senha')
    const [textConfirmPassword, setTextConfirmPassword] = useState<string>('')
    const [labelConfirmPassword, setLabelConfirmPassword] = useState<string>('confirme a senha')
    const [placeholderConfirmPassword, setPlaceholderConfirmPassword] = useState<string>('Confirme a senha')
    const [stateConfirmPassword, setStateConfirmPassword] = useState<boolean | string>('neutro')

    //ESTADOS DOS INPUTS
    const [statePassword, setStatePassword] = useState<boolean | string>('neutro')
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
    function handleInputPassword(text:string){
        //SETA O TESTA DO INPUT COM O VALOR RECEBIDO POR PARÂMETRO
        setTextPassword(text)
        
        //VERIFICA SE O EMAIL TEM PELO MENOS 16 CARACTERES
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

    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR A SENHA DO USUÁRIO
    function updateUser() {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)
        
        //FAZ UMA REQUISIÇÃO DO TIPO put PARA ATUALIZAR OS DADOS DO USUÁRIO
        instance.put(`/users/update/${userS.id}`, {
            password: textPassword
        }).then((response) => {
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
            
            //MOSTRA OS DADOS DA REQUISIÇÃO
            console.log(response.data)

            //COLOCA ALERT NA TELA
            toggleAlert(`success`, `Senha alterada com sucesso`)

            //REDIRECIONA O USUÁRIO PARA A PRÓXIMA PÁGINA
            navigation.navigate('SignIn')
        }).catch((error) => {
            //ESCREVE NO CONSOLE O ERRO OCORRIDO
            console.log(`Requisição feita com falhas ${error}`)
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
            
            //FAZ O CELULAR VIBRAR DE ACORDO COM O PADRÃO FORNECIDO
            Vibration.vibrate(patternError)

            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `Ocorreu um erro interno no servidor`)
        })
    }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA OU QUANDO HAVER MUDANÇAS NOS ESTADOS
    useEffect(() => {
        //VERIFICA SE OS ESTADOS DOS INPUTS ESTÃO CERTOS
        if(statePassword == true && stateConfirmPassword == true){
            setFormValidate(true)
        }else{
            setFormValidate(false)
        }
    },[statePassword, stateConfirmPassword]) 

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

                <View className="mb-8">
                    <MyText text="Digite a nova senha" />
                </View>

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

                <View className={`w-full flex items-center mt-4`}>
                    <MyButton text="trocar" event={() => updateUser()} disabled={formValidate} />
                </View>
    
            </View>
            <Menu event={() => navigation.navigate('MyPerfil')} />
        </Pressable>
    )
}