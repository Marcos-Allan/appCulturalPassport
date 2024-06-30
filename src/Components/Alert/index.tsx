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

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

export default function Alert() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, message, toggleAlert } = states

    return(
        <>
        {message.isVisible == true && (
            <View className={`absolute top-0 w-full flex flex-col items-center justify-center pt-3 z-[2]`}>
                <View className={`w-[90%] pt-[20px] pb-[26px] border-[1px] flex flex-col justify-center items-center overflow-hidden rounded-[12px] ${theme == 'light' ? 'bg-my-white border-my-black' : 'border-my-white bg-my-black'}`}>
                    <Text className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{message.text}</Text>
                    <View
                        className={`w-full h-[15px] absolute bottom-0
                            ${message.type == 'success' && 'bg-[#84cd8e]'}
                            ${message.type == 'error' && 'bg-[#e64f4f]'}
                        `}
                    >
                    </View>
                </View>
            </View>
        )}
        </>
    )
}