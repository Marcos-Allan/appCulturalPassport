//IMPORTAÇÃO OOS COMPONENTES NATIVOS
import { View, Text } from 'react-native'

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    concluded: boolean,
    materia: string,
    title: string,
    type: string,
}

//IMPORTAÇÃO DOS ICONES
import {  AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

export default function ExerciseCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <View className={`flex flex-row items-center justify-between w-full border-[2px] ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black'} px-4 py-5 rounded-[8px] mb-3`}>
            <View>
                <Text className={`text-[16px] capitalize font-semibold ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{props.title}</Text>
                <Text className={`capitalize mt-1 font-medium text-[14px] ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}>{props.materia}</Text>
            </View>
            {props.type == 'travel' ? (
                <AntDesign name="book" size={38} color={`${props.concluded == true ? '#00ff00' : `${theme == 'light' ? '#818181' : '#c0c0c0'}`}`} />
            ) : (
                <MaterialCommunityIcons name="seat-outline" size={38} color={`${props.concluded == true ? '#00ff00' : `${theme == 'light' ? '#818181' : '#c0c0c0'}`}`} />
            )}
        </View>
    )
}