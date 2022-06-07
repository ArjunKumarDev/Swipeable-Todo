import React from "react";
import TodoItem from "./TodoItem";

export default function Todos({ todos = [], markComplete, deleteTodo }) {
  return todos?.map((todo) => (
    <div>
      <TodoItem
        key={todo.id}
        todo={todo}
        markComplete={markComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  ));
}
