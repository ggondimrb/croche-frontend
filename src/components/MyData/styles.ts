import styled from 'styled-components';
import { Form } from 'antd';

export const FormData = styled(Form)`
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 500px;
    border: 1px solid #d8966e;
    padding: 20px;
    border-radius: 25px;
    align-items: center;

    div > div {
        input {
            width: 400px;
        }
    }
`;

export const FormEditAdress = styled(Form)`
    
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        
        input {
            width: 400px;
        }        
    }
`;

export const Container = styled.div`

`;

export const Line = styled.span`
    border: 1px solid #d8966e;
    margin: 0 50px;
    height: 200px;
`;
