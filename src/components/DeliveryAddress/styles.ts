import styled from 'styled-components';

export const Container = styled.div`

`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  padding: 10px;
  

  header {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #d7d8da;    
    margin-bottom: 10px;  

    h1 {
      margin-left: 10px;
    }
  } 

`;
