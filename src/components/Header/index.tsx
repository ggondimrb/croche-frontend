import React from "react";
import { Link } from "react-router-dom";

import { Container, Wrapper, Left, Right, Instagram } from "./styles";

import { MdAccountCircle } from "react-icons/md";
import instagram from "../../assets/images/instagram.png";
import { useAuth } from "../../contexts/auth";

const Header: React.FC = () => {
  const {signed, user, signOut} = useAuth();

  return (
    <Container>   
      <Wrapper>
        <Left>
          {signed && <Link to="/profile/orders">
          <MdAccountCircle 
            size={36} 
            style={{ fill: '#fff', marginTop:'3', marginRight:'5' }}/>
          </Link>}
          <h4>Olá {user ? user.name : ''}!</h4>
          {!signed && <Link to="/login/home">Entrar</Link>}
          {!signed && <Link to="/register">Cadastrar</Link>}
          {signed && <Link onClick={signOut} to="/">Sair</Link>}
        </Left> 
        <Right>
          <a href="https://www.instagram.com/crochedemainha.art" >
            <Instagram src={instagram} alt="instagram" />
          </a>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
