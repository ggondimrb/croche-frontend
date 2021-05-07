import styled from 'styled-components';

export const Container = styled.div`
  width:100%;
  background-color: #ca4545;
  border-radius: 20px;
  padding: 5px;
  margin: 0 5px;
  margin-bottom: 5px;
  text-align: center;

  
  
  span {
    color: #fff;
  }
`;

export const Seta = styled.div`
  align-self:center;
  content: "";
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  width: 0; 
  height: 0; 

  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 10px solid #ca4545;
`;
