export type TodoType = {
  id: number,
  description: string,
  status: boolean
}

export type StateType = Array<TodoType>

export type ActionType = {
  type: "add" | "delete" | "mark" | "load",
  payload: string | number | StateType | TodoType
}

export type ActionMarkerPayloadType = {id: number, status: boolean}

export type ActionMarkerType = {
  type: ActionType["type"]
  payload: ActionMarkerPayloadType
}


export type ReducerType = (state: StateType, action: ActionType | ActionMarkerType) => StateType