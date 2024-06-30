//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View } from 'react-native'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

export default function LoadingPage() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, loading } = states

    return(
        <>
            {loading == true && (
                <View className={`w-screen h-screen absolute top-0 left-0 flex items-center justify-center z-[40] ${theme == 'light' ? 'bg-my-black-opacity' : 'bg-my-white-opacity'}`}>
                    <View className={`
                        w-[80px] h-[80px] bg-my-transparent rounded-[40px] border-[6px] border-t-transparent animate-spin
                        ${theme == 'light' ? 'border-my-quartenary' : 'border-my-terciary'}
                    `}></View>
                </View> 
            )}
        </>
    )
}