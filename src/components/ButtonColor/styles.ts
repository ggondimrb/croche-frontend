import styled from 'styled-components';

interface ContainerProps {
  backgroundColor: () => string;
}

export const Container = styled.button<ContainerProps>`
  width:40px;
  height:40px;
  background-color: ${props => props.backgroundColor };
  transition: filter 0.2s;
  border-radius: 20px;

  :hover {
    filter: brightness(0.9);
  }
`;
