import React from "react";
import Todo from "./components/Todo";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className='App'>
      <Todo />
    </div>
  );
};

export default App;
