import { useState, useEffect } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { FaTrash, FaCheck, FaSearch } from 'react-icons/fa'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos')
      setTodos(response.data)
    } catch (error) {
      toast.error('Failed to fetch todos')
    }
  }

  const addTodo = async () => {
    if (!text.trim()) {
      toast.error('Todo text cannot be empty')
      return
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/todos', { text })
      setTodos([...todos, response.data])
      setText('')
      toast.success('Todo added successfully')
    } catch (error) {
      toast.error('Failed to add todo')
    }
  }

  const searchTodos = async () => {
    if (!searchText.trim()) {
      fetchTodos()
      return
    }
    
    try {
      const response = await axios.get('http://localhost:5000/api/todos/search', {
        params: { q: searchText }
      })
      setTodos(response.data)
    } catch (error) {
      toast.error('Failed to search todos')
    }
  }

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t._id === id)
      const response = await axios.put(`http://localhost:5000/api/todos/${id}`, {
        completed: !todo.completed
      })
      setTodos(todos.map(t => t._id === id ? response.data : t))
      toast.success('Todo updated')
    } catch (error) {
      toast.error('Failed to update todo')
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`)
      setTodos(todos.filter(t => t._id !== id))
      toast.success('Todo deleted')
    } catch (error) {
      toast.error('Failed to delete todo')
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
      
      {/* Search Section */}
      <div className="flex mb-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search tasks..."
          className="flex-1 p-2 border rounded-l"
          onKeyPress={(e) => e.key === 'Enter' && searchTodos()}
        />
        <button 
          onClick={searchTodos}
          className="bg-gray-500 text-white p-2 rounded-r hover:bg-gray-600 flex items-center"
        >
          <FaSearch />
        </button>
      </div>
      
      {/* Add Todo Section */}
      <div className="flex mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded-l"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button 
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      
      {/* Todo List */}
      <ul className="space-y-2">
        {todos.length === 0 ? (
          <li className="p-3 text-center text-gray-500">No todos found</li>
        ) : (
          todos.map(todo => (
            <li 
              key={todo._id} 
              className={`flex items-center p-3 border rounded ${todo.completed ? 'bg-gray-100' : 'bg-white'}`}
            >
              <span 
                className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => toggleTodo(todo._id)}
              >
                {todo.text}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleTodo(todo._id)}
                  className={`p-1 rounded ${todo.completed ? 'bg-green-500' : 'bg-gray-300'} text-white`}
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App