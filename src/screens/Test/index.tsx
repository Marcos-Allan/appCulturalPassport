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
import { View, Pressable, ScrollView, Text } from "react-native";

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from "react";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DA PÁGINA
import { StackScreenProps } from '@react-navigation/stack';

//LISTA DOS PARAMETROS DA PÁGINA
import { RootStackParamList } from '../../../App';

//IMPORTAÇÃO DOS ICONES
import { MaterialCommunityIcons, Ionicons, FontAwesome, Octicons,  } from '@expo/vector-icons';

//IMPORTAÇÃO DOS COMPONENTES
import TitlePage from "../../Components/TitlePage";
import MyButton from "../../Components/MyButton";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'Test'>;

export const Test:React.FC<Props> = ({ navigation, route }) => {
    
    //PEGA OS PARAMETROS PASSADOS PARA A PÁGINA
    const { matterName } = route.params

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //UTILIZAÇÃO DO HOOK useState
    const [questIndex, setQuestIndex] = useState<number>(0)
    const [questFinalized, setQuestFinalized] = useState<boolean>(false)
    const [percentageFinalized, setPercentageFinalized] = useState<number>(0)
    const [yourPercent, setYourPercent] = useState<number>(0)
    const [options, setOptions] = useState<string[]>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
    const [questions, setQuestions] = useState<any[]>([
        { content: 'Mecânica', answer: 'Um carro viaja com velocidade constante de 72 km/h em uma rodovia. Qual é a distância percorrida pelo carro em 2 horas',
            questions: [
                '36 km',
                '72 km',
                '144 km',
                '144 m',
            ]
        },
        { content: 'Mecânica', answer: 'Uma pessoa empurra uma caixa com uma força constante de 20 N por uma distância de 5 metros. Qual é o trabalho realizado pela pessoa?',
            questions: [
                '10 J',
                '100 J',
                '5 J',
                '25 J',
            ]
        },
        { content: 'Mecânica', answer: 'Um objeto é lançado verticalmente para cima a partir do solo. Qual é a velocidade do objeto quando ele atinge a metade da altura máxima?',
            questions: [
                'Igual á velocidade inicial',
                'Maior que a velocidade inicial',
                'Menor que a velocidade inicial',
                'Zero',
            ]
        },
        { content: 'Óptica', answer: 'Ao iluminar uma região escura com uma lanterna, uma pessoa projeta a sombra de uma mão contra uma parede. Observando a formação da sombra, a pessoa conclui corretamente que:',
            questions: [
                'A sombra é formada pela falta de matéria na região iluminada.',
                'Quanto maior a distância entre a fonte luminosa e a mão, maior é a sombra projetada.',
                'A sombra apresenta a mesma cor da luz incidente.',
                'A sombra da mão é formada na região onde não incide luz.',
            ]
        },
        { content: 'Óptica', answer: 'Para otimizar a iluminação em residências, é recomendável que as paredes sejam pintadas com cores claras e o teto com cores brancas. Isso ocorre porque as cores claras:',
            questions: [
                'Absorvem mais luz, distribuindo-a uniformemente pelo ambiente.',
                'Refletem mais luz, distribuindo-a uniformemente pelo ambiente.',
                'Emitem mais luz, distribuindo-a uniformemente pelo ambiente.',
                'Refratam mais luz, distribuindo-a uniformemente pelo ambiente.',
            ]
        },
        { content: 'Óptica', answer: 'Em um laboratório, foi realizado uma experiência com luzes coloridas. Um grupo de alunos observou que, ao incidir luz vermelha em um filtro azul, a intensidade da luz transmitida foi muito pequena. Ao substituir o filtro azul por um filtro vermelho, a intensidade da luz transmitida aumentou significativamente. Essa experiência ilustra um fenômeno óptico conhecido como: ',
            questions: [
                'Polarização.',
                'Reflexão.',
                'Difração.',
                'Absorção.',
            ]
        }
    ])

    //FUNÇÃO CHAMADA TODA VEZ QUE CARREGA A PÁGINA
    useEffect(() => {
        setQuestions((quest) => [...quest, {
            content: 'Mecânica',
            answer: 'O som é uma onda mecânica que se propaga através de um meio material. A velocidade do som depende das propriedades do meio em que ele se propaga. Considere que a velocidade do som no ar é de aproximadamente 340 m/s e a, na água, é de aproximadamente 1.500 m/s. Se um som é emitido simultaneamente em ambos os meios, qual das afirmações é correta?',
                questions: [
                    'O som se propaga mais rápido no ar porque é um meio menos denso.',
                    'O som se propaga mais rápido na água porque é um meio mais denso.',
                    'O som se propaga com a mesma velocidade em ambos os meios.',
                    'A velocidade do som não depende do meio, mas da frequência da onda.',
                ]
            }
        ])
    },[])

    //FUNÇÃO RESPONSÁVEL POR IR PARA A PÁGINA POSTERIOR
    function nextQuestion() {
        if(Number(questIndex + 2) >= Number(questions.length)){
            setQuestFinalized(true)
        }else{
            //VAI PARA A PRÓXIMA QUESTÃO
            setQuestIndex(questIndex + 1)
            //AUMENTA A PORCENTAGEM QUE O USUÁRIO FEZ DA PROVA
            setYourPercent(percentageFinalized * questIndex + 1)
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR VOLTAR PARA A PÁGINA ANTERIOR
    function prevQuestion() {
        if(Number(questIndex) == 0){
            setQuestFinalized(true)
        }else{
            //VOLTA PARA A QUESTÃO ANTERIOR
            setQuestIndex(questIndex - 1)
        }
    }

    useEffect(() => {
        //VERIFICA A QUANTIDADE DE PORCENTAGEM QUE CADA QUESTÃO VALE
        setPercentageFinalized(100 / questions.length)

        //SETA A PORCENTAGEM FEITA DA PROVA
        setYourPercent(0)
    },[])

    return(
        <>
            <Pressable
                className={`w-full flex-grow-[1] flex-cols items-center justify-start ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
                <View className={`w-[90%] flex flex-col items-center justify-start`}>
                    
                    <View className={`w-[90%] mt-8 justify-center flex flex-row items-center mb-5`}>
                        <TitlePage text={`${matterName}`} />
                    </View>

                    {questFinalized == false && (
                        <View className={`w-full border-[2px] ${theme == 'light' ? 'border-my-black' : 'border-my-white'} min-h-[30px] rounded-[30px] relative overflow-hidden`}>
                            <View style={{ width: `${yourPercent}%` }} className={`min-h-[30px] bg-my-secondary rounded-tr-[20px] rounded-br-[20px]`}></View>
                        </View>
                    )}

                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}
                        style={{ minWidth: '100%', maxHeight: '83.42%' }}
                    >
                        <View className={`w-[100%] flex flex-col items-center justify-start`}>

                        {questFinalized == false ? (
                            <>
                                <View className={`flex flex-col items-center border-[1px] ${theme == 'light' ? 'border-my-black' : 'border-my-white'} my-2 mt-5 p-4 pt-1 rounded-[20px] min-h-[100px] overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>
                                    <Text className={`text-[20px] font-medium mb-1 ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{questIndex + 1} - {questions[questIndex].content}</Text>
                                    <Text className={`text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} `}>{questions[questIndex].answer}</Text>
                                </View>

                                <View
                                    className='mt-1 w-full flex flex-col'
                                >
                                    {questions[questIndex].questions.map((quest:string, i:number) => (
                                        <Text
                                            key={i}
                                            className={`
                                                text-[16px] border-[1px] py-2 my-1 px-3 rounded-[40px]
                                                ${theme == 'light' ? 'border-my-black' : 'border-my-white'}
                                                ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                                            `}
                                        >{options[i]}) {quest}</Text>
                                    ))}
                                </View>

                                <View className={`w-full flex flex-row mt-3 pl-[10px] pb-1 ${questIndex >= 1 ? 'justify-between' : 'justify-end'}`}>
                                    {questIndex >= 1 && (
                                        <Pressable className={`flex bg-my-secondary items-center justify-between px-3 py-2 rounded-[30px] text-my-white  border-[1px] border-my-secondary`} onPress={() => prevQuestion()}>
                                            <View className={`flex flex-row`}>
                                                <Ionicons name='chevron-back-outline' size={20} color={`${theme == 'light' ? '#ffffff' : '#000000'}`} />
                                                <Text className={`${theme == 'light' ? 'text-my-white' : 'text-my-black'} capitalize font-medium text-[12px] flex-grow-[1]`}>questão anterior</Text>
                                            </View>
                                        </Pressable>
                                    )}

                                    <Pressable className={`flex self-end bg-my-secondary items-center justify-between px-3 py-2 rounded-[30px] text-my-white border-[1px] border-my-secondary`} onPress={() => nextQuestion()}>
                                        <View className={`flex flex-row`}>
                                            <Text className={`${theme == 'light' ? 'text-my-white' : 'text-my-black'} capitalize font-medium text-[12px] flex-grow-[1]`}>{questIndex + 2 == questions.length ?'finalizar' : 'próxima questão'}</Text>
                                            <Ionicons name='chevron-forward-outline' size={20} color={`${theme == 'light' ? '#ffffff' : '#000000'}`} />
                                        </View>
                                    </Pressable>
                                </View>
                            </>
                        ) : (
                            <>
                                <Text className={`text-[18px] font-medium mb-[20px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Parabéns</Text>
                                <Text className={`text-[16px] mb-[20px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Parabéns prova finalizada</Text>
                                <View className={`mb-[20px]`}>
                                    <Ionicons name='happy-outline' size={140} color={`${theme == 'light' ? '#818181' : '#c0c0c0'}`} />
                                </View>
                                <MyButton text="voltar" event={() => navigation.navigate('Materias')} />
                                
                                {/* <TitlePage text='Parabéns'/>
                                <p className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Parabens Prova finalizada</p>
                                <RiEmotionHappyFill className={`text-[140px] ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} />
                                <Button route='/materias' text='Voltar' /> */}
                            </>
                        )}
                        </View>
                    </ScrollView>
                </View>
            </Pressable>
        </>
    )
}