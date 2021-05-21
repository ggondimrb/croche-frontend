import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import OrderYour from "./pages/OrderYour";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function Routes() {
  return (
    <BrowserRouter forceRefresh={true}>
      <Route path="/" exact component={Home} />
      <Route path="/orderYour" component={OrderYour} />
      <Route path="/product/:id" component={Product} />
      <Route path="/cart" component={Cart} />      
      <Route path="/search/:categoria" component={Home} />      
      <Route path="/checkout" component={Checkout} />  
      <Route path="/login/:redirect" component={Login} />  
      <Route path="/register" component={Register} />
      <Route path="/profile/:id" component={Profile} />
    </BrowserRouter>
  );
}

export default Routes;
