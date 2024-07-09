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
import { useState, createContext, useContext } from 'react'

//CRIA E EXPORTA O CONTEUDO DOS ESTADOS
export const MyContext = createContext({})

//TIPAGEM DO USUÁRIO
interface User {
    logged: boolean,
    name: string,
    img: string,
    id: String
}

//TIPAGEM DO ALERT
interface Alert {
    type: string,
    text: string,
    isVisible: boolean,
    time: number,
}

//CRIA E EXPORTA O PROVEDOR DOS ESTADOS
export const MyProvider = ({ children } : { children: React.ReactNode }) => {

    //CRIA ESTADO GLOBAL DE CADA VARIAVEL
    const [theme, setTheme] = useState<string>('light')
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [userS, setUserS] = useState<User>({ logged: false, name: '', img: '', id: '' })
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<Alert>({ type: 'undefined', text: 'Alerta simples', isVisible: false, time: 0 })

    //FUNÇÃO RESPONSAVEL POR TROCAR E SALVAR O TEMA ESCOLHIDO PELO USUÁRIO
    const toggleTheme = () => {
        //SETA O VALOR DA VARIAVEL GLOBAL
        setTheme(theme == 'light' ? 'dark' : 'light')
    }

    //FUNÇÃO RESPONSAVEL POR ABRIR E FECHAR O MENU
    const toggleMenuOpen = () => {
        //SETA O VALOR DA VARIAVEL GLOBAL
        setMenuOpen(!menuOpen)
    }
    
    //FUNÇÃO RESPONSAVEL POR ABRIR E FECHAR O MENU
    const toggleUser = (name:string, img:string, id:string, logged:boolean = true) => {
        //SETA O VALOR DA VARIAVEL GLOBAL
        setUserS({ logged: logged, name: name, img: img, id: id })
    }
    
    //FUNÇÃO RESPONSAVEL POR TROCAR O ESTADO DE LOADING DA APLICAÇÃO
    const toggleLoading = (state:boolean) => {
        //SETA O VALOR DA VARIAVEL GLOBAL
        setLoading(state)
    }

    //FUNÇÃO RESPONSÁVEL POR DETERMINAR O TIPO E O TEXTO DO ALERTA
    const toggleAlert = (type: string, text: string, isVisible:boolean = true, time: number ) => {
        //SETA O VALOR DA VARIAVEL GLOBAL
        setMessage({ type: type, text: text, isVisible: isVisible, time: time })
        
        //FUNÇÃO CHAMADA APÓS O TEMPO PASSADO POR PARÂMETROS
        setTimeout(() => {
            setMessage({ type: type, text: text, isVisible: false, time: time })
        }, time);
    }

    //RETORNA TUDO PARA SER USADO EM TODO O SITE
    return (
        <MyContext.Provider value={{ theme, toggleTheme, menuOpen, toggleMenuOpen, userS, toggleUser, loading, toggleLoading, message, toggleAlert }}>
            {children}
        </MyContext.Provider>
    )
}

//EXPORTA A VARIAVEL PARA PODER PEGAR O CONTEUDO EM OUTRAS PARTE DA APLICAÇÃO
export const useMyContext = () => useContext(MyContext)