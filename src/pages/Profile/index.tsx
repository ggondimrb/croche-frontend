import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

import DefaultLayout from '../DefaultLayout';

import { Container, Wrapper, SideMenu, MyOrders, MyAdress } from './styles';

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Orders',
    path: 'orders',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Adress',
    path: 'adress',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
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

  useEffect(() => {
    if(params.id === 'orders') {
      setShowOrders(true);
    } else if (params.id === 'adress') {
      setShowAdress(true);
    }

  },[showOrders, params.id])

  return (
    <Container>
      <DefaultLayout />
      <Wrapper>
        <SideMenu>
        {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={`${item.path}`}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
        })}
        </SideMenu>

      </Wrapper>
      {showOrders && <MyOrders><h1>Meus Pedidos</h1></MyOrders>}
      {showAdress && <MyAdress><h1>Meus Endereços</h1></MyAdress>}
      <h1>Profile</h1>
    </Container>
  );
};
