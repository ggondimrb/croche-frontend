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
  min-height: 73.9vh;
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

export const MyAdress = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
`;