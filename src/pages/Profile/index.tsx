import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdLocalShipping, MdHome, MdAccountCircle } from "react-icons/md";

import DefaultLayout from '../DefaultLayout';

import { Container, Wrapper, SideMenu, MyAdress, Right } from './styles';
import BottomBar from '../../components/BottomBar';
import MyOrders from '../../components/MyOrders';

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

export default function Profile() {
  const params = useParams<RouteParams>();

  const [showOrders, setShowOrders] = useState<boolean>(false);
  const [showAdress, setShowAdress] = useState<boolean>(false);
  const [showPersonalData, setShowPersonalData] = useState<boolean>(false);
  const [pathSelect, setPathSelect] = useState<string>('');

  useEffect(() => {

    if(params.id === 'orders') {
      setShowOrders(true);
      setPathSelect('orders');
    } else if (params.id === 'adress') {
      setShowAdress(true);
      setPathSelect('adress');
    } else if (params.id === 'personalData') {
      setShowPersonalData(true);
      setPathSelect('personalData');
    }

  },[params.id])

  return (
    <Container>
      <DefaultLayout />
      <Wrapper>
        <SideMenu>
          <ul>
            {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={pathSelect === item.path ? 'active' : ''}> 
                      <Link to={`${item.path}`}>            
                            {item.icon}
                            <span>{item.title}</span>
                      </Link>
                    </li>
                  );
            })}
          </ul>
        </SideMenu>
        <Right>
          {showOrders && <MyOrders />}
          {showAdress && <MyAdress><h1>Meus Endereços</h1></MyAdress>}
          {showPersonalData && <MyAdress><h1>Seus Dados</h1></MyAdress>}
        </Right>
      </Wrapper>
      <BottomBar />
    </Container>
  )};
