//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View } from "react-native";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//IMPORTAÇÃO DOS ICONES
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GoogleLogin() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <View className={`flex items-center justify-center mt-6 w-[80px] h-[80px] rounded-[50px] border-[1px] ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black'}`}>
            <MaterialCommunityIcons name='google' size={42} color={`${theme == 'light' ? '#818181' : '#c0c0c0'}`} />
        </View>
    )
}