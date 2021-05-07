import React from "react";
import Routes from "./routes";
import {CartProvider} from "./contexts/cart";
import {ToastContainer} from 'react-toastify';

import GlobalStyles from "./styles/GlobalStyles";
import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <AuthProvider>
      <CartProvider>    
        <Routes />
        <GlobalStyles />
        <ToastContainer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
