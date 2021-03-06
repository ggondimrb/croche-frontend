import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const Label = styled.label`
  font-size: 1rem;
  color: var(--primary);
`;

export const InputField = styled.textarea`
  width: 100%;
  height: 16rem;
  min-height: 8rem;
  margin-top: 0.2rem;
  border-radius: 0.8rem;
  background: var(--color-input-background);
  border: 1px solid var(--color-line-in-white);
  outline: 0;
  resize: vertical;
  padding: 1.2rem 1.6rem;
  color: var(--primary);

  :focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: "";
    background: var(--color-primary-light);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 7px;
  }
`;
