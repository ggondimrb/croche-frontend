import React from "react";
import { useParams } from "react-router";

import { Container, Wrapper } from "./styles";
import BottomBar from "../../components/BottomBar";
import Main from "../../components/Main";

import DefaultLayout from "../DefaultLayout";
import MenuBar from "../../components/MenuBar";

interface RouteParams {
	categoria: string
}

const Home: React.FC = () => {
  const params = useParams<RouteParams>();

  return (
    <Container>
      <DefaultLayout/>
      <MenuBar/>
      <Wrapper>        
        <Main categoria={params.categoria}/>
      </Wrapper>
      <BottomBar />
    </Container>
  );
};

export default Home;
