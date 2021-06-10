import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BottomBar from '../../components/BottomBar';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import DefaultLayout from '../DefaultLayout';

import { Container, Wrapper } from './styles';

type RouteParams = {
	id: string
}

type IOrder = {
  id:number;
}

function Orders() {
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
        <h1>Pedidos</h1>
      </Wrapper>
      <BottomBar />
    </Container>
  );
};

export default Orders;
