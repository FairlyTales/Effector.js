import { createEffect, createEvent, createStore } from "effector";

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface JSONPlaceholderTodoItem {
  id: number;
  userId: number
  title: string;
  checked: boolean;
}

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

// todo todo todo todo todo todo todooooooo
const addTodoToTodoList = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

type Store = {
  todos: Todo[];
  newTodo: string;
}

export const setNewTodo = createEvent<string>();
export const addTodo = createEvent();
export const update = createEvent<{ id: number; text: string }>();
export const toggle = createEvent<number>();
export const remove = createEvent<number>();

export const fetchAsyncDataFx = createEffect(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');

  return res.json();
})

const store = createStore<Store>({
  todos: [],
  newTodo: '',
})
  .on(fetchAsyncDataFx.done, (state, newData) => ({
      ...state,
      todos: newData.result.map((item: JSONPlaceholderTodoItem) => ({
        id: item.id,
        text: item.title,
        done: item.checked
      }))
    })
  )
  .on(setNewTodo, (state, newTodo) => ({
    ...state,
    newTodo
  }))
  .on(addTodo, (state) => ({
    ...state,
    newTodo: '',
    todos: addTodoToTodoList(state.todos, state.newTodo)
  }))
  .on(update, (state, todo) => ({
    ...state,
    todos: updateTodo(state.todos, todo.id, todo.text),
  }))
  .on(toggle, (state, todoId) => ({
    ...state,
    todos: toggleTodo(state.todos, todoId),
  }))
  .on(remove, (state, todoId) => ({
    ...state,
    todos: removeTodo(state.todos, todoId),
  }))

export default store;
