import React, { InputHTMLAttributes } from "react";

import { Container, Label, InputField } from "./styles";

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const InputNumber: React.FC<InputNumberProps> = ({ label, name, ...rest }) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <InputField type="number" id={name} {...rest} />
    </Container>
  );
};

export default InputNumber;
