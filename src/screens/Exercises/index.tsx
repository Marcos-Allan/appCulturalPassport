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
import MaterialCard from "../../Components/MaterialCard";
import MyText from "../../Components/MyText";
import ExerciseCard from "../../Components/ExerciseCard";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'Exercises'>;

export const Exercises:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen } = states

    //UTILIZAÇÃO DO HOOK useState
    const [exercises, setExercises] = useState<any[]>([])

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

    //FUNÇÃO CHAMADA TODA VEZ QUE CARREGA A PÁGINA
    useEffect(() => {
         //DEFINE O ARRAY COM AS CONQUISTAS
         setExercises([
            { concluded: false, materia: 'português', title: 'museu do ipiranga', type: 'travel' },
            { concluded: true, materia: 'geografia', title: 'museu do ipiranga', type: 'travel' },
            { concluded: false, materia: 'filosofia', title: 'museu do ipiranga', type: 'travel' },
            { concluded: false, materia: 'inglês', title: 'museu do ipiranga', type: 'travel' },
            { concluded: true, materia: 'história', title: 'museu do ipiranga', type: 'travel' },
            { concluded: true, materia: 'biologia', title: 'museu do terraplanismo', type: 'travel' },
            { concluded: false, materia: 'português', title: 'museu do ipiranga', type: 'travel' },
            { concluded: true, materia: 'fuvest', title: 'fazer simulado de matemática', type: 'exercise' },
            { concluded: false, materia: 'enem', title: 'fazer simulado de matemática', type: 'exercise' },
            { concluded: false, materia: 'fuvest', title: 'fazer simulado de matemática', type: 'exercise' },
            { concluded: true, materia: 'fuvest', title: 'fazer simulado de matemática', type: 'exercise' },
            { concluded: true, materia: 'unesp', title: 'fazer simulado de matemática', type: 'exercise' },
            { concluded: false, materia: 'ufpa', title: 'fazer simulado de matemática', type: 'exercise' },
            { concluded: false, materia: 'unesp', title: 'fazer simulado de matemática', type: 'exercise' },
            { concluded: true, materia: 'uerj', title: 'fazer simulado de história', type: 'exercise' },
        ])
    },[])

    return(
        <Pressable
            onPress={closeMenu}
            className={`w-full flex-grow-[1] flex-cols items-center justify-start ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
            <View className={`w-[90%] flex flex-col items-center justify-start`}>
                
                <View className={`w-[90%] mt-8 justify-center flex flex-row items-center mb-5`}>
                    <Return event={() => navigation.goBack()} />
                    <TitlePage text="exercicios" />
                    <MenuButton />
                </View>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}
                    style={{ minWidth: '100%', maxHeight: '83.42%' }}
                >
                    <View className={`w-[100%] flex flex-col items-center justify-start`}>
                        <Text className={`pl-[10px] capitalize text-left w-full text-[18px] my-2 ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}>passeios</Text> 

                        {exercises.map((exerc, i) => 
                            exerc.type == 'travel' ? (<ExerciseCard concluded={exerc.concluded} materia={exerc.materia} title={exerc.title} type={exerc.type} key={i} />):(<></>)
                        )}
                        
                        <Text className={`pl-[10px] capitalize text-left w-full text-[18px] my-2 ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}>simulados</Text> 
                        
                        {exercises.map((exerc, i) => 
                            exerc.type == 'exercise' ? (<ExerciseCard concluded={exerc.concluded} materia={exerc.materia} title={exerc.title} type={exerc.type} key={i} />):(<></>)
                        )}
                    </View>
                </ScrollView>
            </View>
            <BottomNavigation
                route="exercises"
                eventH={() => navigation.navigate('Materias')}
                eventMP={() => navigation.navigate('MyPerfil')}
                eventE={() => navigation.navigate('Exercises')}
                eventA={() => navigation.navigate('Achievements')}
            />
            <Menu event={() => navigation.navigate('MyPerfil')} />
        </Pressable>
    )
}