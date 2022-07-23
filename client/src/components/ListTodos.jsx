import { useState, useEffect, useCallback } from 'react';

import SortButton from './SortButton';
import TodosTable from './TodosTable';

function ListTodos() {
  const [order, setOrder] = useState(true);
  const [list, setList] = useState([]);

  const getList = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/todos/${order ? 'ASC' : 'DESC'}`
      );
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.error(error.message);
    }
  }, [order]);

  useEffect(() => {
    getList();
  }, [getList]);

  const orderTypeHandler = () => {
    setOrder(!order);
  };

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
      <SortButton handler={orderTypeHandler} by={order ? 'DESC' : 'ASC'} />
      <TodosTable
        list={list}
        deleteTodo={deleteTodoHandler}
        getList={getList}
      />
    </>
  );
}
export default ListTodos;
