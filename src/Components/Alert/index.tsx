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
import { View, Text } from 'react-native'

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

export default function Alert() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, message } = states
    
    //CRIA UMA REFERÊNCIA PARA O ESTADO DA ANIMAÇÃO
    const translate_x = useSharedValue(message.isVisible)
    const opacityValue = useSharedValue(1)

    // FUNÇÃO RESPONSÁVEL POR INICIAR A PRIMEIRA ANIMAÇÃO
    const startTranslateXAnimation = () => {
        translate_x.value = withTiming(-370, { duration: Number(message.time - 500) }, (isFinished) => {
            if (isFinished) {
                //CHAMA UMA FUNÇÃO AO TÉRMINO DA ANIMAÇÃO
                runOnJS(onTranslateXAnimationEnd)();
            }
        });
    };

    //CRIA UM ESTILO ANIMADO DPENDENDO DO DO VALOR DA VARIÁVEL DE REFERÊNCIA
    const animatedStyle1 = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translate_x.value ? withTiming(-370, { duration: Number(message.time - 500) }) : withTiming(0, { duration: Number(message.time - 500) }) },
            ]
        }
    })
    
    //CRIA UM ESTILO ANIMADO DPENDENDO DO DO VALOR DA VARIÁVEL DE REFERÊNCIA
    const animatedStyle2 = useAnimatedStyle(() => {
        return {
            opacity: opacityValue.value
        }
    })

    //FUNÇÃO CHAMADA AO TÉRMINO DA ANIMAÇÃO
    const onTranslateXAnimationEnd = () => {
        //INICIA OUTRA ANIMAÇÃO EM OUTRO COMPONENTE
        opacityValue.value = withTiming(0, { duration: 1500 }, (isFinished) => {
            if(isFinished){
                //RESETA O VALOR DA OPACIDADE DO COMPONENETE
                opacityValue.value = 1
            }
        });
    };

    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR O VALOR DA ANIMAÇÃO
    useEffect(() => {
        translate_x.value = message.isVisible

        //VERIFICA O ESTADO DA CAIXA DE ALERT PARA INICIAR A ANIMAÇÃO
        if(message.isVisible == true){
            startTranslateXAnimation()
        }else{
            return
        }
    },[message.isVisible])

    return(
        <>
            {message.isVisible == true && (
                <View className={`absolute top-0 w-full flex flex-col items-center justify-center pt-3 z-[2]`}>
                    <Animated.View
                        style={[{
                            position: 'relative',
                            width: '90%',
                            paddingTop: 20,
                            paddingBottom: 26,
                            borderWidth: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            borderRadius: 12,
                            backgroundColor: `${theme == 'light' ? '#ffffff' : '#000000'}`,
                            borderColor: `${theme == 'light' ? '#000000' : '#ffffff'}`,
                        },animatedStyle2]}
                        // className={`relative w-[90%] pt-[20px] pb-[26px] border-[1px] flex flex-col justify-center items-center overflow-hidden rounded-[12px] ${theme == 'light' ? 'bg-my-white border-my-black' : 'border-my-white bg-my-black'}`}
                    >
                        <Text className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{message.text}</Text>
                        <Animated.View
                            style={[{
                                width: '100%',
                                height: 15,
                                transform: 'translateX(0px)',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                backgroundColor: `${message.type == 'success' ? '#84cd8e' : '#e64f4f'}`,
                            }, animatedStyle1]}
                        />
                    </Animated.View>
                </View>
            )}
        </>
    )
}