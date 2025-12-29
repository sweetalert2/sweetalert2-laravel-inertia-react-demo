import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function TodoList({ todos = [], user }) {
  const [editingTodo, setEditingTodo] = useState(null)
  const { data, setData, post, put, reset, processing } = useForm({
    title: '',
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingTodo) {
      put(`/todos/${editingTodo.id}`, {
        onSuccess: () => {
          reset()
          setEditingTodo(null)
          Swal.fire('Updated!', 'Todo has been updated.', 'success')
        },
      })
    } else {
      post('/todos', {
        onSuccess: () => {
          reset()
          Swal.fire('Added!', 'New todo has been added.', 'success')
        },
      })
    }
  }

  const handleEdit = (todo) => {
    setEditingTodo(todo)
    setData({
      title: todo.title,
      description: todo.description || '',
    })
  }

  const handleDelete = (todo) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        useForm().delete(`/todos/${todo.id}`, {
          onSuccess: () => {
            Swal.fire('Deleted!', 'Your todo has been deleted.', 'success')
          },
        })
      }
    })
  }

  const handleToggleComplete = (todo) => {
    useForm().put(`/todos/${todo.id}`, {
      title: todo.title,
      description: todo.description,
      completed: !todo.completed,
    })
  }

  const handleCancelEdit = () => {
    setEditingTodo(null)
    reset()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {user ? (
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome back, {user.name}!</h1>
        ) : (
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Hello Guest!</h1>
        )}

        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={processing}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                disabled={processing}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
              >
                {editingTodo ? 'Update Todo' : 'Add Todo'}
              </button>
              {editingTodo && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Todo List</h2>
          {todos.length === 0 ? (
            <p className="text-gray-500">No todos yet. Add one above!</p>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mr-3"
                    />
                    <div className="flex-1">
                      <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                          {todo.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(todo)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
