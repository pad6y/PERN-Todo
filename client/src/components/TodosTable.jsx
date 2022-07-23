import EditTodos from './EditTodos';

function TodosTable({ list, deleteTodo, getList }) {
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
                        deleteTodo(item.todo_id);
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
export default TodosTable;
