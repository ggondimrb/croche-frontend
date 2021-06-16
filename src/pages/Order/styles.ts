import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fadcc4;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 73.9vh;
  justify-content: center;
  margin: 10px auto;  
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;

  p {
    line-height: 15px;
  }

  div {
    display: flex;
    flex-direction: row;

    div {
      display: flex;
      flex-direction: column;  
    }
  }
  
`;

export const DeliveryAndItens = styled.div`

`;

export const BuyResume = styled.div`

`;

