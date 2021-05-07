import React from 'react';

import { Container } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: any;
}

const Button: React.FC<ButtonProps> = ({children, ...rest}) => {
  return (
    <Container {...rest}>
      {children}
    </Container>
  );
};

export default Button;
