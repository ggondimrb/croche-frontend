import React, { InputHTMLAttributes } from 'react';

import { Container,Seta } from './styles';

interface ErrorMessageProps extends InputHTMLAttributes<HTMLInputElement> {
  message: string | undefined;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <>
    <Seta />
    <Container>
      <span>O campo {message} é obrigatório</span>
    </Container>
    </>
  );
};

export default ErrorMessage;
