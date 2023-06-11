import { DragDropContext, OnDragEndResponder, OnDragStartResponder, Droppable, DraggableLocation } from 'react-beautiful-dnd';

import Column from './components/Column';
import AddItem from './components/AddItem';
import { StInputsContainer, StMainLayout } from './components/styles/common';
import useGetInitialData from './hooks/useGetInitialData';
import { reorder } from './utils/reorder';

interface SubDragHandler {
  start: Column;
  finish: Column;
  source: DraggableLocation;
  draggableId: string;
  destination: DraggableLocation;
}

export default function App() {
  const [state, setState] = useGetInitialData();

  const hasColumns = Boolean(Object.keys(state.columns).length);

  const handleDragStart: OnDragStartResponder = ({ source }) => {
    const homeIndex = state.columnOrder.indexOf(source.droppableId);

    setState({
      ...state,
      homeIndex
    });
  };

  const handleDragColumn: OnDragEndResponder = ({ source, destination, draggableId }) => {
    if (!destination) return;

    const newColumnOrder = [...state.columnOrder];
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, draggableId);

    setState({
      ...state,
      columnOrder: newColumnOrder
    });
  };

  const handleReorderInOneColumn = ({ source, destination, start, finish }: SubDragHandler) => {
    if (!destination) return;

    if (start === finish) {
      const newTaskIds = reorder(
        start.taskIds,
        source.index,
        destination.index
      );

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      });
    }
  };

  const handleDragTaskToNextColumn = ({ source, destination, draggableId, start, finish }: SubDragHandler) => {
    if (!destination) return;

    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index - 1, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = [...finish.taskIds];
    finishTaskIds.splice(destination.index - 1, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    setState({
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    });
  };

  const handleDragEnd: OnDragEndResponder = (responder, provided) => {
    const { destination, source, draggableId, type } = responder;

    setState({
      ...state,
      homeIndex: null
    });

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      handleDragColumn(responder, provided);
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      handleReorderInOneColumn({ destination, source, draggableId, start, finish });
      return;
    }

    handleDragTaskToNextColumn({ destination, source, draggableId, start, finish });
  };

  const handleAddTask = (value: string) => {
    const tasksLength = Object.keys(state.tasks).length;

    const newTask: Task = {
      content: value,
      id: `task-${tasksLength + 1}`
    };

    setState({
      ...state,
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask
      },
      columns: {
        ...state.columns,
        'column-1': {
          ...state.columns['column-1'],
          taskIds: [...state.columns['column-1'].taskIds, newTask.id]
        }
      }
    });
  };

  const handleAddColumn = (value: string) => {
    const columnsLength = Object.keys(state.columns).length;

    const newColumn: Column = {
      title: value,
      taskIds: [],
      id: `column-${columnsLength + 1}`
    };

    setState({
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn
      },
      columnOrder: [...state.columnOrder, newColumn.id]
    });
  };

  const handleRemoveTask = (taskId: string, columnId: string) => {
    const newTasks = { ...state.tasks };
    delete state.tasks[taskId];

    const currentColumn = { ...state.columns[columnId] };
    const newTaskIds = currentColumn.taskIds?.filter((id) => id !== taskId);

    setState({
      ...state,
      tasks: newTasks,
      columns: {
        ...state.columns,
        [columnId]: { ...currentColumn, taskIds: newTaskIds }
      }
    });
  };

  const handleRemoveColumn = (columnId: string) => {
    const columns = { ...state.columns };
    const newColumnOrder = state.columnOrder.filter((item) => item !== columnId);
    const removedColumn = columns[columnId];
    const tasks = { ...state.tasks };

    Object.keys(tasks).forEach((taskId) => {
      if (removedColumn.taskIds.includes(taskId)) {
        delete tasks[taskId];
      }
    });

    delete columns[columnId];

    setState({
      ...state,
      columnOrder: newColumnOrder,
      tasks,
      columns
    });
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <StInputsContainer>
        <AddItem
          disabled={!hasColumns}
          buttonText="Add a task"
          onAddItem={handleAddTask}
          placeholder="Enter a new task..."
        />
        <AddItem
          buttonText="Add a column"
          onAddItem={handleAddColumn}
          placeholder="Enter a new column..."
        />
      </StInputsContainer>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <StMainLayout { ...provided.droppableProps } ref={provided.innerRef}>
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];
              const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

              return (
                <Column
                  key={column.id}
                  index={index}
                  tasks={tasks}
                  column={column}
                  onRemoveTask={handleRemoveTask}
                  onRemoveColumn={handleRemoveColumn}
                />
              );
            })}
            {provided.placeholder}
          </StMainLayout>
        )}
      </Droppable>
    </DragDropContext>
  );
}
