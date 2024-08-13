//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { Pressable, Text } from 'react-native'

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated'

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    background: number,
    title: string,
    key: number,
    event?: () => void,
}

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function ContentCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //UTILIAÇÃO DO HOOK useState
    const [color, setColor] = useState<string>('')

    //CRIA UMA REFERÊNCIA PARA O ESTADO DA ANIMAÇÃO
    const scaleValue = useSharedValue(1)

    //FUNÇÃO CHAMADA AO CLICAR NO COMPONENTE
    const handleButtonClick = () => {
        //EXECUTA A ANIMAÇÃO
        scaleValue.value = withTiming(0.8, { duration: 300 });

        //FUNÇÃO CHAMADA APÓS 0.3 SEGUNDOS
        setTimeout(() => {
            //VOLTA O COMPONENTE PARA O ESTADO ORIGINAL
            scaleValue.value = withTiming(1, { duration: 150 });
        }, 300);
    };

    //CRIA UM ESTILO ANIMADO DPENDENDO DO DO VALOR DA VARIÁVEL DE REFERÊNCIA
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scaleValue.value },
            ]
        }
    })

    //FUNÇÃO CHAMADA AO CARREGAR A PAGINA
    useEffect(() => {
        //VERIFICA QUAL A COR ESCOLHIDA PARA O BACKGROUND
        if(props.background == 0 || props.background == 3 || props.background == 6 || props.background == 9){
            setColor('#191D1F')
        }else if(props.background == 1 || props.background == 4 || props.background == 7 || props.background == 10){
            setColor('#B47C49')
        }else{
            setColor('#723F28')
        }
    },[])

    return(
        <Pressable
            onPress={() => {
                handleButtonClick()
                setTimeout(() => {
                    props.event && props.event()
                }, 375);
            }}
            className={`w-full`}>
            <Animated.View
                style={[{
                    width: '100%',
                    marginBottom: 12,
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: 24,
                    paddingTop: 20,
                    paddingBottom: 20,
                    borderWidth: 2,
                    borderColor: `${theme == 'light' ? '#000000' : '#ffffff'}`,
                    backgroundColor: `${color}`
                }, animatedStyle]}
            >
                <Text className={`capitalize font-semibold text-[18px] text-my-white text-center`}>{props.title}</Text>
            </Animated.View>
        </Pressable>
    )
}