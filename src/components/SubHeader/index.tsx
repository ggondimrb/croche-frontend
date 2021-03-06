import React from "react";
import { Link } from 'react-router-dom';

import { Container, Logo, Cart } from "./styles";
import logo from "../../assets/images/logo-croche.png";
import { MdShoppingBasket } from "react-icons/md";
import SearchBar from "../SearchBar";
import { useCart } from "../../contexts/cart";

interface SubHeaderProps {
  showJustLogo?: boolean;
}

const SubHeader: React.FC<SubHeaderProps> = ({showJustLogo}) => {
  const {cart} = useCart();
  
  return (
    <Container>    
      {!showJustLogo && <SearchBar/>}
      {showJustLogo && <div/>}
      <Link to="/" style={{justifySelf: 'center'}}>
        <Logo src={logo} alt="logo" />
      </Link>      
      {showJustLogo && <div/>}
      {!showJustLogo && 
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cart.length} itens</span>
        </div>
        <MdShoppingBasket size={36} />
      </Cart>}  
    </Container>
  );
};

export default SubHeader;
