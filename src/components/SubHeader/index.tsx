import React from "react";
import { Link } from 'react-router-dom';

import { Container, Logo, Cart } from "./styles";
import logo from "../../assets/images/logo-croche.png";
import { MdShoppingBasket } from "react-icons/md";
import SearchBar from "../SearchBar";
import { useCart } from "../../contexts/cart";

const SubHeader: React.FC = () => {
  const {cart} = useCart();
  
  return (
    <Container>    
      <SearchBar/>  
      <Link to="/" style={{justifySelf: 'center'}}>
        <Logo src={logo} alt="logo" />
      </Link>      
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cart.length} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>      
    </Container>
  );
};

export default SubHeader;
