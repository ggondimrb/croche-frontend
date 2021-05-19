import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fadcc4;
  width: 100%;
  min-height: 95vh;

  p {
    align-self: center;
    font-size: 24px;
    font-weight: bold;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 20px;
  width: 100%;
  max-width: 1300px;
  min-height: 79vh;

  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);    
  }

  @media (max-width: 915px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);    
  }

  @media (max-width: 650px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr); 
  }
  
`;

export const Item = styled.div`
  display: flex;
  padding: 0 10px;
  background-color: var(--background);
  box-shadow: 0 0 17px 5px #a9a9a9 !important;
  margin:5px;
`;

export const ListItem = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

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

export const Resume = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 800px;
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

export const DeliveryAddress = styled.div`
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

  div {
    display: flex;
    flex-direction: column;    
  } 

`;

export const PayMethod = styled.ul`
    li > div {
      display: flex;
      flex-direction: row;
      align-items: baseline;

      h3 {
        margin-left: 6px;
      }

    }
`;

export const ItemResume = styled.li`
  display: flex;
  flex-direction: row;  
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: flex-start;
  
  img {
    width: 120px;
    height: 120px;   
    margin-right: 10px; 
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

`;