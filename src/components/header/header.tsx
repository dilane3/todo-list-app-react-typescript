import React, { useState } from "react"
import styles from "../App.module.css"

type ChangeEventType = React.ChangeEvent<HTMLInputElement>
type ClickEventType = React.MouseEvent<HTMLButtonElement>
type HeaderProps = {
  totalTodo: number,
  createTodo: (description: string) => void
}

function Header({totalTodo, createTodo}: HeaderProps) {
  const [descriptionTodo, setDescriptionTodo] = useState("")

  const handleChangeDescriptionTodo = (event: ChangeEventType) => {
    setDescriptionTodo(event.target.value)
  }

  const handleCreateTodo = (event: ClickEventType) => {
    event.preventDefault()

    if(descriptionTodo.length > 0) createTodo(descriptionTodo)

    setDescriptionTodo("")
  }

  return (
    <header className={styles.Header}>
      <h3>
        <span>{totalTodo}</span>
        Todo List App
      </h3>

      <form>
        <input 
          type="text" 
          value={descriptionTodo} 
          onChange={handleChangeDescriptionTodo} 
          placeholder="Add a task..."
        />
        <button 
          className="btn" 
          onClick={handleCreateTodo}
          style={{opacity: descriptionTodo.length === 0 ? .4 : 1}}
        >Add</button>
      </form>
    </header>
  )
}

export default Header