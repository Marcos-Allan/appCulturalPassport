//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { Pressable, Text } from "react-native";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DOS COMPONENTES
interface Props {
    event?: () => void,
    text: string
}

export default function MyButton(props: Props){

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <Pressable
            className={`w-full py-3 mt-2 mb-3 flex justify-center rounded-[12px] ${theme == 'light' ? 'bg-my-primary' : 'bg-my-secondary'}`}
            onPress={() => props.event && props.event()}
        >
            <Text className={`text-[20px] font-medium text-center capitalize ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`}>{props.text}</Text>
        </Pressable>
    )
}