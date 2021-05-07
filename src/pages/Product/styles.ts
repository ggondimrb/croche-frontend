import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fadcc4;  
`;

export const Path = styled.div`
  height: 6vh;

  h1 {
    font-size: 14px;
    margin-left: 20px;
    margin-top: 5px;
  }
`;

export const LinkPath = styled(Link)`
  text-decoration: none;
  color: var(--primary);
`;

export const ProductContainer = styled.div`  
  height: 73vh;
  display: grid;  
  grid-template-columns: 1fr 1fr 1fr;

  width: 100%;
  justify-content: center;
  margin: 10px auto;
  

  @media (max-width: 1000px) {
    flex-direction: column;
    display: flex;
    overflow-y: scroll;
  }
`;

export const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-left: 25px;
  margin-top: 5px;
  padding-bottom: 10px;

  strong {
    font-size: 24px;
    padding-bottom: 10px;
  }

  span {
    font-size: 14px;
    padding-bottom: 10px;
  }
`;

export const ProductImages = styled.div`
  display: flex;
  margin-left: 20px;
  img {
    width: 500px;
    height: 500px;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s;

  
  }
`;

export const ProductPrice = styled.div`
  align-items: left;
  display: flex;
  flex-direction: column;
  margin: 10px auto;

  strong {
    font-size: 40px;
    color: var(--twitter-light-hover);
    margin-bottom: 20px;
  }

  ul {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    li {

      button: {
        width: 50px;
        height: 50px;
      }

      img {
        width: 50px;
        height: 50px;
        cursor: pointer;
        border-radius: 5px;       
      }

      .active {
        opacity: 0.9;
        border: solid;
      }
    }
  }
`;

export const ImagesList = styled.div`
  display: flex;
  margin-right: 1rem;

  ul {
    padding: 0 1rem;
    height: 500px;
    overflow-x: auto;

    ::-webkit-scrollbar {
      width: 10px;
      background-color: #f5f5f5;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #555;
    }

    .active {
      opacity: 0.6;
    }
  }

  li {
    height: 80px;
    flex: 0 0 auto;
    img {
      width: 70px;
      height: 70px;
    }
  }
`;
