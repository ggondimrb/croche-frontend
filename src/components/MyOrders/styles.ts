import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 600px;

  h1 {
    text-align: center;
    font-weight: bold;
  }

  li {    
    display: flex;
    flex-direction: row;
    border: 1px solid #d8966e;
    border-radius: 25px;   
    padding: 20px;
    margin: 10px; 
    box-shadow: 5px 5px 5px #a9a9a9;

    div {
      width: 50%;

      h3 {
        font-weight: bold;
      }

      img {
        width: 150px;
        height: 150px;
        padding-bottom: 10px;
      }

      button {
        margin-top: 40px;
      }
    }
  }
`;
