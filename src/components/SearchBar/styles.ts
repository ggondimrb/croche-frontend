import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Container = styled.div`  
  display:flex;  
  margin-top: 54px;
  justify-self: left;
`;

export const SearchInput = styled.input`
    background-color: white;
    padding-left: 10px;
    height:40px;
    width:300px;
    border-radius:20px;
`;

export const SearchButton = styled(Link)`
    background-color:#d8966e;
    width:40px;
    height:40px;
    border-radius:20px;
    margin-left:-35px;
    cursor:pointer;

    :hover {
      background-color:#d8966e;
    }
`;


