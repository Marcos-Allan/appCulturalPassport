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
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    value: string,
    placeholder: string,
    label: string,
    icon: string,
    type: string,
    hidden?: boolean,
    state: boolean | string,
    textSuccess: string,
    textError: string,
    onChange: any,
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
    const [color, setColor] = useState<string>('')

    //FUNÇÃO CHAMADA TODA VEZ QUE HAVER MUDANÇA NA VARIAVEL props.inputFocus
    useEffect(() => {
        if(props.state == false){
            //MUDA A COR DA VARIÁVEL
            setColor('#ff0000')
        }else if(props.state == true){
            //MUDA A COR DA VARIÁVEL color
            setColor('#00ff00')
        }else{
            //MUDA A COR DA VARIÁVEL color
            setColor(`${props.state == 'neutro' && theme == 'light' ? '#716868' : '#c0c0c0'}`)
        }
    },[props.state])

    return(
        <View className={`w-[90%] flex flex-col mb-5 justify-center`}>
            <View
                className={`w-full mb-2`}
            >
                <Pressable
                    onPress={focusInput}
                >
                    <Text className={`
                    capitalize
                    text-[18px]
                    ${props.state == 'neutro' && theme == 'light'
                        ? 'text-my-gray'
                        : 'text-my-gray-black'
                        }
                        ${props.state == true && 'text-[#00ff00]'}
                        ${props.state == false && 'text-[#ff0000]'}
                    `}>{props.label}</Text>
                </Pressable>
            </View>
            
            <View className={`w-full relative flex flex-col justify-center items-center`}>
                <View className={`absolute left-[8px] h-full flex flex-col justify-center
                    ${props.state == true && 'pb-4'}
                    ${props.state == false && 'pb-4'}
                `}>
                    {props.icon == 'email' && (
                        <MaterialIcons name='email' size={28} color={`${color}`} />
                    )}
                    {props.icon == 'password' && (
                        <MaterialIcons name='lock' size={28} color={`${color}`} />
                    )}
                    {props.icon == 'code' && (
                        <MaterialIcons name='phone-iphone' size={28} color={`${color}`} />
                    )}
                    {props.icon == 'person' && (
                        <MaterialIcons name='person' size={28} color={`${color}`} />
                    )}
                </View>

                <TextInput
                    ref={inputRef}
                    secureTextEntry={isHidden}
                    cursorColor={`${color}`}
                    placeholderTextColor={`${color}`}
                    className={`
                        border-[1px]
                        outline-none
                        py-3 pl-[44px]
                        rounded-[8px]
                        text-[18px]
                        w-full
                        ${props.state == 'neutro' && theme == 'light'
                        ? 'border-my-gray text-my-gray placeholder:text-my-gray'
                        : 'border-my-gray-black text-my-gray-black placeholder:text-my-gray-black'
                        }
                        ${props.state == true && 'border-[#00ff00] text-[#00ff00] placeholder:text-[#00ff00]'}
                        ${props.state == false && 'border-[#ff0000] text-[#ff0000] placeholder:text-[#ff0000]'}
                    `}
                    onChangeText={props.onChange}
                    placeholder={props.placeholder}
                    value={props.value}
                />
                {props.hidden && (
                    <Pressable
                        onPress={() => {
                            setIsHidden(!isHidden)
                        }}
                        className={`absolute right-[8px] h-full flex flex-col justify-center
                        ${props.state == true && 'pb-4'}
                        ${props.state == false && 'pb-4'}
                        `}
                    >
                        {isHidden == false ? (
                            <Ionicons name='eye' size={28} color={`${color}`}/>
                        ):(
                            <Ionicons name='eye-off' size={28} color={`${color}`}/>
                        )}
                    </Pressable>
                )}
                {props.state == true && (
                    <Text className={`w-full text-left capitalize text-[10px] ml-2 mt-1 text-[#00ff00]`}>{props.textSuccess}</Text>
                )}
                
                {props.state == false && (
                    <Text className={`w-full text-left capitalize text-[10px] ml-2 mt-1 text-[#ff0000]`}>{props.textError}</Text>
                )}
            </View>
        </View>
    )
}