import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  background: #040404;
  margin: auto;  
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%; 
  max-width: 1025px;
  margin: auto;  
  align-items: center;
`;

export const Left = styled.div`  
  display: flex;
  text-align: left;
  flex-direction: row;
  width: 50%;    

  h4 {
    color: white;        
    line-height: 3;
  }

  a {
    color: white;
    line-height: 3;
  }

  a:before {
    content: "•";
    margin: 0 7px 0 10px;
  }
`;

export const Right = styled.div`
  display: flex;
  text-align: right;
  flex-direction: row;
  width: 50%;  
  justify-content: flex-end;
  align-self: center;

  a {
    width: 100%;
    color: white;
    text-decoration: none;   
    align-self: center;
    margin-bottom: 2px;
  }

`;

export const Instagram = styled.img`
  width: 30px;
  height: 30px;
  margin: 5px;
`;
