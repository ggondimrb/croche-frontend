import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fadcc4;
  width: 100%;
  
`;

export const Wrapper  = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
  margin: 10px auto;
`;
export const SideMenu  = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  border: 2px solid #d8966e; 
  margin-right: 50px;
  height: 100%;

  li {
    list-style: none;
    padding: 10px;

    span {
      font-size: 20px;
    }

  }

  a:nth-child(n + 2) {
    border-top: 1px solid #d8966e;    
  }

  .active {
      border-left: 5px solid #d8966e;
      font-weight: bold;
    }
`;

export const Right= styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;

  p {
    line-height: 15px;
  }
  
`;

export const MyOrders  = styled.div`
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

    div {
      width: 50%;

      h3 {
        font-weight: bold;
      }

      img {
        width: 100px;
        height: 100px;
        padding-bottom: 10px;
      }

      button {
        margin-top: 40px;
      }
    }
  }
`;

export const MyAdress = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
`;