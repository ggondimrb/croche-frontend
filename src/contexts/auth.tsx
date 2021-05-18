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
  user: UserProps | null;
}

type ResponseUserProps = {
  data: UserProps;
}

type UserProps = {
  id: number;
  name: string;
  email: string;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthContextProviderProps) {

  const [storageUser, setStorageUser, removeStorageUser] = useLocalStorage('@authApp: user');
  const [storageToken, setStorageToken, removeStorageToken] = useLocalStorage('@authApp: token');

  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storageToken) {      
      refreshToken(storageToken);
      setUser(storageUser);
    }

    setLoading(false);       
    
    async function refreshToken(token:string) {

      try {

        const response = await api.get("auth/refresh_token",
        {headers:{Authorization: `Bearer ${token}`}});
    
        if(response.data){
          setStorageToken(response.data);
        }

      } catch (error) {
        console.log('ERROOOO, LOGUE NOVAMENTE');
        removeStorageUser();
        removeStorageToken();
      }

    }

    // eslint-disable-next-line
  }, [user]);

  async function signIn(email:string,senha:string) {
    
    setLoading(true);

    try {

      removeStorageToken();

      const responseToken = await api.post('/login',{
        email,
        senha
      });                  

      if(responseToken.data){        
        setStorageToken(responseToken.data);
        setDataUser(email);
        console.log(user);
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

  const response: ResponseUserProps = await api.get(`clientes/${mail}`);  

  console.log(response);

  const {name, email} = response.data;    
    setStorageUser({name,email});
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
    setUser({} as UserProps);
    setLoading(false);
  }, [removeStorageToken, removeStorageUser]);

  const store = {
    signIn,
    signOut,
    signed: (user && user.email) ? true : false,
    user,
    getToken,
    getLoading
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
