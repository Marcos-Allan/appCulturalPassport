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
import { View } from 'react-native'

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing } from 'react-native-reanimated'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

export default function LoadingPage() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, loading } = states

    //CRIA UMA REFERÊNCIA PARA O ESTADO DA ANIMAÇÃO
    const rotation = useSharedValue(0)

    useEffect(() => {
        rotation.value = withRepeat(withTiming(360, { duration: 650, easing: Easing.linear }), -1, false)
    },[])

    //CRIA UM ESTILO ANIMADO DPENDENDO DO DO VALOR DA VARIÁVEL DE REFERÊNCIA
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate:  `${rotation.value}deg` }]
        }
    })

    return(
        <>
            {loading == true && (
                <View className={`w-screen h-screen absolute top-0 left-0 flex items-center justify-center z-[40] ${theme == 'light' ? 'bg-my-black-opacity' : 'bg-my-white-opacity'}`}>
                    <Animated.View 
                        style={[{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            borderStyle: 'solid',
                            borderTopWidth: 6,
                            borderTopColor: `${theme == 'light' ? '#05C7F2' : '#263973'}`,
                            borderLeftWidth: 6,
                            borderLeftColor: `${theme == 'light' ? '#05C7F2' : '#263973'}`,
                            borderRightWidth: 6,
                            borderRightColor: `${theme == 'light' ? '#05C7F2' : '#263973'}`,
                            borderBottomWidth: 6,
                            borderBottomColor: '#00000001',
                        }, animatedStyle]}
                    />
                </View> 
            )}
        </>
    )
}