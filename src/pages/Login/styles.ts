import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fadcc4;
  width: 100%;
  height: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 50px;
  height: 86vh;
`;

export const Line = styled.span`
    border: 1px solid var(--gray);
    margin: 0 50px;
    height: 350px;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px;
  max-width: 400px;
`;
