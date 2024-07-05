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
import { View, Pressable, Vibration, Keyboard, Image, TextInput, Text, ScrollView } from "react-native";

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
import BottomNavigation from "../../Components/BottomNavigation";
import AvatarCard from "../../Components/AvatarCard";
import InfoStudentCard from "../../Components/InfoStudentCard";

//IMPORTAÇÃO DA CONFIGURAÇÃO BASE DO AXIOS
import instance from "../../utils/axios";


//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'MyPerfil'>;

export const MyPerfil:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen, userS, toggleUser, toggleLoading, toggleAlert } = states

    //UTILIZAÇÃO DO HOOK useState
    const [image, setImage] = useState<string>(userS.img)
    const [textInput, setTextInput] = useState<string>(userS.name)

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

    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR OS DADOS DO USUÁRIO
    function updateUser() {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)
        
        //FAZ UMA REQUISIÇÃO DO TIPO put PARA ATUALIZAR OS DADOS DO USUÁRIO
        instance.put(`/users/update/${userS.id}`, {
            name: textInput,
            img: image,
        }).then((response) => {
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
            
            //MOSTRA OS DADOS DA REQUISIÇÃO
            console.log(response.data)

            //REGISTRA O NOME E A FOTO E O ID DO DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
            toggleUser(response.data.name, response.data.img, response.data._id)

            //COLOCA ALERT NA TELA
            toggleAlert(`success`, `Alteração feita com sucesso`, true, 5000)
        }).catch((error) => {
            //ESCREVE NO CONSOLE O ERRO OCORRIDO
            console.log(`Requisição feita com falhas ${error}`)
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
            
            //FAZ O CELULAR VIBRAR DE ACORDO COM O PADRÃO FORNECIDO
            Vibration.vibrate(patternError)

            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `Ocorreu um erro interno no servidor`, true, 5000)
        })
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE CARREGA A PÁGINA
    useEffect(() => {
        closeMenu()
    },[])

    return(
        <Pressable
            onPress={closeMenu}
            className={`w-full flex-grow-[1] flex-cols items-center justify-start ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
            <View className={`w-[90%] flex flex-col items-center justify-start`}>
                
                <View className={`w-[90%] mt-8 justify-center flex flex-row items-center mb-5`}>
                    <Return event={() => navigation.goBack()} />
                    <TitlePage text="meu perfil" />
                    <MenuButton />
                </View>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center'}}
                    style={{ minWidth: '100%', maxHeight: '83.42%' }}
                >
                    <View className={`w-[90%] flex flex-row items-center`}>
                        <View className={`m-2 w-[100px] h-[100px] rounded-[50px] flex items-center justify-center border-[1px] p-1 ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}`}>
                            <Image
                                className={`w-[90px] h-[90px] rounded-[45px]`}
                                source={{ uri: image }}
                            />
                        </View>

                        <TextInput
                            cursorColor={`${theme == 'light' ? '#000000' : '#ffffff'}`}
                            placeholderTextColor={`${theme == 'light' ? '#000000' : '#ffffff'}`}
                            className={`
                                border-[1px]
                                outline-none
                                py-1 pl-[14px]
                                rounded-[16px]
                                text-[16px]
                                flex-grow-[1]
                                ${theme == 'light'
                                ? 'border-my-secondary text-my-black placeholder:text-my-black'
                                : 'border-my-quartenary text-my-white placeholder:text-my-white'
                                }
                            `}
                            onChangeText={setTextInput}
                            placeholder='Digite seu nome'
                            value={textInput}
                        />
                    </View>
                    
                    <Text className={`text-[24px] capitalize my-2 ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>avatares</Text>

                    <View className={`w-[90%] flex flex-row flex-wrap justify-center items-center`}>
                        <AvatarCard
                            activo={image == "https://cultural-passport.vercel.app/avatar-1.jpg" ? true : false}
                            event={() => setImage('https://cultural-passport.vercel.app/avatar-1.jpg')}
                            image="https://cultural-passport.vercel.app/avatar-1.jpg"
                        />
                        <AvatarCard
                            activo={image == "https://cultural-passport.vercel.app/avatar-2.jpg" ? true : false}
                            event={() => setImage('https://cultural-passport.vercel.app/avatar-2.jpg')}
                            image="https://cultural-passport.vercel.app/avatar-2.jpg"
                        />
                        <AvatarCard
                            activo={image == "https://cultural-passport.vercel.app/avatar-3.jpg" ? true : false}
                            event={() => setImage('https://cultural-passport.vercel.app/avatar-3.jpg')}
                            image="https://cultural-passport.vercel.app/avatar-3.jpg"
                        />
                        <AvatarCard
                            activo={image == "https://cultural-passport.vercel.app/avatar-4.jpg" ? true : false}
                            event={() => setImage('https://cultural-passport.vercel.app/avatar-4.jpg')}
                            image="https://cultural-passport.vercel.app/avatar-4.jpg"
                        />
                        <AvatarCard
                            activo={image == "https://cultural-passport.vercel.app/avatar-5.jpg" ? true : false}
                            event={() => setImage('https://cultural-passport.vercel.app/avatar-5.jpg')}
                            image="https://cultural-passport.vercel.app/avatar-5.jpg"
                        />
                        <AvatarCard
                            activo={image == "https://cultural-passport.vercel.app/avatar-6.jpg" ? true : false}
                            event={() => setImage('https://cultural-passport.vercel.app/avatar-6.jpg')}
                            image="https://cultural-passport.vercel.app/avatar-6.jpg"
                        />
                        
                    </View> 

                    <View className={`w-full items-center mt-5`}>
                        <MyButton text="atualizar" event={() => updateUser()} />
                    </View>

                    <Text className={`text-[24px] capitalize mt-2 mb-4 ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>informações pessoais</Text>

                    <InfoStudentCard title="Escola" value="ETEC Paulistano" />
                    <InfoStudentCard title="RM" value="22043" />
                    <InfoStudentCard title="Data de Nascimento" value="11/06/2006" />
                    <InfoStudentCard title="CPF" value="393.223.189-43" />
                    
                </ScrollView>
            </View>
            <BottomNavigation
                route="perfil"
                eventH={() => navigation.navigate('Materias')}
                eventMP={() => navigation.navigate('MyPerfil')}
                eventE={() => navigation.navigate('Exercises')}
                eventA={() => navigation.navigate('Achievements')}
            />
            <Menu event={() => navigation.navigate('MyPerfil')} />
        </Pressable>
    )
}