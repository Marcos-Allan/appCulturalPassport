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
import { Pressable, Text } from "react-native";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DOS COMPONENTES
interface Props {
    event?: () => void,
    text: string,
    disabled?: boolean,
}

export default function MyButton(props: Props) { 

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //EXECUTA A FUNÇÃO PASSADA POR PROPS
    function myFunction(){
        if(props.disabled == false){
            return
        }

        props.event && props.event()
    }

    return(
        <Pressable
            className={`w-[90%] py-3 mt-2 mb-3 flex justify-center rounded-[12px]
            ${theme == 'light' ? 'bg-my-primary' : 'bg-my-secondary'}
            ${props.disabled == true && `${theme == 'light' ? 'bg-my-primary' : 'bg-my-secondary'}`}
            ${props.disabled == false && `${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'}`}
            `}
            onPress={myFunction}
        >
            <Text className={`text-[20px] font-medium text-center capitalize ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`}>{props.text}</Text>
        </Pressable>
    )
}