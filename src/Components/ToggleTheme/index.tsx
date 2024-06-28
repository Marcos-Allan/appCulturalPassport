//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { Pressable, Text } from "react-native";

//IMPORTAÇÃO DOS ICONES
import { Ionicons } from '@expo/vector-icons';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

export default function ToggleTheme() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, toggleTheme } = states

    return(
        <Pressable className={`w-full flex flex-row items-center gap-[10px] px-3 py-5`} onPress={() => toggleTheme()}>
            {theme == 'light' ? (
                <Ionicons name='sunny-outline' size={40} color={`white`} />
            ) : (
                <Ionicons name='moon-outline' size={40} color={`black`} />
            )}
            <Text className={`capitalize ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`}>{theme == 'light' ? 'dark' : 'light'} theme</Text>
        </Pressable>
    )
}