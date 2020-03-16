import { ADD_TODO, REMOVE_TODO } from './types'

export const addTodoAction = (title, id) => (
  {
    type: ADD_TODO,
    title,
    id,
  }
)

export const removeTodoAction = (id) => (
  {
    type: REMOVE_TODO,
    id,
  }
)
