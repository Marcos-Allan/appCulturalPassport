//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { Pressable } from 'react-native'

//IMPORTAÇÃO DOS ICONES
import { Ionicons } from '@expo/vector-icons';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

export default function MenuButton() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, toggleMenuOpen } = states

    return(
        <Pressable onPress={() => toggleMenuOpen()}>
            <Ionicons name='menu-outline' size={40} color={`${theme == 'light' ? 'black' : 'white'}`} />
        </Pressable>
    )
}