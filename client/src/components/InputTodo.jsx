import { useState } from 'react';

function InputTodo() {
  const [description, setDescription] = useState('');

  const onChange = (e) => {
    setDescription(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      window.location = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">PERN Stack Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control mr-2"
          value={description}
          onChange={onChange}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
}
export default InputTodo;
