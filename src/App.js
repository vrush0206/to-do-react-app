import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoItem from './TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // New state for filtering

  // Fetch todos from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      axios.post('http://localhost:5000/todos', { text: input })
        .then((response) => {
          setTodos([...todos, response.data]);
          setInput('');
        })
        .catch((error) => console.error('Error adding todo:', error));
    }
  };

  const handleToggleComplete = (index) => {
    const todo = todos[index];
    axios.put(`http://localhost:5000/todos/${todo._id}`, {
      completed: !todo.completed
    })
    .then((response) => {
      const newTodos = [...todos];
      newTodos[index] = response.data;
      setTodos(newTodos);
    })
    .catch((error) => console.error('Error updating todo:', error));
  };

  const handleRemoveTodo = (index) => {
    const todo = todos[index];
    axios.delete(`http://localhost:5000/todos/${todo._id}`)
      .then(() => {
        setTodos(todos.filter((_, i) => i !== index));
      })
      .catch((error) => console.error('Error deleting todo:', error));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true; // 'all' or unrecognized filter
  });

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        <button onClick={() => handleFilterChange('all')} disabled={filter === 'all'}>All</button>
        <button onClick={() => handleFilterChange('completed')} disabled={filter === 'completed'}>Completed</button>
        <button onClick={() => handleFilterChange('pending')} disabled={filter === 'pending'}>Pending</button>
      </div>

      <ul>
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onRemove={handleRemoveTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
