import * as React from "react";
import { Heading } from "@chakra-ui/react";
import TodoListItems from './TodoListItems'

function TodoList() {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems/>
    </>
  );
}

export default TodoList;
