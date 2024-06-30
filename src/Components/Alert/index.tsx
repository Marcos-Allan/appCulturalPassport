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