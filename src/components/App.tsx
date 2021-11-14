import { useReducer, useState } from "react"
import styles from "./App.module.css"
import Header from "./header/header"
import Todo from "./todo/todo"
import { 
  StateType,
  ReducerType,
  ActionMarkerPayloadType
} from "./type"

const initialState: StateType = []

const todoReducer: ReducerType = (state, action) => {
  switch (action.type) {
    case "add": {
      let id = 1
      const stateClone = [...state]

      if (state.length > 0) id = state[state.length-1].id + 1

      if (typeof action.payload === "string") {
        const newTodo = {
          id,
          description: action.payload,
          status: false
        }
  
        console.log(newTodo)
        stateClone.push(newTodo)
  
        return stateClone    
      }

      return state
    }
    case "delete": {
      const stateClone = [...state]

      if (typeof action.payload === "number") {
        const index = stateClone.findIndex(todo => todo.id === action.payload)

        if (index > -1) stateClone.splice(index, 1)

        return stateClone
      }

      return state
    }
    case "mark": {
      const stateClone = [...state]

      const payload = action.payload as ActionMarkerPayloadType
      const index = stateClone.findIndex(todo => todo.id === payload.id)

      if (index > -1) stateClone[index].status = payload.status

      return stateClone
    }
    default: return state
  }
}

function App () {
  const [todos, dispatch] = useReducer(todoReducer, initialState)

  const createTodo = (description: string) => {
    dispatch({type: "add", payload: description})
  }

  const deleteTodo = (id: number) => {
    dispatch({type: "delete", payload: id})
  }

  const markTodo = ({id, status}: ActionMarkerPayloadType) => {
    dispatch({type: "mark", payload: {id, status}})
  }

  return (
    <section className={styles.App}>
      <Header totalTodo={todos.length} createTodo={createTodo} />

      <section className={styles.TodoContainer}>
        {
          todos.map(todo => (
            <Todo 
              key={todo.id} 
              todo={todo}
              deleteTodo={deleteTodo}
              markTodo={markTodo}
            />
          ))
        }
      </section>
    </section>
  )
}

export default App