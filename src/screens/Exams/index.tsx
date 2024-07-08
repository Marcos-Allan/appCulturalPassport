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

//IMPORTAÇÃO DOS COMPONENTES
import Menu from "../../Components/Menu";
import TitlePage from "../../Components/TitlePage";
import MenuButton from "../../Components/MenuButton";
import Return from "../../Components/Return";
import BottomNavigation from "../../Components/BottomNavigation";
import ContentCard from "../../Components/ContentCard";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'Exams'>;

export const Exams:React.FC<Props> = ({ navigation, route }) => {

    //PEGA OS PARAMETROS PASSADOS PARA A PÁGINA
    const { matterName } = route.params

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen } = states

    //UTILIZAÇÃO DO HOOK useState
    const [content, setContent] = useState<any[]>([])

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

    //FUNÇÃO CHAMADA TODA VEZ QUE CARREGA A PÁGINA
    useEffect(() => {
        //DEFINE O ARRAY COM OS CONTEUDOS
        setContent([
            { title: 'Enem (Exame Nacional do Ensino Médio)', background: 0 },
            { title: 'Fuvest (Fundação Universitária para o vestibular)', background: 1 },
            { title: 'UFPA (Universidade Federal do Pará)', background: 2 },
            { title: 'Unesp (Universidade Estadual Paulista)', background: 3 },
            { title: 'UEPA (Universidade Estadual do Pará)', background: 4 },
            { title: 'UERJ (Universidade Estadual do Rio de Janeiro)', background: 5 },
            { title: 'Unicamp (Universidade Estadual de Campinas)', background: 6 },
            { title: 'UFPR (Universidade Federal do Paraná)', background: 7 }
        ])
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

                <Text className={` mb-[20px] text-center text-[16px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Escolha um vestibular de sua preferência</Text>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}
                    style={{ minWidth: '100%', maxHeight: '77.7%' }}
                >
                    <View className={`w-[100%] flex flex-col items-center justify-start`}>
                        {content.map((cont, i) => (
                            <ContentCard
                                background={cont.background}
                                title={cont.title}
                                event={() => navigation.navigate('Matter', { matterName: matterName, examName: cont.title.split(' ')[0] })}
                                key={i} />
                        ))}
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