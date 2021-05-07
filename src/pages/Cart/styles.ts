import styled from "styled-components";
import { darken } from 'polished';
import InputMask from 'react-input-mask';
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fadcc4;
  align-items: center;
  width: 100%;
`;

export const CartView = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 10px auto;
  margin-top: 10px;
  width: 100%;
  max-width: 1200px;
  
  min-height: 79vh;

  ::-webkit-scrollbar {
    width: 10px;
//    background-color: #f5f5f5;    
  }

  ::-webkit-scrollbar:disabled {
    width: 0;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    display: flex;
  }
`;

export const Products = styled.div`  

  h1:first-child {
    padding-left: 20px;
    font-weight: 700;
  }

`;

export const Item = styled.div`
  padding: 0 10px;
  background-color: var(--background);
  box-shadow: 5px 5px 5px #a9a9a9;
  margin:15px;
  width: 600px;

  footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px;

    div {
      display: flex;
      flex-direction: row;
      
      small {
        padding-right: 10px;
        padding-top: 8px;
        font-size: 14px;
      }
      
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;  

        input {
          width: 50px;
          height: 40px;
          margin: 0 10px;
          border: 1px solid #dfdfdf;
          border-radius: 5px;
        }

      }

    }

    input {
      margin: 0 10px;
      text-align: center;
      justify-content: center;
    }
  }

`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #d7d8da;

  img {
    height: 150px;
    border-radius: 15px;
    margin: 15px;
  }
`;

export const DescriptionProduct = styled.div`
  margin-left: 15px;
  margin-top: 15px; 
  width: 100%; 

  div:first-child {
    display: flex;
    justify-content: space-between;

    strong {
      font-size: 22px;
    }
  }
  
  button {
    padding-right: 20px;
  }

  span {
    font-weight: 600;
    color: #666;
  }

  small {
    font-weight: 400;
    font-size: 14px;
    color: #a8acaf;    
  }
`;

export const OrderAndFret = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px;
`;

export const OrderSummary = styled.div`
  height: 100%;
  max-height: 400px;
  background: #fff;  
  box-shadow: 5px 5px 5px #a9a9a9; 
  text-align: center;  
  margin-top: 38px; 

  div {
    display: flex;
    justify-content: space-between;
    margin: 10px;

    h5 {
      margin-left: 20px;
    }
  }

  h1 {
    color: #999;
    font-weight: bold;
    font-size: 20px;
    padding: 20px 20px;
  }
  
  strong {
    font-size: 20px;
  }

  hr {
      border: 0;
      height: 1px;
      background: #b48484;
      margin: 10px 10px 20px;
  }

`;

export const CalculateFret = styled.div`
  display: flex;  
  width: 100%;
  background: #fff;  
  margin-top: 10px;
  padding: 10px;
  box-shadow: 5px 5px 5px #a9a9a9; 

  div {
    width: 300px;
    font-size: 18px;
    color: #999;

    input {
      width: 250px;
    }
  }
`;

export const InputFret = styled(InputMask)`
  height: 3rem;
  margin-top: 0.2rem;
  margin-bottom: 0.4rem;
  border-radius: 0.8rem;
  background: var(--color-input-background);
  border: 1px solid var(--color-line-in-white);
  outline: 0;
  padding: 0 1rem;
  color: var(--primary);
`;

export const ButtonFret = styled(Button)`
  width: 100px;
  margin-top: 30px;
`;

export const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;

  h1 {
    color: #333;
  }

  strong {
    padding-bottom:15px;
  }
`;

export const HomePageLink = styled(Link)`  
    text-decoration:none;  
    background: #007389;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 12px 20px;
    font-weight: bold;
    text-transform: uppercase;

    &:hover {
      background: ${darken(0.03, '#007389')};
    }  
`;

export const ButtonContinue = styled(Button)`
  max-width: 300px;
  font-size: 20px;
`;

export const ImageLink = styled(Link)`
  text-decoration:none;  
`;