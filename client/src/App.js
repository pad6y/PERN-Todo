import { useState } from 'react';

import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
import SortButton from './components/SortButton';
import './App.css';

function App() {
  const [order, setOrder] = useState(true);

  const orderTypeHandler = () => {
    setOrder(!order);
  };

  return (
    <>
      <div className="container">
        <InputTodo />
        <SortButton handler={orderTypeHandler} />
        <ListTodos sort={order ? 'ASC' : 'DESC'} />
      </div>
    </>
  );
}

export default App;
