import styled from 'styled-components';

export const Container = styled.div`
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