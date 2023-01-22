import * as React from "react";
import { Button, Input, Grid } from "@chakra-ui/react";
import { useStore } from "effector-react";
import $store, { setNewTodo, addTodo } from '../store';

function TodoAdd() {
  const { newTodo } = useStore($store);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  }

  const handleNewTodoAdd = () => {
    addTodo();
  }

  return (
    <Grid pt={2} templateColumns="5fr 1fr" columnGap="3">
      <Input
        placeholder="New todo"
        value={newTodo}
        onChange={handleInputChange}
      />
      <Button onClick={handleNewTodoAdd}>Add Todo</Button>
    </Grid>
  );
}

export default TodoAdd;
