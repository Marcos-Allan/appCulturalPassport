/**
 * MIT License with Additional Restrictions
 * 
 * Copyright (c) 2024 Marcos Allan Santos Menezes
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * 1. The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * 2. The Software may not be used, modified, or distributed without the prior
 * written permission of the copyright holder.
 * 
 * 3. The Software is provided "as is", without warranty of any kind, express or
 * implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and noninfringement. In no event shall the
 * authors or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising from,
 * out of or in connection with the Software or the use or other dealings in the
 * Software.
 * 
 * By using the Software, you agree to these terms and conditions.
 */

//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View, Text, Image } from "react-native";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//IMPORTAÇÃO DOS ICONES
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

                    <View className={`m-2 w-[90px] h-[90px] rounded-[45px] flex items-center justify-center border-[1px] p-1 ${theme == 'light' ? 'border-my-quartenary' : 'border-my-secondary'}`} >
                        <Image
                            className={`w-[80px] h-[80px] rounded-[40px]`}
                            source={{ uri: userS.img }}
                        />
                        <View className={`absolute top-[0px] right-[-2px] p-[3px] rounded-[30px] ${theme == 'light' ? 'bg-my-quartenary' : 'bg-my-secondary'}`}>
                            <MaterialCommunityIcons name='pencil-outline' size={18} color={'white'} />
                        </View>
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