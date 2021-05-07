import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;  
  align-self: center;
  width: 100%;
  max-width: 1025px;
  margin-top: 5px;
  border-top: 1px solid #d8966e;  
  padding-top: 5px;

  h1 {
    font-size: 14px;
    color: #111;
    margin-bottom: 10px;
    display: flex;
    align-items: baseline;
  }

  ul {
    list-style-type: none;
    text-transform: uppercase;
    width: 100%;
    text-align: center;
    font-weight: 400;
    letter-spacing: 0.1em;
    justify-content: space-between;  
    margin-top: 5px;
  }

  li {
    display: inline-block;
    width: 16%;
  }

  li a {
    text-decoration: none;
    color: #111;

    &:hover {
      color: #5e2129;
    }
  }
`;