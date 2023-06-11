import styled from 'styled-components';

interface StContainerProps {
  isDraggingOver: boolean;
}

export const StContainer = styled.div`
  background-color: white;
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 33.3%;
  display: flex;
  flex-direction: column;
`;

export const StTitle = styled.h3`
  padding: 8px;
`;

export const StTaskList = styled.div<StContainerProps>`
  padding: 8px;
  background-color: ${({ isDraggingOver }) => isDraggingOver ? 'skyblue' : 'inherit'};
  transition: background-color .2s ease-out;
  flex-grow: 1;
  min-height: 100px;
`;

export const StHeaderContainer = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
