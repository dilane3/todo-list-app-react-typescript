export type TodoType = {
  id: number,
  description: string,
  status: boolean
}

export type StateType = Array<TodoType>

export type ActionType = {
  type: "add" | "delete" | "mark",
  payload: string | number
}

export type ActionMarkerPayloadType = {id: number, status: boolean}

export type ActionMarkerType = {
  type: ActionType["type"]
  payload: ActionMarkerPayloadType
}


export type ReducerType = (state: StateType, action: ActionType | ActionMarkerType) => StateType