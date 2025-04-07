"use client";
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.scss'; 

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    isCompleted: false,
  });

  useEffect(() => {
    // Завантажуємо задачі через API
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    // Створюємо нову задачу через API
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  return (
    <div className={styles.container}>
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
      />
      <button onClick={handleCreateTask}>Create Task</button>

      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.isCompleted ? 'Completed' : 'Not Completed'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
