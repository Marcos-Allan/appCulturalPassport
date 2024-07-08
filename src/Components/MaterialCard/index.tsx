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
import { View, Text, Pressable } from 'react-native'

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from 'react'

//TIPAGEM DAS PROPRIEDADES DO COMPONENTE
interface Props {
    background: Number,
    titleMateria: String,
    event: () => void
}

export default function MaterialCard(props: Props) {
    
    //USO DO HOOK useState
    const [colors, setColors] = useState<String[]>([
        '#52bd9b', //0
        '#c47e3d', //1
        '#e41c1c', //2
        '#eeee1b', //3
        '#e843f1', //4
        '#987dd0', //5
        '#c66193', //6
        '#38da56', //7
    ])

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //COLOCA UMA NOVA COR NO ARRAY DE CORES
        setColors((colors) => [...colors, '#527fef'])
    },[])
    
    return(
        <Pressable
            onPress={() => props.event()}
            className={`relative mb-[15px] w-[100%] h-[100px] rounded-[8px] p-3`}
            style={{ backgroundColor: `${colors[Number(props.background)]}` }}
        >
            <Text className={`text-[22px] text-my-white font-semibold capitalize`}>{props.titleMateria}</Text>

            <View
                className={`rounded-[25px] w-[50px] h-[50px] absolute bottom-[-12%] right-[5%] border-[3px] bg-my-white
                `}
                style={{ borderColor: `${colors[Number(props.background)]}` }}
            >
            </View>
            
        </Pressable>
    )
}