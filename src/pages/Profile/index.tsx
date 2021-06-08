import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdLocalShipping, MdHome, MdAccountCircle } from "react-icons/md";

import DefaultLayout from '../DefaultLayout';

import { Container, Wrapper, SideMenu, MyOrders, MyAdress, Right } from './styles';
import Button from '../../components/Button';
import BottomBar from '../../components/BottomBar';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

const SidebarData = [
  {
    title: 'Pedidos',
    path: 'orders',
    icon: <MdLocalShipping size={24} />,
    cName: 'nav-text'
  },
  {
    title: 'Meus Endereços',
    path: 'adress',
    icon: <MdHome size={24} />,
    cName: 'nav-text'
  },
  {
    title: 'Dados Pessoais',
    path: 'personalData',
    icon: <MdAccountCircle size={24} />,
    cName: 'nav-text'
  }
]

type RouteParams = {
	id: string
}

type ResponseOrders = {
  data: {
    content: IOrders[];
  }
}

type IOrders = {
  id: number;
  instant: string;
  totalValue: number;
  deliveryForecast: string;
  deliveryAddress: IAddress;
  itens: IItem[];
}

type IAddress = {
  id: number;
  street: string;
  num: string;
  complement: string;
  district: string;
  city: string;
  cep: string;
}

type IItem = {
  amount: number;
  price: number;
  product : {
    id: number;
    nome: string;
    descricao: string;
    ehTamanhoUnico: string;
  }
}

export default function Profile() {
  const params = useParams<RouteParams>();
  const {getToken} = useAuth();

  const [showOrders, setShowOrders] = useState<boolean>(false);
  const [showAdress, setShowAdress] = useState<boolean>(false);
  const [showPersonalData, setShowPersonalData] = useState<boolean>(false);
  const [pathSelect, setPathSelect] = useState<string>('');
  const [orders, setOrders] = useState<IOrders[]>([]);

  useEffect(() => {
    if(params.id === 'orders') {
      setShowOrders(true);
      setPathSelect('orders');
      loadOrders();
    } else if (params.id === 'adress') {
      setShowAdress(true);
      setPathSelect('adress');
    } else if (params.id === 'personalData') {
      setShowPersonalData(true);
      setPathSelect('personalData');
    }

    async function loadOrders(){
      const response: ResponseOrders = await api.get('/pedidos',
      {headers:{Authorization: `Bearer ${getToken()}`}});

      setOrders(response.data.content)
    }

  },[params.id])

  return (
    <Container>
      <DefaultLayout />
      <Wrapper>
        <SideMenu>
        {SidebarData.map((item, index) => {
              return (
                <Link to={`${item.path}`}>
                  <li key={index} className={pathSelect === item.path ? 'active' : ''}>                  
                      {item.icon}
                      <span>{item.title}</span>
                  </li>
                </Link>
              );
        })}
        </SideMenu>
        <Right>
          {showOrders && 
            <MyOrders>
              <h1>Pedidos</h1>
              <ul>
                {orders && orders.map((order: IOrders) => {
                  return order.itens.map((item: IItem) => ( 
                    <li key={item.product.id}>
                    <div>
                      <img alt="roupa" src="https://curso-spring-ionic-47.s3-sa-east-1.amazonaws.com/bolsa01a.png"/>
                      <h3>{item.product.nome}</h3>
                      <p>Cor: <strong>Azul</strong></p>
                      <p>Tamanho: <strong>{item.product.ehTamanhoUnico}</strong></p>
                      <p>Quantidade: <strong>{item.amount}</strong></p>
                      <p>Valor Unitário: <strong>R$ {item.price}</strong></p>
                    </div>
                    <div>
                      <h3>Resumo da compra</h3>
                      <p>Pedido: <strong>{order.id}</strong></p>
                      <p>Data do Pedido: <strong>{order.instant}</strong></p>
                      <p>Valor Total: <strong>R$ {order.totalValue}</strong></p>
                      <p>Previsão de Entrega: <strong>Até 13/04/2020</strong></p>
                      <p>Status: <strong>Entregue</strong></p>
                      <Button>Ver detalhes</Button>
                    </div>
                  </li>
                   ))}
                  
                  )
                })
              </ul>
            </MyOrders>
          }
          {showAdress && <MyAdress><h1>Meus Endereços</h1></MyAdress>}
          {showPersonalData && <MyAdress><h1>Seus Dados</h1></MyAdress>}
        </Right>
      </Wrapper>
      <BottomBar />
    </Container>
  );
};
