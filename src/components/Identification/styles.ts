import styled from 'styled-components';
import Button from '../../components/Button';

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;  
  margin: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  padding: 10px;
  width: 50%;

  header {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #d7d8da;    
    align-items: end;  
    margin-bottom: 10px;  

    h2 {
      margin-left: 10px;
    }
  }

  h2 {
      margin-top: 15px;
    }

  input {
    width: 500px;
    height: 3rem;
    margin-top: 0.2rem;
    margin-bottom: 0.4rem;
    border-radius: 0.8rem;
    background: var(--color-input-background);
    border: 1px solid var(--color-line-in-white);
    outline: 0;
    padding: 0 1.6rem;
    color: var(--primary);

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

    label {
      font-size: 1rem;
      color: var(--primary);
    }
  }

`;

export const ButtonConfirm = styled(Button)`
  width: 500px;
  margin-top: 50px;
  margin-left: 0;
`;