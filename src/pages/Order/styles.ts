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
  
`;

export const DeliveryAndItens = styled.div`
    display: flex;
    flex-direction: column;
`;

export const BuyResume = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #b48484;
    box-shadow: 5px 5px 5px #a9a9a9;
    padding: 20px;

    hr {
      border: 0;
      height: 1px;
      background: #b48484;
      margin: 10px 10px 20px;
  }
`;

export const DeliverySteps = styled.div`
  padding: 20px;    
`;

export const Item = styled.div`
  display: flex;
  padding: 10px;
  
  img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
  }

  aside {
    padding: 10px;
  }
`;

