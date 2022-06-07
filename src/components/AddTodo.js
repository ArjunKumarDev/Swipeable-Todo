import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 2px solid #ccc;
  border-radius: 4px;
`;

const StyleButton = styled.button`
  background-image: linear-gradient(to right, #fd746c, #ff9068);
  width: 20%;
  cursor: pointer;
  border-radius: 20px;
  height: 20%;
  border: none;
  margin-left: 10px;
  color: #fff;
  padding: 5px;
`;

export default function AddTodo({ addTodo }) {
  const [title, setTitle] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(title);
    setTitle("");
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", alignItems: "center" }}>
      <StyledInput
        type="text"
        name="title"
        style={{ padding: "5px" }}
        placeholder="Add Todo ..."
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />

      <StyleButton type="submit">Add </StyleButton>
    </form>
  );
}
