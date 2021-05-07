import React from "react";

import { Container, Instagram, Social } from "./styles";

import instagram from "../../assets/images/instagram.png";

const BottomBar: React.FC = () => {
  return (
    <Container>      
      <Social>
        <h1>© 2020 - Crochê de Mainha - Todos os direitos reservados.</h1>
        <a href="https://www.instagram.com/crochedemainha.art" >
          <Instagram src={instagram} alt="instagram" />
        </a>
      </Social>      
    </Container>
  );
};

export default BottomBar;
