import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import useLocalStorage from '../hooks/useLocalStorage';
import { useCallback } from "react";
import api from "../services/api";

interface AuthContextData {
  signIn:(email:string,senha:string) => void;
  signOut(): void;
  signed: boolean;
  getToken(): string | null;
  getLoading(): boolean | null;
  user: IUser;
  refreshToken(): void;
}

type IUser = {
  id: number;
  name: string;
  cpf: string;
  cellphone: string;
  email: string;  
  street: string;
  num: string;
  complement: string;
  district: string;
  city: string;
  cep: string;
}

type UserProps = {
  id: number;
  name: string;
  email: string;
  cpfOuCnpj: string;
  adresses: IAddress[];
  telefones: string[];
}

type IAddress = {
  street: string;
  num: string;
  complement: string;
  district: string;
  city: string;
  cep: string;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthContextProviderProps) {

  const [storageUser, setStorageUser, removeStorageUser] = useLocalStorage('@authApp: user');
  const [storageToken, setStorageToken, removeStorageToken] = useLocalStorage('@authApp: token');

  const [user, setUser] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(storageUser);
    setLoading(false);       
  }, [user]);

  async function signIn(mail:string,senha:string) {
    
    setLoading(true);

    try {

      removeStorageToken();

      const responseToken = await api.post('/login',{
        email: mail,
        senha
      });                  

      if(responseToken.data){        
        setStorageToken(responseToken.data);

        const response = await api.get<UserProps>(`clientes/${mail}`);  

        const {
          id,
          name, 
          email, 
          adresses,
          cpfOuCnpj,
          telefones
        } = response.data; 
        
        const {street,
          num,
          complement,
          district,
          city,
          cep} = adresses[0];

        const cellphone = telefones[0];

        setStorageUser({
          id,
          name, 
          email, 
          cpf: cpfOuCnpj,
          cellphone,
          street,
          num,
          complement,
          district,
          city,
          cep});

        }          
    } catch (error) {
      setLoading(false);     
    }

    setLoading(false);
    
    // const response = await signInService();
    // setUser(response.user);
    // // api.defaults.headers.Authorization = `Baerer ${response.token}`;
    // setStorageUser(response.user);
    
  }

  async function setDataUser(mail: string) {

  const response = await api.get<UserProps>(`clientes/${mail}`);  

  const {
    id,
    name, 
    email, 
    adresses,
    cpfOuCnpj,
    telefones
  } = response.data; 
  
  const {street,
    num,
    complement,
    district,
    city,
    cep} = adresses[0];

  const cellphone = telefones[0];

  setStorageUser({
    id,
    name, 
    email, 
    cpf: cpfOuCnpj,
    cellphone,
    street,
    num,
    complement,
    district,
    city,
    cep});
  }

  const getToken = () =>{
    return storageToken;
  }

  const getLoading = () =>{
    return loading;
  }

  const signOut = useCallback( () => {
      
    setLoading(true);
    removeStorageUser();
    removeStorageToken();
    setUser({} as IUser);
    setLoading(false);
  }, [removeStorageToken, removeStorageUser]);

  async function refreshToken() {

    try {

      const response = await api.get("auth/refresh_token",
      {headers:{Authorization: `Bearer ${getToken()}`}});
      
      if(response.data){
        setStorageToken(response.data[0]);
        setDataUser(response.data[1]);
      }

    } catch (error) {
      console.log('ERROOOO, LOGUE NOVAMENTE');
      removeStorageUser();
    }

  }

  const store = {
    signIn,
    signOut,
    signed: (storageUser && storageUser.email) ? true : false,
    user: storageUser,
    getToken,
    getLoading,
    refreshToken
  }

  return (
    <AuthContext.Provider value={store}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => {
  return useContext(AuthContext);
}
