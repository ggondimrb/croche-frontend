import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdLocalShipping, MdHome, MdAccountCircle } from "react-icons/md";

import { Container } from './styles';
import { useMenu } from '../../contexts/menu';

interface ProfileSideBarProps {
  pathSelect: string;
}

const SidebarData = [
  {
    title: 'Pedidos',
    path: '/profile/orders',
    icon: <MdLocalShipping size={24} />,
    cName: 'nav-text'
  },
  {
    title: 'Meus Endereços',
    path: '/profile/adress',
    icon: <MdHome size={24} />,
    cName: 'nav-text'
  },
  {
    title: 'Dados Pessoais',
    path: '/profile/personalData',
    icon: <MdAccountCircle size={24} />,
    cName: 'nav-text'
  }
]

type RouteParams = {
	id: string
}

function ProfileSideBar() {
  const params = useParams<RouteParams>();
  const {setPathSelect} = useMenu();

  useEffect(() => {
    console.log(params.id);
    setPathSelect(params.id);

  },[params.id])

  return (
    <Container>
          <ul>
            {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={params.id === item.path ? 'active' : ''}> 
                      <Link to={`${item.path}`} replace>            
                            {item.icon}
                            <span>{item.title}</span>
                      </Link>
                    </li>
                  );
            })}
          </ul>
    </Container>
  );
};

export default ProfileSideBar;
