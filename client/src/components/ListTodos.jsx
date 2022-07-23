import { useState, useEffect, useCallback } from 'react';
import EditTodos from './EditTodos';

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
      <table className="table mt-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {!list
            ? null
            : list.map((item) => (
                <tr key={item.todo_id}>
                  <th scope="row">{item.todo_id}</th>
                  <td>{item.description}</td>
                  <td>
                    <EditTodos todo={item} getList={getList} />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteTodoHandler(item.todo_id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
}
export default ListTodos;
