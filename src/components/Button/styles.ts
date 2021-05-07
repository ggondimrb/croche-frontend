import styled from 'styled-components';

export const Container = styled.button`  
    width: 100%;    
    margin: 5px auto;
    height: 3rem;
    border-radius: 25px;
    background-color: var(--color-secundary);
    color: var(--color-background);
    font-weight: bold;
    transition: background 0.2s;
    cursor: pointer;

    &:hover {
      background: var(--color-secundary-dark);
    }
`;
