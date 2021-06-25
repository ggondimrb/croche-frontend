import React from "react";
import Routes from "./routes";
import {CartProvider} from "./contexts/cart";
import {ToastContainer} from 'react-toastify';

import GlobalStyles from "./styles/GlobalStyles";
import { AuthProvider } from "./contexts/auth";
import { MenuProvider } from "./contexts/menu";

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider> 
        <MenuProvider>
          <Routes />
        </MenuProvider>   
        <GlobalStyles />
        <ToastContainer autoClose={3000}/>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
