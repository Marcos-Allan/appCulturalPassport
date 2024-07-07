//IMPORTAÇÃO DOS COMPONENTES NATIVOS
import { View, Pressable, Text } from 'react-native'

//IMPORTAÇÃO DOS ICONES
import { MaterialCommunityIcons, Ionicons, FontAwesome, Octicons,  } from '@expo/vector-icons';

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    route: string,
    eventH: () => void
    eventE: () => void
    eventMP: () => void
    eventA: () => void
    eventN: () => void
}

export default function BottomNavigation(props: Props) {

    return(
        <View className={`flex flex-row items-center justify-between absolute bottom-0 w-full bg-my-secondary py-[20px] h-[9%] px-[40px]`}>
            <Pressable
                onPress={() => props.eventH()}
                className={`flex items-center felx-col gap-[6px]`}
            >
                <View className={`w-[42px] h-[42px] flex items-center justify-center ${props.route == 'home' && 'bg-my-terciary'} p-[6px] rounded-[50px]`}>
                    <Octicons name='home' size={26} color={'white'} />
                </View>
                <Text className={`text-my-white text-[8px] font-medium capitalize`}>Home</Text>
            </Pressable>
            <Pressable
                onPress={() => props.eventA()}
                className={`flex items-center felx-col gap-[6px]`}
            >
                <View className={`w-[42px] h-[42px] flex items-center justify-center ${props.route == 'achievements' && 'bg-my-terciary'} p-[6px] rounded-[50px]`}>
                    <MaterialCommunityIcons name='trophy-outline' size={26} color={'white'} />
                </View>
                <Text className={`text-my-white text-[8px] font-medium capitalize`}>conquistas</Text>
            </Pressable>
            <Pressable
                onPress={() => props.eventE()}
                className={`flex items-center felx-col gap-[6px]`}
            >
                <View className={`w-[42px] h-[42px] flex items-center justify-center ${props.route == 'exercises' && 'bg-my-terciary'} p-[6px] rounded-[50px]`}>
                    <FontAwesome name='address-book-o' size={26} color={'white'} />
                </View>
                <Text className={`text-my-white text-[8px] font-medium capitalize`}>exercicios</Text>
            </Pressable>
            <Pressable className={`flex items-center felx-col gap-[6px]`}>
                <View className={`w-[42px] h-[42px] flex items-center justify-center ${props.route == 'chat' && 'bg-my-terciary'} p-[6px] rounded-[50px]`}>
                    <Ionicons name='chatbubbles-outline' size={26} color={'white'} />
                </View>
                <Text className={`text-my-white text-[8px] font-medium capitalize`}>chat</Text>
            </Pressable>
            <Pressable
                onPress={() => props.eventN()}
                className={`flex items-center felx-col gap-[6px]`}
            >
                <View className={`w-[42px] h-[42px] flex items-center justify-center ${props.route == 'notifications' && 'bg-my-terciary'} p-[6px] rounded-[50px]`}>
                    <Ionicons name='notifications-outline' size={26} color={'white'} />
                </View>
                <Text className={`text-my-white text-[8px] font-medium capitalize`}>notificação</Text>
            </Pressable>
            <Pressable
                onPress={() => props.eventMP()}
                className={`flex items-center felx-col gap-[6px]`}
            >
                <View className={`w-[42px] h-[42px] flex items-center justify-center ${props.route == 'perfil' && 'bg-my-terciary'} p-[6px] rounded-[50px]`}>
                    <Ionicons name='person-outline' size={26} color={'white'} />
                </View>
                <Text className={`text-my-white text-[8px] font-medium capitalize`}>perfil</Text>
            </Pressable>
        </View>
    )
}