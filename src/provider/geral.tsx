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

//IMPORTA OS HOOKS DO REACT PARA CRIAR UM GERENCIAMENTO DE ESTADOS GLOBAIS
import { useState, createContext, useContext, ReactNode } from 'react'

//CRIA E EXPORTA O CONTEUDO DOS ESTADOS
export const MyContext = createContext({})

//TIPAGEM DO USUÁRIO
interface User {
    logged: boolean,
    name: string,
    img: string,
    id: String,
    simulations: any,
    simulationsConcludeds: number,
    cronogram: any,
}

//TIPAGEM DO ALERT
interface Alert {
    type: string,
    text: string,
}

//CRIA E EXPORTA O PROVEDOR DOS ESTADOS
export const MyProvider = ({ children } : { children: ReactNode }) => {
    
    //CRIA ESTADO GLOBAL DE CADA VARIAVEL
    const [theme, setTheme] = useState<string>('light')
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [userS, setUserS] = useState<User>({ logged: false, name: '', img: '', id: '', simulations: [], simulationsConcludeds: 0, cronogram: [] })
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<Alert>({ type: 'undefined', text: 'Alerta simples' })
    const [isLogout, setIsLogout] = useState<boolean>(false)
    const [isDelAccount, setIsDelAccount] = useState<boolean>(false)

    //FUNÇÃO RESPONSAVEL POR TROCAR E SALVAR NO localStorage O TEMA ESCOLHIDO PELO USUÁRIO
    const toggleTheme = () => {
        setTheme(theme == 'light' ? 'dark' : 'light')
    }

    //FUNÇÃO RESPONSAVEL POR ABRIR E FECHAR O MENU
    const toggleMenuOpen = () => {
        setMenuOpen(!menuOpen)
    }
    
    //FUNÇÃO RESPONSAVEL POR ABRIR E FECHAR O MENU
    const toggleUser = (name:string, img:string, id:string, simulations:any, simulationsConcludeds:number = 0, cronogram:any, logged:boolean = true) => {
        setUserS({ logged: logged, name: name, img: img, id: id, simulations: simulations, simulationsConcludeds: simulationsConcludeds, cronogram: cronogram })
    }
    
    //FUNÇÃO RESPONSAVEL POR TROCAR O ESTADO DE LOADING DA APLICAÇÃO
    const toggleLoading = (state:boolean) => {
        setLoading(state)
    }
    
    //FUNÇÃO RESPONSÁVEL POR DETERMINAR O TIPO E O TEXTO DO ALERTA
    const toggleAlert = (type: string, text: string, isVisible:boolean = false, time:number ) => {
        setMessage({ type: type, text: text, isVisible: isVisible, time: time })

        //FUNÇÃO CHAMADA APÓS O TEMPO PASSADO POR PARÂMETROS
        setTimeout(() => {
            setMessage({ type: type, text: text, isVisible: false, time: 0 })
        }, time);
    }

    //FUNÇÃO RESPONSÁVEL POR DAR LOGOUT NA CONTA DO USUÁRIO
    const toggleLogout  = (state:boolean) => {
        setIsLogout(state)
    }
    
    //FUNÇÃO RESPONSÁVEL POR DELETAR NA CONTA DO USUÁRIO
    const toggleDeleteAccount  = (state:boolean) => {
        setIsDelAccount(state)
    }
    
    //RETORNA TUDO PARA SER USADO EM TODO O SITE
    return (
        <MyContext.Provider value={{ theme, toggleTheme, menuOpen, toggleMenuOpen, userS, toggleUser, loading, toggleLoading, message, toggleAlert, isLogout, toggleLogout, isDelAccount, toggleDeleteAccount }}>
            {children}
        </MyContext.Provider>
    )
}

//EXPORTA A VARIAVEL PARA PODER PEGAR O CONTEUDO EM OUTRAS PARTE DA APLICAÇÃO
export const useMyContext = () => useContext(MyContext)