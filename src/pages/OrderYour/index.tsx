import React from "react";
import Header from "../../components/SubHeader";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import SubHeader from "../../components/SubHeader";

import { Container, Form } from "./styles";

const OrderYour: React.FC = () => {
  return (
    <Container>
      <Header />
      <SubHeader />
      <Form>
        <Input name="email" label="Email" />
        <TextArea
          name="descricao"
          label="Descrição do Pedido"
          placeholder="Descreva o produto que deseja com o máximo de detalhes possível"
        />
        <button type="submit">Enviar Solicitação</button>
      </Form>
    </Container>
  );
};

export default OrderYour;
