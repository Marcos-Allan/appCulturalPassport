import React, { useState, useEffect } from 'react'

import * as ImageManipulator from 'expo-image-manipulator';

//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View, Text, ImageBackground } from 'react-native'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    level: number,
    porcentage: number,
    title: string,
    message: string,
    uri: string,
    key: number,
}

export default function ConquestCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, userS } = states

    //UTILIZAÇÃO DO HOOK useState
    const [image, setImage] = useState(null);

    //FUNÇÃO RESPONSÁVEL POR RENDERIZAR AS BARRAS DE LEVEL
    function renderLevel(quantity: number) {
        //INICIA ARRAY VAZIO
        const level = []

        //FAZ LOOP PELA QUANTIDADE FORNECIDA PELA FUNÇÃO
        for(let i = 0; i < quantity; i++) {

            //ADICIONA UM COMPONENTE NO ARRAY
            level.push(
                <View
                    key={i}
                    className={`h-[10px] flex-grow-[1] rounded-[2px]
                    bg-my-white-opacity   
                `}></View>
            )

        }

        //RETORNA O COMPONENTE A QUANTIDADE DE VEZES FORNECIDA PELA FUNÇÃO
        return level
    }

    //FUNÇÃO RESPONSÁVEL POR VER SE A CONQUISTA FOI CONCLUIDA OU NÃO
    const checkAchievement = (param:string) => {
        return userS.simulations.some((item:any) => item.name === param)
    };

    return(
        <View
        key={props.key}
        className={`w-[100%] relative my-2 p-2 border-2 flex flex-row items-center justify-between h-[180px] rounded-[8px]
            ${checkAchievement(props.title) == true ? 'animate-colorChange' : `
                ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}
            `}
        `}>
            
            <View
                className={`relative h-full w-[40%] flex flex-row justify-around overflow-hidden items-end rounded-[5px]
                ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'}
            `}>
                <ImageBackground
                    className={`w-full h-full rounded-[5px]`}
                    source={{ uri: props.uri }}
                />

                <View
                    className={`absolute top-0 left-0 w-full h-full bg-[#8c8c8c] opacity-[0.7]`}
                />

                {/* CHAMA A FUNÇÃO QUE RENDERIZA OS LEVELS DEPENDENDO DA QUANTIDADE ESPECIFICADA */}
                {renderLevel(props.level)} 
            </View>

            <View className={`w-[60%] flex flex-col h-full justify-between bg-transparent p-2 rounded-[5px]`}>
                
                <View>
                    <Text
                        className={`font-bold text-[17px]
                        ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                    `}>{props.title}</Text>

                    <Text
                        className={`text-[15px]
                        ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                    `}>{props.message}</Text>
                </View>
                
                <View className='w-full flex flex-row justify-between items-center'>

                    <View
                        className={`align-bottom w-[80%] h-[10px]
                        ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'}
                    `}>
                        <View
                            style={{ width: 
                                `${checkAchievement(props.title) == true ? 100 : Number(props.porcentage)}`
                            }}
                            className={`h-full
                            ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'}
                        `}></View>
                    </View>
                    
                    <Text
                        className={`text-[14px]
                        ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                    `}>{checkAchievement(props.title) == true ? 100 : props.porcentage}%</Text>

                </View>

            </View>
        </View>
    )
}