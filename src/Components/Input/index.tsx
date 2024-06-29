//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View, Pressable, Text, TextInput } from "react-native";

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState } from 'react'

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useRef } from 'react'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//IMPORTAÇÃO DOS ICONES
import { MaterialIcons } from '@expo/vector-icons';

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    value: string,
    placeholder: string,
    label: string,
    onChange: any,
    icon: string,
    type: string
    hidden?: boolean
}

export default function Input(props: Props) {
    //FAZ REFERENCIA A UM ELEMENTO
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