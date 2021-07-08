import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdLocalShipping, MdHome, MdAccountCircle } from "react-icons/md";

import { Container } from './styles';
import { useMenu } from '../../contexts/menu';

const SidebarData = [
  {
    title: 'Pedidos',
    path: '/profile/orders',
    icon: <MdLocalShipping size={24} />,
    cName: 'nav-text'
  },
  {
    title: 'Seus dados',
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
    setPathSelect(params.id);
  },[params.id])

  return (
    <Container>
          <ul>
            {SidebarData.map((item, index) => {
                  return (
                    <Link to={`${item.path}`} replace>            
                      <li key={index} className={params.id === item.path ? 'active' : ''}>
                          {item.icon}
                          <span>{item.title}</span>
                      </li>
                    </Link>
                  );
            })}
          </ul>
    </Container>
  );
};

export default ProfileSideBar;
