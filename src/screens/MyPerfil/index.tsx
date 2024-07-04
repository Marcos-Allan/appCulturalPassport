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

import instance from "../../utils/axios";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'MyPerfil'>;

export const MyPerfil:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen, userS, toggleUser, toggleLoading, toggleAlert } = states

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
            className={`w-full flex-grow-[1] items-center justify-start ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
            <View className={`w-[90%] flex flex-col items-center justify-start`}>
                
                <View className={`w-[90%] mt-8 justify-center flex flex-row items-center mb-5`}>
                    <Return event={() => navigation.goBack()} />
                    <TitlePage text="meu perfil" />
                    <MenuButton />
                </View>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center'}}
                    style={{ minWidth: '100%', maxHeight: '82%' }}
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
                        <Pressable
                            onPress={() => setImage('https://cultural-passport.vercel.app/avatar-1.jpg')}
                            className={`m-2 w-[90px] h-[90px] flex items-center justify-center rounded-[45px] ${image == "https://cultural-passport.vercel.app/avatar-1.jpg" && `border-[1px] translate-y-[-15px] ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}`}
                        `}>
                            <Image
                                className={`w-[80px] h-[80px] rounded-[40px]`}
                                source={{ uri: 'https://cultural-passport.vercel.app/avatar-1.jpg' }}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => setImage('https://cultural-passport.vercel.app/avatar-2.jpg')}
                            className={`m-2 w-[90px] h-[90px] flex items-center justify-center rounded-[45px] ${image == "https://cultural-passport.vercel.app/avatar-2.jpg" && `border-[1px] translate-y-[-15px] ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}`}
                        `}>
                            <Image
                                className={`w-[80px] h-[80px] rounded-[40px]`}
                                source={{ uri: 'https://cultural-passport.vercel.app/avatar-2.jpg' }}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => setImage('https://cultural-passport.vercel.app/avatar-3.jpg')}
                            className={`m-2 w-[90px] h-[90px] flex items-center justify-center rounded-[45px] ${image == "https://cultural-passport.vercel.app/avatar-3.jpg" && `border-[1px] translate-y-[-15px] ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}`}
                        `}>
                            <Image
                                className={`w-[80px] h-[80px] rounded-[40px]`}
                                source={{ uri: 'https://cultural-passport.vercel.app/avatar-3.jpg' }}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => setImage('https://cultural-passport.vercel.app/avatar-4.jpg')}
                            className={`m-2 w-[90px] h-[90px] flex items-center justify-center rounded-[45px] ${image == "https://cultural-passport.vercel.app/avatar-4.jpg" && `border-[1px] translate-y-[-15px] ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}`}
                        `}>
                            <Image
                                className={`w-[80px] h-[80px] rounded-[40px]`}
                                source={{ uri: 'https://cultural-passport.vercel.app/avatar-4.jpg' }}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => setImage('https://cultural-passport.vercel.app/avatar-5.jpg')}
                            className={`m-2 w-[90px] h-[90px] flex items-center justify-center rounded-[45px] ${image == "https://cultural-passport.vercel.app/avatar-5.jpg" && `border-[1px] translate-y-[-15px] ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}`}
                        `}>
                            <Image
                                className={`w-[80px] h-[80px] rounded-[40px]`}
                                source={{ uri: 'https://cultural-passport.vercel.app/avatar-5.jpg' }}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => setImage('https://cultural-passport.vercel.app/avatar-6.jpg')}
                            className={`m-2 w-[90px] h-[90px] flex items-center justify-center rounded-[45px] ${image == "https://cultural-passport.vercel.app/avatar-6.jpg" && `border-[1px] translate-y-[-15px] ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}`}
                        `}>
                            <Image
                                className={`w-[80px] h-[80px] rounded-[40px]`}
                                source={{ uri: 'https://cultural-passport.vercel.app/avatar-6.jpg' }}
                            />
                        </Pressable>
                    </View> 

                    <View className={`w-full items-center mt-5`}>
                        <MyButton text="atualizar" event={() => updateUser()} />
                    </View>

                    <Text className={`text-[24px] capitalize mt-2 mb-4 ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>informações pessoais</Text>

                    <View className={`mb-3 w-[90%] border-[2px] p-2 rounded-[20px] flex flex-row justify-between items-center ${theme == 'light' ? 'border-my-black' : 'border-my-white'}`}>
                        <Text className={`text-[18px] font-semibold ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Escola: </Text>
                        <Text className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>ETEC Paulistano</Text>
                    </View>
                    
                    <View className={`mb-3 w-[90%] border-[2px] p-2 rounded-[20px] flex flex-row justify-between items-center ${theme == 'light' ? 'border-my-black' : 'border-my-white'}`}>
                        <Text className={`text-[18px] font-semibold ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>RM: </Text>
                        <Text className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>22043</Text>
                    </View>
                    
                    <View className={`mb-3 w-[90%] border-[2px] p-2 rounded-[20px] flex flex-row justify-between items-center ${theme == 'light' ? 'border-my-black' : 'border-my-white'}`}>
                        <Text className={`text-[18px] font-semibold ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Data de Nascimento: </Text>
                        <Text className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>11/06/2006</Text>
                    </View>
                    
                    <View className={`mb-3 w-[90%] border-[2px] p-2 rounded-[20px] flex flex-row justify-between items-center ${theme == 'light' ? 'border-my-black' : 'border-my-white'}`}>
                        <Text className={`text-[18px] font-semibold ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>CPF: </Text>
                        <Text className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>393.223.189-43</Text>
                    </View>
                    
                    
                </ScrollView>
            </View>
            <Menu event={() => navigation.navigate('MyPerfil')} />
        </Pressable>
    )
}