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
import { View, Pressable, Text, TextInput } from "react-native";

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect, useRef } from 'react'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//IMPORTAÇÃO DOS ICONES
import { MaterialIcons } from '@expo/vector-icons';

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    value: string,
    placeholder: string,
    label: string,
    icon: string,
    type: string,
    hidden?: boolean,
    inputFocus: boolean,
    onChange: any,
    onBlur: () => void,
    onFocus: () => void,
}

export default function Input(props: Props) {
    //FAZ REFERÊNCIA A UM ELEMENTO
    const inputRef = useRef<any>(null)

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //FUNÇÃO RESPONSÁVEL POR DAR FOCO NO INPUT
    function focusInput() {
        if(inputRef.current){
            inputRef.current.focus()
        }
    }

    //UTILIZAÇÃO DO HOOK useState
    const [isHidden, setIsHidden] = useState<boolean>(props.hidden ? props.hidden : false)

    useEffect(() => {
        if(props.inputFocus == true){
            if(inputRef.current){
                inputRef.current.focus()
            }
        }
    },[props.inputFocus])

    return(
        <View className={`w-[90%] flex flex-col mb-5`}>
            <View
                className={`w-full mb-2`}
            >
                <Pressable
                    onPress={focusInput}
                >
                    <Text className={`
                    capitalize
                    text-[18px]
                    ${theme == 'light'
                    ? 'text-my-gray'
                    : 'text-my-gray-black'
                    }`}>{props.label}</Text>
                </Pressable>
            </View>
            
            <View className={`w-full relative flex flex-col justify-center`}>
                <View className="absolute left-[8px]">
                    {props.icon == 'email' && (
                        <MaterialIcons name='email' size={28} color={`${theme == 'light' ? '#818181' : '#c0c0c0'}`} />
                    )}
                    {props.icon == 'password' && (
                        <MaterialIcons name='lock' size={28} color={`${theme == 'light' ? '#818181' : '#c0c0c0'}`} />
                    )}
                    {props.icon == 'code' && (
                        <MaterialIcons name='phone-iphone' size={28} color={`${theme == 'light' ? '#818181' : '#c0c0c0'}`} />
                    )}
                    {props.icon == 'person' && (
                        <MaterialIcons name='person' size={28} color={`${theme == 'light' ? '#818181' : '#c0c0c0'}`} />
                    )}
                </View>

                <TextInput
                    onBlur={props.onBlur}
                    onFocus={props.onFocus}
                    ref={inputRef}
                    secureTextEntry={isHidden}
                    cursorColor={`${theme == 'light' ? '#818181' : '#c0c0c0'}`}
                    placeholderTextColor={`${theme == 'light' ? '#818181' : '#c0c0c0'}`}
                    className={`
                        border-[1px]
                        outline-none
                        py-3 pl-[44px]
                        rounded-[8px]
                        text-[18px]
                        w-full
                        ${theme == 'light'
                        ? 'border-my-gray text-my-gray placeholder:text-my-gray'
                        : 'border-my-gray-black text-my-gray-black placeholder:text-my-gray-black'
                        }
                    `}
                    onChangeText={props.onChange}
                    placeholder={props.placeholder}
                    value={props.value}
                />
            </View>
        </View>
    )
}