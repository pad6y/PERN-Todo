import { useState, useEffect, useCallback } from 'react';

import TodosTable from './TodosTable';

function ListTodos({ sort }) {
  const [list, setList] = useState([]);

  const getList = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${sort}`);
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.error(error.message);
    }
  }, [sort]);

  useEffect(() => {
    getList();
  }, [getList]);

  const deleteTodoHandler = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error(error.message);
    }
    setList((prevState) => prevState.filter((todo) => todo.todo_id !== id));
  };

  return (
    <>
      <TodosTable
        list={list}
        deleteTodo={deleteTodoHandler}
        getList={getList}
      />
    </>
  );
}
export default ListTodos;
