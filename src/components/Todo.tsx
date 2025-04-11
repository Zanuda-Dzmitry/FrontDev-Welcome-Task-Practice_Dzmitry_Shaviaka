import React, { useState, FormEvent } from "react";
import ThemeToggle from "./ThemeToggle";
import "./Todo.scss";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleTaskSelection = (id: number) => {
    const newSelectedTasks = new Set(selectedTasks);
    if (newSelectedTasks.has(id)) {
      newSelectedTasks.delete(id);
    } else {
      newSelectedTasks.add(id);
    }
    setSelectedTasks(newSelectedTasks);
  };

  const clearSelectedTasks = () => {
    // Удаляем только выбранные задачи
    setTasks(tasks.filter(task => !selectedTasks.has(task.id)));
    setSelectedTasks(new Set()); // очищаем выбор
  };

  const clearAllTasks = () => {
    setTasks([]); // Удаляем все задачи
    setSelectedTasks(new Set()); // очищаем выбор
  };

  return (
    <div className='todo-container'>
      <div className='todo-header'>
        <h1>Список задач</h1>
        <ThemeToggle />
      </div>

      <form className='input-section' onSubmit={handleSubmit}>
        <input
          type='text'
          className='task-input'
          placeholder='Введите новую задачу'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit' className='add-button'>
          Добавить
        </button>
        <button
          type='button'
          className='add-button'
          onClick={clearSelectedTasks} 
        >
          Очистить 
        </button>
        
      </form>

      <div className='tasks-list'>
        {tasks.length === 0 ? (
          <p>Нет задач</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className='task-item'>
              <input
                type='checkbox'
                checked={selectedTasks.has(task.id)}
                onChange={() => toggleTaskSelection(task.id)}
              />
            
              <span className={task.completed ? 'completed' : ''}>
                {task.text}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
