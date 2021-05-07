import styled from "styled-components";
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

export const Container = styled.div`
  display: flex;
  flex-direction: column;  
  margin-top: 10px;
  width: 100%;
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding-bottom: 10px;

  @media (max-width: 1250px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 820px) {
    grid-template-columns: repeat(1, 1fr);
  }

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 15px;
    box-shadow: 5px 5px 5px #a9a9a9;
    text-decoration:none;

    img {
      align-self: center;
      width: 300px;
      height: 300px;
      border-radius: 10px;
      transition: transform 0.2s;

      &:hover {
        
      }
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      color: #333;
      margin: 5px 0 20px;
    }

    &:hover {
        
      }

    button {
      background: #a17665;    
      border-radius: 4px;            
      margin-top: auto;      
      align-items: center;
      transition: background 0.2s; 
           

      div {
        display: flex;
        align-items: center;
        justify-content:center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
        color: white;
        font-weight:bold;

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;

export const Item = styled.div`
  display: flex;
`;

export const ImageLink = styled(Link)`
  text-decoration:none;  
`;

export const PaginationMain = styled(Pagination)`
    justify-content: center;
    display: flex;
    margin-bottom:20px;    
`;