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
import { View, Pressable, ScrollView } from "react-native";

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

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'Materias'>;

export const Materias:React.FC<Props> = ({ navigation }) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen } = states

    //UTILIZAÇÃO DO HOOK useState
    const [matters, setMatters] = useState<any[]>([])

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
        //DEFINE O ARRAY COM AS MATÉRIAS
        setMatters([
            { titleMateria: 'fisíca',  background: 0 },
            { titleMateria: 'história',  background: 1 },
            { titleMateria: 'inglês',  background: 2 },
            { titleMateria: 'geografia',  background: 3 },
            { titleMateria: 'artes',  background: 4 },
            { titleMateria: 'português',  background: 5 },
            { titleMateria: 'química',  background: 6 },
            { titleMateria: 'biologia',  background: 7 },
            { titleMateria: 'matemática',  background: 8 },
        ])
    },[])

    return(
        <Pressable
            onPress={closeMenu}
            className={`w-full flex-grow-[1] flex-cols items-center justify-start ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
            <View className={`w-[90%] flex flex-col items-center justify-start`}>
                
                <View className={`w-[90%] mt-8 justify-center flex flex-row items-center mb-5`}>
                    <Return event={() => navigation.goBack()} />
                    <TitlePage text="matérias" />
                    <MenuButton />
                </View>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}
                    style={{ minWidth: '100%', maxHeight: '83.42%' }}
                >
                    <View className={`w-[100%] flex flex-col items-center justify-start`}>
                        {matters.map((mat, i) => (
                            <MaterialCard titleMateria={mat.titleMateria} background={mat.background} key={i} />
                        ))}
                    </View>
                </ScrollView>
            </View>
            <BottomNavigation route="home" />
            <Menu event={() => navigation.navigate('MyPerfil')} />
        </Pressable>
    )
}