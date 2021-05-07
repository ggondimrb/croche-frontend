import React, { TextareaHTMLAttributes } from "react";

import { Container, Label, InputField } from "./styles";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const TextArea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <InputField id={name} {...rest} />
    </Container>
  );
};

export default TextArea;
