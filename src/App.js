import React, { useState } from "react";
import Todo from "./components/Todo";
import "./App.scss";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className='App' data-theme={theme}>
      <Todo onThemeToggle={toggleTheme} />
    </div>
  );
}

export default App;
