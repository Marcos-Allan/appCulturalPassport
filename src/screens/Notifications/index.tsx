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
import { View, Pressable, Text, ScrollView } from "react-native";

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from "react";

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
import TitlePage from "../../Components/TitlePage";
import MenuButton from "../../Components/MenuButton";
import Return from "../../Components/Return";
import BottomNavigation from "../../Components/BottomNavigation";
import NotificationCard from "../../Components/NotificationCard";
import MyText from "../../Components/MyText";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'Notifications'>;

export const Notifications:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen } = states

    //UTILIZA O HOOK DO useState
    const [notification, setNotification] = useState<any[]>([])

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

    //FUNÇÃO RESPONSÁVEL POR REMOVER A NOTIFICAÇÃO DA TELA
    function removeNotify(itemRemoved : { materia: string, content: string, isClosed: boolean }) {
        //VÊ QUAL ITEM VAI SER REMOVIDO E ADICIONA A ANIMAÇÃO DE REMOÇÃO
        const updatedArr = notification.map((not) => 
            not.content === itemRemoved.content ? { ...not, isClosed: true } : not
        )

        //ATUALIZA A LISTA DE NOTIFICAÇÕES COM AS MODIFICAÇÕES
        setNotification(updatedArr)

        //FUNÇÃO CHAMADA DEPOIS DE .4 SEGUNDOS
        setTimeout(() => {
            //REMOVE A NOTIFICAÇÃO DO ARRAY
            setNotification((nots) =>
            nots.filter(item => item.content !== itemRemoved.content))
        }, 400);
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE CARREGA A PÁGINA
    useEffect(() => {
        //DEFINE O ARRAY COM AS NOTIFICAÇÕES
        setNotification([
            { materia: 'quimica', content: 'aprender a fazer sal', isClosed: false},
            { materia: 'matemática', content: 'porcentagem', isClosed: false},
            { materia: 'português', content: 'verbos', isClosed: false},
            { materia: 'filosofia', content: 'sócrates', isClosed: false},
            { materia: 'sociologia', content: 'socialismo x comunismo', isClosed: false},
            { materia: 'biologia', content: 'oviviparo', isClosed: false},
            { materia: 'quimica', content: 'química orgânica', isClosed: false},
            { materia: 'geografia', content: 'poluição ambiental', isClosed: false},
            { materia: 'quimica', content: 'poluição ambiental', isClosed: false},
            { materia: 'português', content: 'poluição ambiental', isClosed: false},
            { materia: 'filosofia', content: 'poluição ambiental', isClosed: false},
            { materia: 'sociologia', content: 'poluição ambiental', isClosed: false},
            { materia: 'biologia', content: 'poluição ambiental', isClosed: false},
        ])
    },[])

    return(
        <Pressable
            onPress={closeMenu}
            className={`w-full flex-grow-[1] flex-cols items-center justify-start ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
            <View className={`w-[90%] flex flex-col items-center justify-start`}>
                
                <View className={`w-[90%] mt-8 justify-center flex flex-row items-center mb-5`}>
                    <Return event={() => navigation.goBack()} />
                    <TitlePage text="Notificações" />
                    <MenuButton />
                </View>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}
                    style={{ minWidth: '100%', maxHeight: '83.42%' }}
                >
                    <View className={`w-[100%] flex flex-col items-center justify-start`}>
                    {notification.length >= 1 ? notification.map((not, i) => (
                    <NotificationCard materia={not.materia} content={not.content}
                        event={() => removeNotify({materia: not.materia, content: not.content, isClosed: not.isClosed })} key={i} isClosed={not.isClosed}
                    />
                    )):(
                        <View className='w-full flex flex-col items-center'>
                            <MyText text="Nenhuma Notificação Recebida" />
                            <View className="mt-6">
                                <Ionicons name='happy-outline' size={160} color={`${theme == 'light' ? '#818181' : '#C0C0C0'}`} />
                            </View>
                        </View>
                    )}
                    </View>
                </ScrollView>
            </View>
            <BottomNavigation
                route="notifications"
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