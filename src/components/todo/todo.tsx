import styles from "../App.module.css"
import { 
  TodoType,
  ActionMarkerPayloadType
} from "../type"

type TodoProps = {
  todo: TodoType,
  deleteTodo: (id: number) => void,
  markTodo: (todoStatus: ActionMarkerPayloadType) => void
}
type ChangeEventType = React.ChangeEvent<HTMLInputElement>

function Todo ({todo, deleteTodo, markTodo}: TodoProps) {
  const {id, status} = todo

  const todoMarker = (event: ChangeEventType) => {
    markTodo({id, status: event.target.checked})
  }

  return (
    <article className={styles.Todo}>
      <div>
        <input type="checkbox" onChange={todoMarker} checked={status}/>

        <span className={status ? styles.EndTodo:""}>{todo.description}</span>
      </div>

      <button onClick={() => deleteTodo(id)}>Delete</button>
    </article>
  )
}

export default Todo