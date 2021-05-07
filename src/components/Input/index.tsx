import React, { InputHTMLAttributes } from "react";

import { Container, Label, InputField } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <InputField type="text" id={name} {...rest} />
    </Container>
  );
};

export default Input;
