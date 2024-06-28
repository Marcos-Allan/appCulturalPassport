//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { Pressable } from "react-native";

//IMPORTAÇÃO DOS ICONES
import { Ionicons } from '@expo/vector-icons';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

export default function CloseButton() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, toggleMenuOpen } = states

    return(
        <Pressable className={`absolute top-0 right-0 m-1 z-[3]`} onPress={() => toggleMenuOpen()}>
            <Ionicons name='close-outline' size={40} color={`${theme == 'light' ? 'white' : 'black'}`} />
        </Pressable>
    )
}