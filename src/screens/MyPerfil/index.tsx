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
import { View, Pressable, Vibration, Keyboard, Image, TextInput, Text, ScrollView, Button, ActivityIndicator, Alert } from "react-native";

//IMPORTAÇÃO DAS BIBLIOTECAS
import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';

//IMPORTAÇÃO DOS ICONES
import { Ionicons } from '@expo/vector-icons';

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

//IMPORTAÇÃO DAS BIBLIOTECAS DO FIREBASE
import { ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../../utils/firebase';

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'MyPerfil'>;

export const MyPerfil:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen, userS, toggleUser, loading, toggleLoading, toggleAlert } = states

    //UTILIZAÇÃO DO HOOK useState
    const [imgs, setImgs] = useState<string[]>([])
    const [progress, setProgress] = useState<number>(0)
    const [imgURL, setImgURL] = useState<string>('')
    const [isArq, setIsArq] = useState<boolean>(false)
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

    //FUNÇÃO RESPONSÁVEL POR LISTAR OS AVATARES
    const fetchImages = async () => {
        //FAZ UMA REFERÊNCIA AO LOCAL DE AVATARES SALVOS NA NUVEM
        const storageRef = ref(storage, '/images/avatars');
        // const storageRef = ref(storage, '/images/icons-achievements');

        try {
            //PEGA AS IMAGENS DENTRO DA PASTA ESPECIFICADA
            const result = await listAll(storageRef);

            //PEGA A URL DOS AVATARES
            const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
            
            //ESPERA TODOS OS AVATARES SEREM 
            const urls = await Promise.all(urlPromises);
            
            console.log(urls)
            
            //SETA AS URLS DAS IMAGENS
            setImgs(urls);
        } catch (error) {
            console.error('Erro ao listar imagens:', error);
        }
    };

    //SISTEMA DE VIBRAÇÃO AO RECEBER MENSAGEM
    const patternessage = [0, 400, 100, 400]
    
    //SISTEMA DE VIBRAÇÃO DE ERRO
    const patternError = [0, 450]

    //PEDE PERMISSÃO PARA USAR A GALERIA
    useEffect(() => {
        (async () => {
            //VÊ SE O USUÁRIO JA LIBEROU O ACESSO A ABRIR A GALERIA DELE
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            //VERIFICA SE O ACESSO FOI LIBERADO OU NÃO
            if (status !== 'granted') {
                //ESCREVE NO CONSOLE QUE O USUÁRIO NÃO IRÁ CONSEGUIR ESCOLHER IMAGEM
                console.log('Desculpe, precisamos de permissão para acessar a galeria para escolher uma imagem!');
            }
        })();
        //EXECUTA A FUNÇÃO ASSIM QUE ELA É LIDA PELO SISTEMA
    }, []);
    
    //FUNÇÃO RESPONSÁVEL POR TROCAR A FOTO DO USUÁRIO AO ELE ESCOLHER A IMAGEM
    const handleFileIMG = async () => {
        try {
            //CONFIGURAÇÃO DA SELEÇÃO DA IMAGEM
            let result:any = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, //DEFINE O TIPO DE ARQUIVO QUE PODERÁ SER SELECIONADO
                allowsEditing: true, //PERMITE EDIÇÃO DE CORTE DENTRO DA IMAGEM
                aspect: [4, 3], //DEFINE O TAMANHO SELECIONÁVEL DA IMAGEM
                quality: 1, //PEGA A QUALIDADE DA IMAGEM ORIGINAL
            });
            
            //VERIFICA SE O USUÁRIO CANCELOU A SELEÇÃO DE IMAGENS OU NÃO
            if (!result.cancelled) {
                //SETA A URL DA IMAGEM PARA MOSTRAR AO USUÁRIO
                setImage(result.assets[0].uri);

                //SETA O ESTADO DE ESTAR USANDO UM ARQUIVO DO USUÁRIO COMO AVATAR COMO true
                setIsArq(true)
            }else {
                //ESCREVE NO CONSOLE QUE O USUÁRIO CANCELOU A SELEÇÃO DE IMAGENS
                console.log('Seleção de imagem cancelada');
            }
        } catch (error) {
            //ESCREVE NO CONSOLE O ERRO OCORRIDO AO TENTAR ABRIR A GALERIA
            console.log('Erro ao selecionar imagem:', error);
        }
    };
    
    //FUNÇÃO RESPONSÁVEL POR SALVAR NO BANCO DE DADOS DO FIREBASE A IMAGEM DO USUÁRIO
    const handleUpload = async () => {
        if (!image) {
            return imgURL; // RETORNA A URL DA IMAGEM SE NÃO TIVER UM ARQUIVO SELECIONADO
        }

        //RETORNA UMA PROMISSE
        return new Promise((resolve, reject) => {
            //CRIA UM NOVO XMLHttpRequest(UMA NOVA REQUISIÇÃO XMLHttp)
            const xhr = new XMLHttpRequest();

            //EXECUTA FUNÇÃO AO CARREGAR A REQUISIÇÃO XMLHttp
            xhr.onload = async function () {
                try {
                    const storageRef = ref(storage, `images/${new Date().getTime()}.jpg`);
                    const uploadTask = uploadBytesResumable(storageRef, xhr.response);

                    uploadTask.on(
                    "state_changed",
                    snapshot => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setProgress(progress);
                    },
                    error => {
                        Alert.alert('Erro no upload', error.message);
                        reject(error);
                    },
                    async () => {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        setImgURL(url);
                        resolve(url);
                    }
                    );
                } catch (error:any) {
                    //DA UM ALERT NA TELA FALANDO QUE DEU PROBLEMA NO UPLOAD DA IMAGEM
                    Alert.alert('Erro no upload', error.message);

                    //RECUSA E ENCERRA A PROMISE
                    reject(error);
                }
            };

            xhr.onerror = function (error:any) {
                //DA UM ALERT NA TELA FALANDO QUE DEU PROBLEMA NO UPLOAD DA IMAGEM
                Alert.alert('Erro no upload', error.message);
                
                //RECUSA E ENCERRA A PROMISE
                reject(error);
            };

            //PEGA A IMAGEM
            xhr.open("GET", image);
            
            //MUDA O TIPO DELA PARA blob
            xhr.responseType = "blob";
            
            //ENVIA A IMAGEM
            xhr.send();
        });
    };
    
    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR OS DADOS DO USUÁRIO
    const updateUser = async () => {
        //TROCA O ESTADO DE LOADING DA APLICAÇÃO COMO true
        toggleLoading(true);

        try {
            //PEGA A IMAGEM QUE O USUÁRIO ESTÁ USANDO
            const imageURL = await handleUpload();

            //FAZ UMA REQUISIÇÃO DO TIPO PUT PARA ATUALIZAR OS DADOS DO USUÁRIO
            const response = await instance.put(`/users/update/${userS.id}`, {
                //PASSA OS PARAMTROS A SEREM ATUALIZADOS
                name: textInput,
                img: imageURL,
            });

            //TROCA O ESTADO DE LOADING DA APLICAÇÃO COMO false
            toggleLoading(false);

            //FORMATA E SEPARA A STRING PARA VER MATÉRIA POR MATÉRIA DO CRONOGRAMA
            const cronogram = response.data.cronogram.split('[')[1].split(']')[0].split(',')

            //ESCREVE NO CONSOLE
            console.log(cronogram)

            //REGISTRA O NOME E A FOTO E O ID DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
            toggleUser(response.data.name, response.data.img, response.data._id, response.data.simulations, response.data.simulationsConcludeds, cronogram)

            //COLOCA UM ALERTA NA TELA
            toggleAlert(`success`, `Alteração feita com sucesso`, true, 5000);

            //SETA A IMAGEM DA URL DO ARQUIVO SELEIONADO COMO VAZIO
            setImgURL('');

            //RESETA O STATE DE PROGRESSO
            setProgress(0);

            //SETA O ESTADO DE ESTAR USANDO UM ARQUIVO DO USUÁRIO COMO AVATAR COMO true
            setIsArq(false)
        } catch (error) {
            //ESCREVE NO CONSOLE O ERRO OCORRIDO
            console.log(`Requisição feita com falhas ${error}`);

            //TROCA O ESTADO DE LOADING DA APLICAÇÃO COMO false
            toggleLoading(false);

            //COLOCA UM ALERTA NA TELA
            toggleAlert(`error`, `Ocorreu um erro interno no servidor`, true, 5000);
        }
    };

    //FUNÇÃO CHAMADA TODA VEZ QUE CARREGA A PÁGINA
    useEffect(() => {
        closeMenu()
    },[])

    //FUNÇÃO CHAMADA TODA VEZ QUE CARREGA A PÁGINA
    useEffect(() => {
        //CHAMA A FUNÇÃO QUE LISTA TODOS OS AVATARES/
        fetchImages()
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

                    <Pressable className={`w-[90%] flex flex-row justify-between items-center`} onPress={handleFileIMG}>
                        <View className={`flex items-center justify-center border-[1px] rounded-[30px] p-[6px]
                        ${isArq == true ? 'border-[#00ff00]' : `${theme == 'light' ? 'border-my-gray-' : 'border-my-gray-black'}`}
                        `}>
                            <Ionicons
                                name='image'
                                size={40}
                                color={`${isArq == true ? '#00ff00' : `${theme == 'light' ? '#818181' : '#C0C0C0'}`}`}
                            />
                        </View>

                        <Text className={`${isArq == true ? 'text-[#00ff00]' : `${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}`}>Nenhuma imagem selecionada</Text>

                        <Text className={`${progress == 100 ? 'text-[#00ff00]' : `${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}`}>{String(progress)}%</Text>
                    </Pressable>
                    
                    <Text className={`text-[24px] capitalize my-2 ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>avatares</Text>

                    <View className={`w-[90%] flex flex-row flex-wrap justify-center items-center`}>
                        <AvatarCard activo={image == imgs[1] ? true : false} image={imgs[0]} event={() => setImage(imgs[0])} />
                        <AvatarCard activo={image == imgs[1] ? true : false} image={imgs[1]} event={() => setImage(imgs[1])} />
                        <AvatarCard activo={image == imgs[2] ? true : false} image={imgs[2]} event={() => setImage(imgs[2])} />
                        <AvatarCard activo={image == imgs[3] ? true : false} image={imgs[3]} event={() => setImage(imgs[3])} />
                        <AvatarCard activo={image == imgs[4] ? true : false} image={imgs[4]} event={() => setImage(imgs[4])} />
                        <AvatarCard activo={image == imgs[5] ? true : false} image={imgs[5]} event={() => setImage(imgs[5])} />
                        <AvatarCard activo={image == imgs[6] ? true : false} image={imgs[6]} event={() => setImage(imgs[6])} />
                        <AvatarCard activo={image == imgs[7] ? true : false} image={imgs[7]} event={() => setImage(imgs[7])} />
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
                eventN={() => navigation.navigate('Notifications')}
            />
            <Menu event={() => navigation.navigate('MyPerfil')} />
        </Pressable>
    )
}