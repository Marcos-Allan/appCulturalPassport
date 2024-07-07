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

//IMPORTAÇÃO DOS ICONES
import { View, Text, Pressable } from 'react-native'

//IMPORTAÇÃO DOS ICONES
// import { IoIosNotificationsOutline, IoIosCloseCircle } from "react-icons/io"

//IMPORTAÇÃO DOS ICONES
import { Ionicons } from '@expo/vector-icons';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//TIPAGEM DAS PROPS DAS NOTIFICAÇÕES
interface Props {
    materia: string,
    content: string,
    isClosed: boolean,
    event?: () => any
}

export default function NotificationCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <View
            className={`w-[95%] mb-2 flex flex-row items-center justify-between px-2 py-5 rounded-[6px] border-2 ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black'}
        `}>
            
            <View className={`flex flex-row justify-start items-center truncate w-[35%] me-3`}>
                {/* <IoIosNotificationsOutline className={`text-my-secondary text-[38px]`} /> */}
                <Text className={`truncate capitalize text-[14px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{props.materia}</Text>
            </View>

            <View className={`flex flex-row justify-start items-center w-[65%] pr-[30px]`}>
                <View className={`w-[18px] h-[18px] rounded-[9px] me-2 ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'}`}></View>
                <Text
                    className={`pl-[10px] truncate capitalize text-left text-[12px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}
                >{props.content}</Text>
            </View>

            <Pressable
                onPress={() => props.event && props.event()}
                className={`absolute right-[6px]`}
            >
                <Ionicons name='close-circle' size={24} color={`${theme == 'light' ? '#000000' : '#FFFFFF'}`} />
            </Pressable>
            {/* <IoIosCloseCircle className={`text-my-secondary text-[38px]`}
                onClick={() => {
                    props.event && props.event()
                    // setIsClosed(true)
                }}
            /> */}
        </View>
    )
}5