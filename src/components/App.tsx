import { useReducer, useEffect } from "react"
import styles from "./App.module.css"
import Header from "./header/header"
import Todo from "./todo/todo"
import { 
  StateType,
  ReducerType,
  ActionMarkerPayloadType,
  TodoType
} from "./type"
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/todo'
})

const initialState: StateType = []

const todoReducer: ReducerType = (state, action) => {
  switch (action.type) {
    case "load": {
      const stateClone = action.payload as StateType

      return stateClone
    }
    case "add": {
      const stateClone = [...state]
      const newTodo = action.payload as TodoType
  
      stateClone.push(newTodo)
  
      return stateClone
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
    instance.post("/", {description, status: false})
    .then(res => {
      if (res?.data) {
        const todo = res.data as TodoType

        dispatch({type: "add", payload: todo})
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  const deleteTodo = (id: number) => {
    instance.delete(`/${id}`)
    .then(res => {
      if (res?.data) {
        const todo = res.data as TodoType

        console.log(todo)
        dispatch({type: "delete", payload: id})
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  const markTodo = ({id, status}: ActionMarkerPayloadType) => {
    instance.patch(`/${id}`, {status})
    .then(res => {
      if (res?.data) {
        const todo = res.data as TodoType

        console.log(todo)
        dispatch({type: "mark", payload: {id, status}})
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  useEffect(() => {
    instance.get("/all")
    .then(res => {
      console.log(res.data)
      const todos = res.data as StateType

      dispatch({type: "load", payload: todos})
    })
    .catch(err => {
      console.error(err)
    })
  }, [])

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