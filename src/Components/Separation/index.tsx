//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View, Text } from 'react-native'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

export default function Separation() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <View className={`w-[90%] flex flex-row items-center mt-5`}>
            <View className={`${theme == 'light' ? 'bg-my-black' : 'bg-my-white'} h-[2px] flex-grow-[1]`}></View>
            <Text className={`px-2 text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>ou</Text>
            <View className={`${theme == 'light' ? 'bg-my-black' : 'bg-my-white'} h-[2px] flex-grow-[1]`}></View>
        </View>
    )
}