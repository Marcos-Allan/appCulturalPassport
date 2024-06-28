//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { Text } from 'react-native'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DOS COMPONENTES
interface Props {
    text: string,
}

export default function MyText(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <Text className={`text-[22px] mt-4 ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}>{props.text}</Text>
    )
}