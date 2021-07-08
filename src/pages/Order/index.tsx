import React, { useEffect, useState } from 'react';

import { Steps } from 'antd';
import { useParams } from 'react-router-dom';
import BottomBar from '../../components/BottomBar';
import ProfileSideBar from '../../components/ProfileSideBar';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import DefaultLayout from '../DefaultLayout';

import { Container, Wrapper, Right, BuyResume, DeliverySteps, Item } from './styles';
import Button from '../../components/Button';
import { formatPrice } from '../../util/format';
import { toast } from 'react-toastify';

type RouteParams = {
	id: string
}

type IOrder = {
  id: number;
  instant: string;
  totalValue: number;
  deliveryForecast: string;
  status: string;
  deliveryAddress: {
    id: number,
    street: string,
    num: string,
    complement: string,
    district: string,
    city: string,
    cep: string,
    ehPrincipal: boolean    
  }
  itens: {
    id: number;
    descount: number;
    amount: number;
    price: number;
    product: {
        id: number;
        nome: string;
        descricao: string;
        ehTamanhoUnico: string;
        cores: string[];
        peso: number;
        preco: number;
        precoFormatado: number;
        imagens: [
            {
                id: number;
                url: string;
            }
        ];
        categoria: {
            id: number;
            nome: string;
        },
    }  
  }[]
}

function Order() {
  const {getToken} = useAuth();
  const params = useParams<RouteParams>();
  
  const [order, setOrder] = useState<IOrder>();
  const { Step } = Steps;

  useEffect(() => {
    async function loadOrder() {
      await api.get<IOrder>(`orders/${params.id}`,
      {headers:{Authorization: `Bearer ${getToken()}`}})
      .then((response) => {
        setOrder(response.data);    
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
        toast.error(error);
      });         
    }

    loadOrder();
  }, [params.id, getToken]);

  return (
    <Container>
      <DefaultLayout />
      <Wrapper>
        <ProfileSideBar />
        <Right>
          <h2>Pedido</h2>
          <div>
            <BuyResume>
              <h3>Resumo da compra </h3>
              <DeliverySteps>
                <Steps progressDot current={3}>
                  <Step title="Pedido Realizado" description="30/03/2020 15:33"/>
                  <Step title="Pagamento Confirmado" description="30/03/2020 15:34"/>
                  <Step title="Em Separação" description="30/03/2020 15:34"/>
                  <Step title="Em transporte" description="31/03/2020 15:34"/>
                  <Step title="Pedido Entregue" description="07/04/2020 16:20"/>
                </Steps>
                <Button>
                  Acompanhar Entrega  
                </Button>       
              </DeliverySteps> 
              <hr />
              <h3>Itens do Pedido</h3>
              {order?.itens.map(item => {
                return (
                  <Item>
                    <img src={item.product.imagens[0].url} />
                    <aside>
                      <h3>{item.product.nome}</h3>
                      <p>Quantidade: <strong>{item.amount}</strong></p>
                      <p>Preço: <strong>{item.product.precoFormatado}</strong></p>
                      <p>Total: <strong>{formatPrice(item.product.preco * item.amount)}</strong></p>
                    </aside>
                  </Item>
                )
              })}
              <h3>Valor Total: {order?.totalValue}</h3>
            </BuyResume>
          </div>
        </Right>
      </Wrapper>
      <BottomBar />
    </Container>
  );
};

export default Order;
