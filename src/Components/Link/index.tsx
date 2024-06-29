//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { Text } from 'react-native'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    text: string
}

export default function Link(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <Text className={`underline text-[18px] my-2 ${theme == 'light' ? 'text-my-primary' : 'text-my-secondary'}`}>{props.text}</Text>
    )
}