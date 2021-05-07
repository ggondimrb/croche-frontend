import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorSelected:string;
}

const ButtonColor: React.FC<ButtonProps> = ({colorSelected, ...rest}) => {      

  function getRgbColor() : string {

    if(colorSelected === 'VERDE') {
      return '#008000';
    } else if (colorSelected === 'AZUL') {
      return '#0066CC';
    } else if (colorSelected === 'VERMELHO') {
      return '#c70000';
    } else if (colorSelected === 'ROXO') {
      return '#9400D3';
    }
    return '';
  }

  return (    
      <Container backgroundColor={() => getRgbColor()} {...rest}/>              
  );
};

export default ButtonColor;
