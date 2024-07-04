//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View, Text } from 'react-native'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    title: string
    value: string
}

export default function InfoStudentCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <View className={`mb-3 w-[90%] border-[2px] p-2 rounded-[20px] flex flex-row justify-between items-center ${theme == 'light' ? 'border-my-black' : 'border-my-white'}`}>
            <Text className={`text-[18px] font-semibold ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{props.title}: </Text>
            <Text className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{props.value}</Text>
        </View>
    )
}