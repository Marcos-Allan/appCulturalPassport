//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { Text } from 'react-native'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DOS COMPONENTES
interface Props {
    text: string,
}

export default function TitlePage(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <Text className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'} capitalize text-[24px] text-center flex-grow-[1] font-bold`}>{props.text}</Text>
    )
}