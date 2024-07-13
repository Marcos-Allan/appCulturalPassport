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

//IMPORTAÇÃO DA INICIALIZAÇÃO DA APLICAÇÃO E DOS SERVIÇOS DO FIREBASE
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { getStorage } from "firebase/storage"

//CONFIGURAÇÃO DA CONTA DO FIREBASE PARA CONSEGUIR USAR OS SERVIÇOS
const firebaseConfig = {
  apiKey: "AIzaSyCeSH-qr4HpnIcwNiHsbQ-wsQ8F85IsWvE",
  authDomain: "cultural-passport-78148.firebaseapp.com",
  projectId: "cultural-passport-78148",
  storageBucket: "cultural-passport-78148.appspot.com",
  messagingSenderId: "418419777954",
  appId: "1:418419777954:web:86105e4a534747a5e092fb"
};

//INICIA A APLICAÇÃO DO FIREBASE
const app = initializeApp(firebaseConfig);

//INICIA O SERVIÇO DE AUTENTICAÇÃO DO FIREBASE
const auth = getAuth(app);

//INICIA O PROVEDOR DO GOOGLE
const provider = new GoogleAuthProvider();

//
const storage = getStorage(app)

//EXPORTA AS FUNÇÕES CRIADAS ACIMA
export { signInWithRedirect, auth, provider, getRedirectResult, GoogleAuthProvider, storage }