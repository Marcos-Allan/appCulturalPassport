//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { Pressable, Image } from 'react-native'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    activo: boolean,
    event: () => void,
    image: string
}

export default function AvatarCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <Pressable
            onPress={() => props.event()}
            className={`m-2 w-[90px] h-[90px] flex items-center justify-center rounded-[45px] ${props.activo == true && `border-[1px] translate-y-[-15px] ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}`}
        `}>
            <Image
                className={`w-[80px] h-[80px] rounded-[40px]`}
                source={{ uri: props.image }}
            />
        </Pressable>
    )
}