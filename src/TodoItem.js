import React from 'react';

function TodoItem({ todo, index, onToggleComplete, onRemove }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(index)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onRemove(index)}>Remove</button>
    </li>
  );
}

export default TodoItem;
