import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Todo() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodo = e.target.elements.todo.value.trim();
    if (newTodo !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setShowModal(false);
    }
    e.target.elements.todo.value = "";
  };

  const handleToggleCompleted = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ListGroup>
        {todos.map((todo, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => handleToggleCompleted(index)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
            <Button
              variant="danger"
              style={{ float: "right" }}
              onClick={() => handleDeleteTodo(index)}
            >
              X
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Todo
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddTodo}>
            <Form.Group controlId="todo">
              <Form.Label>Todo:</Form.Label>
              <Form.Control type="text" placeholder="Enter todo" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Todo;
