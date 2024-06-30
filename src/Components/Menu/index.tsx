//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View, Text, Image } from "react-native";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//IMPORTAÇÃO DOS COMPONENTES
import ToggleTheme from "../ToggleTheme";
import CloseButton from "../CloseMenu";

export default function Menu() {
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, userS } = states

    return(
        <View
            className={`absolute top-0 left-0 transition-all duration-[2s] w-[300px] z-[2] h-screen
            ${menuOpen == true ? 'left-0' : 'left-[-300px]'}
            ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'}
        `}>
            {userS.logged == true && (
                <View className={`flex flex-row items-center`}>
                    {/* IMAGEM NÃO FUNCIONA POR QUE AS IMAGENS NÃO TEM URLs PÚBLICAS */}
                    {/* <Image
                        source={{ uri: userS.img }}
                    /> */}
                    
                    <View className={`m-2 w-[80px] h-[80px] rounded-[40px] border-[1px] ${theme == 'light' ? 'border-my-quartenary' : 'border-my-secondary'}`}>
                    </View>

                    <Text className={`text-[18px] font-medium ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`}>
                        {userS.name}
                    </Text>
                </View>
            )}
            <CloseButton />
            <ToggleTheme />
        </View>
    )
}