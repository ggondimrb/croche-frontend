import React from 'react';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';

interface DefaultLayoutProps {
  showJustLogo?: boolean;
}

function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>      
      <Header/>      
      <SubHeader showJustLogo={props.showJustLogo}/>      
    </>
  );
}

export default DefaultLayout;
