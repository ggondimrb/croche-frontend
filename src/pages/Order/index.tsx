import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import BottomBar from '../../components/BottomBar';
import ProfileSideBar from '../../components/ProfileSideBar';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import DefaultLayout from '../DefaultLayout';

import { Container, Wrapper, Right, DeliveryAndItens, BuyResume } from './styles';

type RouteParams = {
	id: string
}

type IOrder = {
  id:number;
}

function Order() {
  const {getToken} = useAuth();
  const params = useParams<RouteParams>();
  
  const [order, setOrder] = useState<IOrder>();

  useEffect(() => {
    async function loadOrder() {
      const response = await api.get(`pedidos/${params.id}`,
      {headers:{Authorization: `Bearer ${getToken()}`}});         
      setOrder(response.data);    
      console.log(response.data);
    }

    loadOrder();
  }, [params.id]);

  return (
    <Container>
      <DefaultLayout />
      <Wrapper>
        <ProfileSideBar />
        <Right>
          <h1>Pedido</h1>
          <div>
            <DeliveryAndItens>
              <h1>Entrega </h1>
            </DeliveryAndItens>
            <BuyResume>
              <h1>Resumo da compra </h1>
              <h1>Resumo da compra </h1>
              <h1>Resumo da compra </h1>
            </BuyResume>
          </div>
        </Right>
      </Wrapper>
      <BottomBar />
    </Container>
  );
};

export default Order;
