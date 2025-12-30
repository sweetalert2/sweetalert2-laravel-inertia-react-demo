export default function TodoList({ todos }) {
  return (
    <>
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} {todo.completed ? '(Completed)' : ''}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
