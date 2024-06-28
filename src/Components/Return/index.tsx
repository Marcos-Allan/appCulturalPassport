//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { Pressable } from 'react-native'

//IMPORTAÇÃO DOS ICONES
import { Ionicons } from '@expo/vector-icons';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DOS COMPONENTES
interface Props {
    event?: () => void,
}

export default function Return(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <Pressable onPress={() => props.event && props.event()}>
            <Ionicons name='arrow-back' size={40} color={`${theme == 'light' ? 'black' : 'white'}`} />
        </Pressable>
    )
}