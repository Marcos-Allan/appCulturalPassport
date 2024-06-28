//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View } from "react-native";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//IMPORTAÇÃO DOS COMPONENTES
import ToggleTheme from "../ToggleTheme";
import CloseButton from "../CloseMenu";

export default function Menu() {
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen } = states

    return(
        <View
            className={`absolute top-0 left-0 transition-all duration-[2s] w-[300px] z-[2] h-screen
            ${menuOpen == true ? 'left-0' : 'left-[-300px]'}
            ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'}
        `}>
            <CloseButton />
            <ToggleTheme />
        </View>
    )
}