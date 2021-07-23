import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL_TODOS, CLEAR_COMPLETED } from "../constants/ActionTypes";

const initialState = {
  todoList: [
    {
      text: "Implement Undo",
      completed: false,
      id: 0,
    },
    {
      text: "Implement Redo",
      completed: false,
      id: 1,
    },
  ],
};

initialState.historyList = [[...initialState.todoList]];
initialState.currentIndex = initialState.historyList.length - 1;

export default function todos(state = initialState, action) {
  let todoList;
  let newState;
  switch (action.type) {
    case ADD_TODO:
      todoList = state.todoList;
      newState = {
        ...state,
        todoList: [
          ...todoList,
          {
            id: state.todoList.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
            completed: false,
            text: action.text,
          },
        ],
      };
      newState.historyList = [...newState.historyList.slice(0, newState.currentIndex + 1), [...newState.todoList]];
      newState.currentIndex = newState.historyList.length - 1;

      return newState;

    case DELETE_TODO:
      todoList = state.todoList;

      newState = {
        ...state,
        todoList: todoList.filter((todo) => todo.id !== action.id),
      };
      newState.historyList = [...newState.historyList.slice(0, newState.currentIndex + 1), [...newState.todoList]];
      newState.currentIndex = newState.historyList.length - 1;

      return newState;

    case EDIT_TODO:
      todoList = state.todoList;

      newState = {
        ...state,
        todoList: todoList.map((todo) => (todo.id === action.id ? { ...todo, text: action.text } : todo)),
      };
      newState.historyList = [...newState.historyList.slice(0, newState.currentIndex + 1), [...newState.todoList]];
      newState.currentIndex = newState.historyList.length - 1;

      return newState;

    case COMPLETE_TODO:
      todoList = state.todoList;

      newState = {
        ...state,
        todoList: todoList.map((todo) => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo)),
      };
      newState.historyList = [...newState.historyList.slice(0, newState.currentIndex + 1), [...newState.todoList]];
      newState.currentIndex = newState.historyList.length - 1;

      return newState;

    case COMPLETE_ALL_TODOS:
      todoList = state.todoList;

      newState = {
        ...state,
        todoList: todoList.map((todo) => ({ ...todo, completed: true })),
      };
      newState.historyList = [...newState.historyList.slice(0, newState.currentIndex + 1), [...newState.todoList]];
      newState.currentIndex = newState.historyList.length - 1;

      return newState;

    case CLEAR_COMPLETED:
      todoList = state.todoList;

      newState = {
        ...state,
        todoList: todoList.map((todo) => ({ ...todo, completed: false })),
      };
      newState.historyList = [...newState.historyList.slice(0, newState.currentIndex + 1), [...newState.todoList]];
      newState.currentIndex = newState.historyList.length - 1;

      return newState;

    default:
      return state;
  }
}
