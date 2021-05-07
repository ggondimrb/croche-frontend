import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;  
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  max-width: 1025px;
  margin: auto;  
  background: #fadcc4;      
  align-content: space-between;  
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
  justify-self: right;

  &:hover {
    opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #fff;
    }
  }
`;


export const Logo= styled.img`
`;
