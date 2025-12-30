import { useForm, Link } from '@inertiajs/react'

export default function TodoEdit({ todo }) {
  const { data, setData, patch, processing } = useForm({
    title: todo.title,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    patch(`/todos/${todo.id}`)
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 mb-4"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tasks
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">Edit Task</h1>
          <div className="h-1 w-16 bg-neutral-900" aria-hidden="true"></div>
        </header>

        {/* Edit Todo Form */}
        <section aria-labelledby="edit-todo-heading">
          <h2 id="edit-todo-heading" className="sr-only">
            Edit task
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="todo-input" className="block text-sm font-medium text-neutral-700 mb-2">
                Task Title
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
                  aria-label="Save task"
                >
                  {processing ? 'Saving...' : 'Save'}
                </button>
              </div>
              <p id="todo-input-description" className="mt-2 text-sm text-neutral-500">
                Press Enter or click Save to update the task
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
