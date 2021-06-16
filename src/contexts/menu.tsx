import React, { createContext, useState, useContext, ReactNode } from "react";

interface MenuContextData {
  setPathSelect:(path:string) => void;
  showOrders: boolean;
  showAdress: boolean;
  showPersonalData: boolean;
}

const MenuContext = createContext<MenuContextData>({} as MenuContextData);

type MenuContextProviderProps = {
  children: ReactNode;
}

export function MenuProvider({ children }: MenuContextProviderProps) {
  const [showOrders, setShowOrders] = useState<boolean>(false);
  const [showAdress, setShowAdress] = useState<boolean>(false);
  const [showPersonalData, setShowPersonalData] = useState<boolean>(false);

  function setPathSelect(path: string) {

    if(path === 'orders') {
      setShowOrders(true);
    } else if (path === 'adress') {
      setShowAdress(true);
    } else if (path === 'personalData') {
      setShowPersonalData(true);
    }

  }

  const store = {
    setPathSelect,
    showOrders,
    showAdress,
    showPersonalData
  }

  return (
    <MenuContext.Provider value={store}>
      {children}
    </MenuContext.Provider>
  )

}

export const useMenu = () => {
  return useContext(MenuContext);
}