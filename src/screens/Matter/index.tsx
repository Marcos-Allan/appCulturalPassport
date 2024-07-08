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

//IMPORTAÇÃO DOS COMPONENTES
import Menu from "../../Components/Menu";
import TitlePage from "../../Components/TitlePage";
import MenuButton from "../../Components/MenuButton";
import Return from "../../Components/Return";
import BottomNavigation from "../../Components/BottomNavigation";
import ContentCard from "../../Components/ContentCard";

//TIPAGEEM DAS ROTAS
type Props = StackScreenProps<RootStackParamList, 'Matter'>;

export const Matter:React.FC<Props> = ({ navigation, route }) => {

    //PEGA OS PARAMETROS PASSADOS PARA A PÁGINA
    const { matterName, examName } = route.params

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen } = states

    //UTILIZAÇÃO DO HOOK useState
    const [content, setContent] = useState<any[]>([])

    //FUNÇÃO RESPONSÁVEL POR FECHAR O MENU SE ESTIVER ABERTO
    function closeMenu(){
        if(menuOpen == true){
            toggleMenuOpen()
        }else{
            return
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE CARREGA A PÁGINA
    useEffect(() => {
        closeMenu()

    },[])

    //FUNÇÃO PARA REDIRECIONAR PARA OUTRA PÁGINA
    function redirect(vest:string){

        //FORMATA O CAMPO PARA DEIXAR APENAS AS INICIAIS DO VESTIBULAR
        // const vestibular = vest.split(' ')[0].toLowerCase()

        //NAVEGA PARA A PRÓXIMA PÁGINA
        // navigate(`/materias/${matter}/${vestibular}`)

        console.log('uiii')
    }

    //FUNÇÃO RESPONSÁVEL POR GERAR O CONTEÚDO DEPENDENDO DO PARÂMETRO PASSADO
    function getContent(matter:string) {
        switch (matter) {
            case 'fisíca':
                //FISICA
                    setContent([
                        { title: 'eletrodinamica', background: 0 },
                        { title: 'leis de newton', background: 1 },
                        { title: 'ondulatória', background: 2 },
                        { title: 'campo magnético', background: 3 },
                        { title: 'cinemática', background: 4 },
                        { title: 'óptica', background: 5 },
                        { title: 'mecânica', background: 6 },
                        { title: 'circuitos elétricos', background: 7 }
                    ])
                    break;
                case 'história':
                    //HISTÓRIA
                    setContent([
                        { title: 'brasil colônia', background: 0 },
                        { title: 'idade moderna', background: 1 },
                        { title: 'idade média', background: 2 },
                        { title: 'tempo presente', background: 3 },
                        { title: 'estado novo e populismo', background: 4 }
                    ])
                    break;
                case 'inglês':
                    //INGLÊS
                    setContent([
                        { title: 'tempos verbais em inglês', background: 0 },
                        { title: 'voz passiva em ingles', background: 1 },
                        { title: 'pronomes pessoais', background: 2 },
                        { title: 'Linking words', background: 3 }
                    ])
                    break;
                case 'geografia':
                    //GEOGRAFIA
                    setContent([
                        { title: 'cartografia e leitura de mapas', background: 0 },
                        { title: 'climas do brasil e climas do mundo', background: 1 },
                        { title: 'acordo de paris e conferências ambientais', background: 2 },
                        { title: 'aquecimento global e efeito estufa', background: 3 },
                        { title: 'estruturas geológicas e tipos de relevo', background: 4 },
                        { title: 'biomas do brasil e biomas do mundo', background: 5 },
                        { title: 'matriz de transporte', background: 6 },
                        { title: 'bacias hidrográficas e escassez', background: 7 },
                    ])
                    break;
                case 'artes':
                    //ARTES
                    setContent([
                        { title: 'arte contemporânea', background: 0 },
                        { title: 'convenções teatrais', background: 1 },
                        { title: 'folcloreve folguedos populares', background: 2 },
                        { title: 'tradições de povos indigenas', background: 3 },
                        { title: 'arte de origem africana no brasil', background: 4 }
                    ])
                    break;
                case 'português':
                    //PORTUGUÊS
                    setContent([
                        { title: 'variação linguistica', background: 0 },
                        { title: 'genêros textuais', background: 1 },
                        { title: 'intertextualidade', background: 2 },
                        { title: 'figuras de linguagem', background: 3 }
                    ])
                    break;
                case 'química':
                    //QUÍMICA
                    setContent([
                        { title: 'estudo de moléculas', background: 0 },
                        { title: 'química orgânica', background: 1 },
                        { title: 'reações inorgânicas', background: 2 },
                        { title: 'soluções - concentrações', background: 3 },
                        { title: 'cálculos - estequiométricos', background: 4 },
                        { title: 'eletroquímica', background: 5 },
                        { title: 'termoquímica', background: 6 },
                        { title: 'poluição ambiental', background: 7 },
                    ])
                    break;
                case 'biologia':
                    //BIOLOGIA
                    setContent([
                        { title: 'ecologia', background: 0 },
                        { title: 'fisiologia humana', background: 1 },
                        { title: 'biotecnologia', background: 2 },
                        { title: 'biologia celular', background: 3 },
                        { title: 'botânica', background: 4 },
                    ])
                    break;
                case 'matemática':
                    //MAEMÁTICA
                    setContent([
                        { title: 'analise combinatória', background: 0 },
                        { title: 'porcentagem', background: 1 },
                        { title: 'geometria plana e geometria espacial', background: 2 },
                        { title: 'razão e proporção', background: 3 },
                        { title: 'equações e funções', background: 4 },
                        { title: 'estatística e probabilidade', background: 5 }
                    ])
                break;
        
            default:
                break;
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE CARREGA A PÁGINA
    useEffect(() => {
        //DEFINE O ARRAY COM OS CONTEUDOS
        getContent(matterName.toLowerCase())
    },[])

    return(
        <Pressable
            onPress={closeMenu}
            className={`w-full flex-grow-[1] flex-cols items-center justify-start ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
            <View className={`w-[90%] flex flex-col items-center justify-start`}>
                
                <View className={`w-[90%] mt-8 justify-center flex flex-row items-center mb-5`}>
                    <Return event={() => navigation.goBack()} />
                    <TitlePage text={`${matterName}`} />
                    <MenuButton />
                </View>

                <Text className={` mb-[20px] text-center text-[16px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Conteudos que mais caem no {examName.toUpperCase()}</Text>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}
                    style={{ minWidth: '100%', maxHeight: '77.7%' }}
                >
                    <View className={`w-[100%] flex flex-col items-center justify-start`}>
                        {content.map((cont, i) => (
                            <ContentCard
                                background={cont.background}
                                title={cont.title}
                                key={i}
                            />
                        ))}

                        {matterName == 'fisíca' && (
                            <Pressable 
                                onPress={() => navigation.navigate('Test', { matterName: matterName })}
                                className={`
                                    ml-auto w-auto border-[1px] p-3 rounded-[20px] bg-transparent mb-2
                                    ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white'}
                                `}
                            >
                                    <Text
                                        className={`${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white'}
                                    `}>Fazer Prova</Text>
                            </Pressable>
                        )}
                    </View>
                </ScrollView>
            </View>
            <BottomNavigation
                route="home"
                eventH={() => navigation.navigate('Materias')}
                eventMP={() => navigation.navigate('MyPerfil')}
                eventE={() => navigation.navigate('Exercises')}
                eventA={() => navigation.navigate('Achievements')}
                eventN={() => navigation.navigate('Notifications')}
            />
            <Menu event={() => navigation.navigate('MyPerfil')} />
        </Pressable>
    )
}