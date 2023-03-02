import React from 'react'

const Todo = ({todo}) => {
  return (
    <div>
        <div>
        <h2>{todo.taskTitle}</h2>
        <p>{todo.taskDescription}</p>
        </div>
      <div>
      <p>{todo.dueDate}</p>
      {todo.important && (<p>Important</p>)}
      </div>
        
    </div>
  )
}

export default Todo