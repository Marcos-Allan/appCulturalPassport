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
import { View, Text, Image, Pressable } from "react-native";

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//IMPORTAÇÃO DOS ICONES
import { MaterialCommunityIcons } from '@expo/vector-icons';

//IMPORTAÇÃO DOS COMPONENTES
import ToggleTheme from "../ToggleTheme";
import CloseButton from "../CloseMenu";

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    event: () => void
}

export default function Menu(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()
    
    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, userS } = states
    
    //CRIA UMA REFERÊNCIA PARA O ESTADO DA ANIMAÇÃO
    const isSlideLeft = useSharedValue(menuOpen)

    //CRIA UM ESTILO ANIMADO DPENDENDO DO DO VALOR DA VARIÁVEL DE REFERÊNCIA
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: isSlideLeft.value ? withTiming(0, { duration: 350 }) : withTiming(-300, { duration: 350 }) }]
        }
    })

    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR O VALOR DA ANIMAÇÃO
    useEffect(() => {
        isSlideLeft.value = menuOpen
    },[menuOpen])

    return(
        <Animated.View
            style={[{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 300,
                transform: 'translateX(-300px)',
                zIndex: 2,
                height: '100%',
                backgroundColor: `${theme == 'light' ? '#000000' : '#ffffff'}`,
            }, animatedStyle]}
        >
            {userS.logged == true && (
                <View className={`flex flex-row items-center`}>

                    <View className={`m-2 w-[90px] h-[90px] rounded-[45px] flex items-center justify-center border-[1px] p-1 ${theme == 'light' ? 'border-my-quartenary' : 'border-my-secondary'}`} >
                        <Image
                            className={`w-[80px] h-[80px] rounded-[40px]`}
                            source={{ uri: userS.img }}
                        />
                        <Pressable
                            onPress={() => props.event()}
                            className={`absolute top-[0px] right-[-2px] p-[3px] rounded-[30px] ${theme == 'light' ? 'bg-my-quartenary' : 'bg-my-secondary'}
                        `}>
                            <MaterialCommunityIcons name='pencil-outline' size={18} color={'white'} />
                        </Pressable>
                    </View>


                    <Text className={`text-[18px] font-medium ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`}>
                        {userS.name}
                    </Text>
                </View>
            )}
            <CloseButton />
            <ToggleTheme />
        </Animated.View>
    )
}