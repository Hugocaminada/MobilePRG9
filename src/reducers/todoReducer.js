import { ADD_TODO, REMOVE_TODO } from '../actions/types'

const initialState = {
  todos: [],
}

const todoReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: state.todos.concat({
          title: action.title,
          id: action.id,
        }),
      }
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.id),
      }
  }
  return state
}

export default todoReducer
