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
import { View, Text, Pressable } from 'react-native'

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

//TIPAGEM DAS PROPRIEDADES DO COMPONENTE
interface Props {
    background: Number,
    titleMateria: String,
    event: () => void
}

export default function MaterialCard(props: Props) {
    
    //USO DO HOOK useState
    const [colors, setColors] = useState<String[]>([
        '#52bd9b',
        '#c47e3d',
        '#e41c1c',
        '#eeee1b',
        '#e843f1',
        '#987dd0',
        '#c66193',
        '#38da56',
    ])

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //COLOCA UMA NOVA COR NO ARRAY DE CORES
        setColors((colors) => [...colors, '#527fef'])
    },[])

    //CRIA UMA REFERÊNCIA PARA O ESTADO DA ANIMAÇÃO
    const scaleValue = useSharedValue(1)

    //FUNÇÃO CHAMADA AO CLICAR NO COMPONENTE
    const handleButtonClick = () => {
        //EXECUTA A ANIMAÇÃO
        scaleValue.value = withTiming(0.8, { duration: 300 });

        //FUNÇÃO CHAMADA APÓS 0.3 SEGUNDOS
        setTimeout(() => {
            //VOLTA O COMPONENTE PARA O ESTADO ORIGINAL
            scaleValue.value = withTiming(1, { duration: 150 });
        }, 300);
    };

    //CRIA UM ESTILO ANIMADO DPENDENDO DO DO VALOR DA VARIÁVEL DE REFERÊNCIA
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                // { scale: scaleValue.value ? withTiming(1, { duration: 300 }) : withTiming(0.8, { duration: 300 }) },
                { scale: scaleValue.value },
            ]
        }
    })
    
    return(
        <Pressable
            onPress={() => {
                handleButtonClick()
                setTimeout(() => {
                    props.event()
                }, 375);
            }}
            className={`mb-[10px] w-[100%] mt-[10px]`}
        >
            <Animated.View
                style={[{
                    position: 'relative',
                    marginBottom: 0,
                    width: '100%',
                    height: 100,
                    borderRadius: 8,
                    padding: 12,
                    backgroundColor: `${colors[Number(props.background)]}`
                }, animatedStyle]}
            >
                <Text className={`text-[22px] text-my-white font-semibold capitalize`}>{props.titleMateria}</Text>

                <View
                    className={`rounded-[25px] w-[50px] h-[50px] absolute bottom-[-12%] right-[5%] border-[3px] bg-my-white
                    `}
                    style={{ borderColor: `${colors[Number(props.background)]}` }}
                >
                </View>
            </Animated.View>
            
        </Pressable>
    )
}