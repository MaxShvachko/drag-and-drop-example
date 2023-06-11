import { memo } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from '../Task';
import RemoveButton from '../RemoveButton';
import { StContainer, StHeaderContainer, StTitle, StTaskList } from './styled';

export interface Props {
  index: number;
  tasks: Task[];
  column: Column;
  isDropDisabled?: boolean;
  onRemoveTask: (taskId: string, columnId: string) => void;
  onRemoveColumn: (columnId: string) => void;
}

function Column({
  index,
  tasks,
  column,
  onRemoveTask,
  isDropDisabled,
  onRemoveColumn
}: Props) {
  const handleRemoveColumn = () => onRemoveColumn(column.id);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <StContainer { ...provided.draggableProps } ref={provided.innerRef}>
          <StHeaderContainer { ...provided.dragHandleProps }>
            <StTitle>
              {column.title}
            </StTitle>
            <RemoveButton onClick={handleRemoveColumn} />
          </StHeaderContainer>
          <Droppable
            type="task"
            droppableId={column.id}
            isDropDisabled={isDropDisabled}
          >
            {(provided, snapshot) => (
              <StTaskList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                  <Task
                    columnId={column.id}
                    key={task.id}
                    task={task}
                    index={index}
                    onRemoveTask={onRemoveTask}
                  />
                ))}
                {provided.placeholder}
              </StTaskList>
            )}
          </Droppable>
        </StContainer>
      )}
    </Draggable>
  );
}

export default memo(Column);
