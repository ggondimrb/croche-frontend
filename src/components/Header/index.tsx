import React from "react";
import { Link } from "react-router-dom";

import { Container, Wrapper, Left, Right, Instagram } from "./styles";

import instagram from "../../assets/images/instagram.png";
import { useAuth } from "../../contexts/auth";

const Header: React.FC = () => {
  const {signed, user, signOut} = useAuth();

  return (
    <Container>   
      <Wrapper>
        <Left>
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
