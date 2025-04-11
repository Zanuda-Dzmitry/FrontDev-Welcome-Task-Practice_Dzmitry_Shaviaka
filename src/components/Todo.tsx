import React, { useState, FormEvent, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import "./Todo.scss";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: string;
}

const Todo: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  // Загружаем задачи из localStorage при инициализации
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());

  // Сохраняем задачи в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      date: formatDate(new Date().toISOString()),
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleTaskSelection = (id: number) => {
    toggleTaskCompletion(id);
    const newSelectedTasks = new Set(selectedTasks);
    if (newSelectedTasks.has(id)) {
      newSelectedTasks.delete(id);
    } else {
      newSelectedTasks.add(id);
    }
    setSelectedTasks(newSelectedTasks);
  };

  // Функция для удаления конкретной задачи
  const clearButtonTasks = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    const newSelectedTasks = new Set(selectedTasks);
    newSelectedTasks.delete(id);
    setSelectedTasks(newSelectedTasks);
  };

  const clearSelectedTasks = () => {
    // Удаляем только выбранные задачи
    setTasks(tasks.filter((task) => !selectedTasks.has(task.id)));
    setSelectedTasks(new Set()); // очищаем выбор
  };

  const clearAllTasks = () => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить все задачи?"
    );
    if (confirmDelete) {
      setTasks([]); // Удаляем все задачи
      setSelectedTasks(new Set()); // очищаем выбор
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Список задач</h1>
        <ThemeToggle />
      </div>

      <form className="input-section" onSubmit={handleSubmit}>
        <input
          type="text"
          className="task-input"
          placeholder="Введите новую задачу"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-button">
          Добавить
        </button>
        <button
          type="button"
          className="add-button"
          onClick={clearSelectedTasks}
        >
          Очистить
        </button>
        <button className="add-button" onClick={() => clearAllTasks()}>
          Очистить все задачи{" "}
        </button>
      </form>

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p>Нет задач</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div>
                <input
                  type="checkbox"
                  checked={selectedTasks.has(task.id)}
                  onChange={() => toggleTaskSelection(task.id)}
                />

                <span className={task.completed ? "completed" : ""}>
                  {task.text}
                </span>
              </div>
              <div className="wrapper-left">
                <span className="task-date">{task.date}</span>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => clearButtonTasks(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
