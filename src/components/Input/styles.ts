import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const Label = styled.label`
  font-size: 1rem;
  color: var(--primary);
`;

export const InputField = styled.input`
  width: 100%;
  height: 3rem;
  margin-top: 0.2rem;
  margin-bottom: 0.4rem;
  border-radius: 0.8rem;
  background: var(--color-input-background);
  border: 1px solid var(--color-line-in-white);
  outline: 0;
  padding: 0 1.6rem;
  color: var(--primary);
  cursor:${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: "";
    background: var(--color-primary-light);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }
`;
