import { Draggable } from 'react-beautiful-dnd';
import { memo } from 'react';

import { StContainer, StHandle, StText } from './styled';
import RemoveButton from '../RemoveButton';

interface Props {
  task: Task;
  index: number;
  columnId: string;
  onRemoveTask: (taskId: string, columnId: string) => void;
}

function Task({ task, index, columnId, onRemoveTask }: Props) {
  const handleRemoveTask = () => onRemoveTask(task.id, columnId);

  return (
    <Draggable draggableId={task.id} index={index + 1}>
      {(provided, snapshot) => (
        <StContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <StHandle />
          <StText>
            {task.content}
          </StText>
          <RemoveButton onClick={handleRemoveTask} />
        </StContainer>
      )}
    </Draggable>
  );
}

export default memo(Task);
