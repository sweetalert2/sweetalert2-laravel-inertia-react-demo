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
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">Tasks</h1>
          <div className="h-1 w-16 bg-neutral-900" aria-hidden="true"></div>
        </header>

        {/* Add Todo Form */}
        <section aria-labelledby="add-todo-heading" className="mb-16">
          <h2 id="add-todo-heading" className="sr-only">
            Add a new task
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="todo-input" className="block text-sm font-medium text-neutral-700 mb-2">
                New Task
              </label>
              <div className="flex gap-3">
                <input
                  id="todo-input"
                  type="text"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  placeholder="What needs to be done?"
                  disabled={processing}
                  required
                  className="flex-1 px-4 py-3 border-2 border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent disabled:bg-neutral-100 disabled:cursor-not-allowed transition-colors"
                  aria-describedby="todo-input-description"
                />
                <button
                  type="submit"
                  disabled={processing || !data.title.trim()}
                  className="px-6 py-3 bg-neutral-900 text-white font-medium hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors"
                  aria-label="Add task"
                >
                  {processing ? 'Adding...' : 'Add'}
                </button>
              </div>
              <p id="todo-input-description" className="mt-2 text-sm text-neutral-500">
                Press Enter or click Add to create a new task
              </p>
            </div>
          </form>
        </section>

        {/* Todo List */}
        <section aria-labelledby="todo-list-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="todo-list-heading" className="text-2xl font-bold tracking-tight text-neutral-900">
              All Tasks
            </h2>
            <span className="text-sm font-medium text-neutral-500" aria-live="polite" aria-atomic="true">
              {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {todos.length === 0 ? (
            <div className="border-2 border-dashed border-neutral-300 bg-white p-12 text-center" role="status">
              <svg
                className="mx-auto h-12 w-12 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="mt-4 text-lg font-medium text-neutral-900">No tasks yet</p>
              <p className="mt-2 text-sm text-neutral-500">Get started by creating your first task above</p>
            </div>
          ) : (
            <ul className="space-y-3" role="list">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="bg-white border-l-4 border-neutral-900 p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-base font-medium ${
                          todo.completed ? 'text-neutral-500 line-through' : 'text-neutral-900'
                        }`}
                      >
                        {todo.title}
                      </p>
                      {todo.completed && (
                        <span className="inline-flex items-center mt-2 px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-600">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
