import { Button, Checkbox, Flex, Input } from "@chakra-ui/react";
import * as React from "react";
import { FC } from "react";
import { useStore } from "effector-react";
import $store, { remove, Todo, toggle, update } from "../store";

const TodoListItem: FC<{ item: Todo}> = ({ item }) => {
  const { id, text, done } = item;

  const handleStatusChange = () => {
    toggle(id);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newItemData = { id, text: e.target.value };

    update(newItemData);
  }

  const handleDelete = () => {
    remove(id);
  }

  return (
    <Flex pt={2}>
      <Checkbox checked={done} onClick={handleStatusChange}/>
      <Input mx={2} value={text} onChange={handleInputChange}/>
      <Button onClick={handleDelete}>Delete</Button>
    </Flex>
  );
}

function TodoListItems() {
  const { todos } = useStore($store);

  return (
    <>
      {todos.map((todo) => (
        <TodoListItem item={todo} key={todo.id} />
      ))}
    </>
  );
}

export default TodoListItems;
