import React, { useState, useEffect } from "react";
import { Todos, AddTodo } from "components";
import axios from "axios";
import { notification } from "antd";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const Container = styled.div`
  background-image: linear-gradient(to bottom, #fd746c, #ff9068);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 600px;
  min-width: 455px;
  min-height: 50vh;
  padding: 20px;
  background-color: #fff;
  box-shadow: 5px 2px 44px 1px rgba(0, 0, 0, 0.75);
`;

const Title = styled.h1`
  font-weight: 600;
  text-align: center;
`;

const ItemWrapper = styled.div`
  margin-top: 2rem;
  max-height: 300px;
  overflow-y: auto;
`;

const App = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => setTodos(res?.data));
  };

  // Toggle Complete
  const markComplete = (id) => {
    let completedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(completedTodos);
  };

  // Delete Todo
  const deleteTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        notification.success({
          description: "Todo deleted successfully",
          placement: "top",
          duration: 3,
        });
        setTodos([...todos.filter((todo) => todo?.id !== id)]);
      });
  };

  // Add Todo
  const addTodo = (title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title,
        completed: false,
      })
      .then((res) => {
        res.data.id = uuidv4();
        setTodos([...todos, res?.data]);
      });
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Title>Todo List</Title>
          <AddTodo addTodo={addTodo} />
          <ItemWrapper>
            <Todos
              todos={todos}
              markComplete={markComplete}
              deleteTodo={deleteTodo}
            />
          </ItemWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

export default App;
