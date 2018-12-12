import React from "react";
import ReactDOM from "react-dom";
// import App from "./App.js";
// ReactDOM.render(<App />, document.getElementById("root"));

import TodoList from "./todo.js";

const TASKS = [
    {id: 1, name: 'A', completed: true},
    {id: 2, name: 'B', completed: false}
];

ReactDOM.render(
    <TodoList tasks={TASKS} />,
    document.getElementById('root')
  );