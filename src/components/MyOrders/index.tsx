import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import { Container } from './styles';
import { toast } from 'react-toastify';

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
  id: number;
  amount: number;
  price: number;
  product : {
    id: number;
    nome: string;
    descricao: string;
    ehTamanhoUnico: string;
    urlImagens: string[];
  }
}

export default function MyOrders() {
  const [orders, setOrders] = useState<IOrders[]>([]);
  const {getToken, refreshToken} = useAuth();

  useEffect(() => {
    loadOrders();
    
    async function loadOrders(){
      await api.get('/orders',
      {headers:{Authorization: `Bearer ${getToken()}`}})
      .then((response) => {
        setOrders(response.data.content);
      })
      .catch((error) => {
        refreshToken();
        toast.error(error.message);
      }); 
    }
  },[getToken, refreshToken])

  return (
    <Container>
      <h1>Pedidos</h1>
      <ul>
        {orders && orders.map((order: IOrders) => {
          return order.itens.map((item: IItem) => ( 
            <li key={item.product.id}>
              <div>
                <img alt={item.product.nome} src={item.product.urlImagens && item.product.urlImagens[0]}/>
                <h3>{item.product.nome}</h3>
                <p>Cor: <strong>Azul</strong></p>
                <p>Tamanho: <strong>{item.product.ehTamanhoUnico === 'S' ? 'Único' : item.product.ehTamanhoUnico}</strong></p>
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
                <Link to={`/order/${order.id}`}>
                  <Button>Ver detalhes</Button>
                </Link>
              </div>
            </li>
            ))
            })}
      </ul>
    </Container>
  );
};
