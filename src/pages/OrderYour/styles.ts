import styled from "styled-components";

export const Container = styled.div`
  background: #d3d3d3;
`;

export const Form = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 10px auto;
  flex-direction: column;
  align-items: center;
  padding-bottom: 70px;

  button {
    margin-top: 5px;
    width: 20rem;
    float: right;
    height: 3rem;
    border-radius: 25px;
    background-color: var(--color-secundary);
    color: var(--color-background);
    font-weight: bold;
    transition: background 0.2s;
    cursor: pointer;

    &:hover {
      background: var(--color-secundary-dark);
    }
  }
`;
