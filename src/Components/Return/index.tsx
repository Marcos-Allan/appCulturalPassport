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
import { Pressable } from 'react-native'

//IMPORTAÇÃO DOS ICONES
import { Ionicons } from '@expo/vector-icons';

//IMPORTAÇÃO DAS BIBLIOTECAS
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DOS COMPONENTES
interface Props {
    event?: () => void,
}

export default function Return(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //CRIA UMA REFERÊNCIA PARA O ESTADO DA ANIMAÇÃO
    const translate_x = useSharedValue(0)

    //FUNÇÃO CHAMADA AO CLICAR NO COMPONENTE
    const handleButtonClick = () => {
        //EXECUTA A ANIMAÇÃO
        translate_x.value = withTiming(-25, { duration: 300 });

        //FUNÇÃO CHAMADA APÓS 0.3 SEGUNDOS
        setTimeout(() => {
            //VOLTA O COMPONENTE PARA O ESTADO ORIGINAL
            translate_x.value = withTiming(0, { duration: 150 });
        }, 300);
    };

    //CRIA UM ESTILO ANIMADO DPENDENDO DO DO VALOR DA VARIÁVEL DE REFERÊNCIA
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translate_x.value },
            ]
        }
    })

    return(
        <Pressable onPress={() => {
            handleButtonClick()
            setTimeout(() => {
                props.event && props.event()
            }, 375);
        }}>
            <Animated.View style={[{}, animatedStyle]}>
                <Ionicons name='arrow-back' size={40} color={`${theme == 'light' ? 'black' : 'white'}`} />
            </Animated.View>
        </Pressable>
    )
}