import { Button, Checkbox, Flex, Input } from "@chakra-ui/react";
import * as React from "react";
import { useStore } from "effector-react";
import $store from "../store";

function TodoListItems() {
  const { todos } = useStore($store);

  return (
    <>
      {todos.map((todo: { id: number; text: string }) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox/>
          <Input mx={2} value={todo.text}/>
          <Button>Delete</Button>
        </Flex>
      ))}
    </>
  );
}

export default TodoListItems;
