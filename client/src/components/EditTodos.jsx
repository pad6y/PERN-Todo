import { useState } from 'react';

function EditTodos({ todo, getList }) {
  const [description, setDescription] = useState(todo.description);

  const onChange = (e) => {
    setDescription(e.target.value);
  };

  const editTodoHandler = async (id) => {
    try {
      const body = { description };
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      getList();
    } catch (error) {
      console.error(error.message);
    }
  };

  const originalTodo = () => {
    setDescription(todo.description);
  };

  return (
    <>
      <button
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>
      {/* The Modal */}
      <div className="modal" id={`id${todo.todo_id}`} onClick={originalTodo}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={originalTodo}
              >
                &times;
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={onChange}
              />
            </div>
            {/* Modal footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editTodoHandler(todo.todo_id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={originalTodo}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditTodos;
