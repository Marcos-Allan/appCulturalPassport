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
import { View, Pressable, ScrollView, Text } from "react-native";

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from "react";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DA PÁGINA
import { StackScreenProps } from '@react-navigation/stack';

//LISTA DOS PARAMETROS DA PÁGINA
import { RootStackParamList } from '../../../App';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

//IMPORTAÇÃO DOS COMPONENTES
import Menu from "../../Components/Menu";
import TitlePage from "../../Components/TitlePage";
import MenuButton from "../../Components/MenuButton";
import Return from "../../Components/Return";
import BottomNavigation from "../../Components/BottomNavigation";
import ContentCard from "../../Components/ContentCard";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'Matter'>;

export const Matter:React.FC<Props> = ({ navigation, route }) => {

    //PEGA OS PARAMETROS PASSADOS PARA A PÁGINA
    const { matterName } = route.params

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen } = states

    //UTILIZAÇÃO DO HOOK useState
    const [content, setContent] = useState<any[]>([])
    const [loadingContent, setLoadingContent] = useState<boolean>(false)

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

    //FUNÇÃO PARA REDIRECIONAR PARA OUTRA PÁGINA
    function redirect(vest:string){

        //FORMATA O CAMPO PARA DEIXAR APENAS AS INICIAIS DO VESTIBULAR
        // const vestibular = vest.split(' ')[0].toLowerCase()

        //NAVEGA PARA A PRÓXIMA PÁGINA
        // navigate(`/materias/${matter}/${vestibular}`)

        console.log('uiii')
    }

    //FUNÇÃO RESPONSÁVEL POR DEIXAR O TEXTO EM CAPITALIZE
    function capitalizeText(text:string) {
        if (text.length === 0) return text; // Retorna a string original se estiver vazia
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    //FUNÇÃO RESPONSÁVEL POR LISTAR OS CONTEUDOS DISPONIVEIS
    function getContent(){
        //MUDA O ESTADO DE CARREGAMENTO DOS CONTEUDOS PARA true
        setLoadingContent(true)

        instance.get(`/matter/${matterName}`)
        .then(function (response) {
            console.log(response.data)

            //MUDA O ESTADO DE CARREGAMENTO DAS MATÉRIAS PARA false
            setLoadingContent(false)
            
            //LIMPA O ARRAY DE CONTEUDO DAS MATÉRIAS
            setContent([])

            //COLOCA AS MATÉRIAS CADASTRADAS NO BD NO ARRAY DE MATÉRIAS
            response.data.contents.map((content:any, i:number) => {
                setContent((cont:any) => [...cont, {
                    title: content.text,
                    background: i
                }])
            })
        })
        .catch(function (error) {
            console.log(error)
            //MUDA O ESTADO DE CARREGAMENTO DAS MATÉRIAS PARA false
            setLoadingContent(false)
        })
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE CARREGA A PÁGINA
    useEffect(() => {
        //DEFINE O ARRAY COM OS CONTEUDOS
        getContent()
    },[])

    return(
        <Pressable
            onPress={closeMenu}
            className={`w-full flex-grow-[1] flex-cols items-center justify-start ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
            <View className={`w-[90%] flex flex-col items-center justify-start`}>
                
                <View className={`w-[90%] mt-8 justify-center flex flex-row items-center mb-5`}>
                    <Return event={() => navigation.goBack()} />
                    <TitlePage text={`${matterName}`} />
                    <MenuButton />
                </View>

                <Text className={` mb-[20px] text-center text-[16px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Conteudos de {matterName} que mais caem no ENEM</Text>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}
                    style={{ minWidth: '100%', maxHeight: '75%' }}
                >
                    <View className={`w-[100%] flex flex-col items-center justify-start`}>
                        {content.map((cont, i) => (
                            <ContentCard
                                background={cont.background}
                                title={cont.title}
                                key={i}
                            />
                        ))}

                        {loadingContent == true && (
                            <Text className={`w-full text-center text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>estamos carregando as matérias seja paciente</Text>
                        )}
                        
                        <Pressable 
                            onPress={() => navigation.navigate('Test', { matterName: matterName })}
                            className={`
                                ml-auto w-auto border-[1px] p-3 rounded-[20px] bg-transparent mb-2
                                ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white'}
                            `}
                        >
                                <Text
                                    className={`${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white'}
                                `}>Fazer Prova</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
            <BottomNavigation
                route="home"
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