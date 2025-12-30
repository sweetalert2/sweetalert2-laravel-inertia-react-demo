import { useForm } from '@inertiajs/react'

export default function TodoList({ todos }) {
  const { data, setData, post, processing } = useForm({
    title: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/todos', {
      onSuccess: () => setData('title', ''),
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData('title', e.target.value)}
          placeholder="Add a new todo"
          disabled={processing}
        />
        <button type="submit" disabled={processing}>
          Add Todo
        </button>
      </form>
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
