import styled from 'styled-components';

interface StContainerProps {
  isDragging?: boolean;
}

export const StContainer = styled.div<StContainerProps>`
  border: 1px solid lightgray;
  padding: 8px;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${({ isDragging }) => isDragging ? 'lightgreen' : 'white'};
  transition: background-color .2s ease-out;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
`;

export const StHandle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 2px;
`;

export const StText = styled.span`
  flex: 1;
`;
