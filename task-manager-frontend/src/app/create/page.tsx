"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from '../../styles/Home.module.scss';

export default function CreateTask() {
  const router = useRouter();

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    isCompleted: false,
  });

  const handleCreateTask = async () => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });

    if (res.ok) {
      router.push('/'); 
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create a New Task</h1>
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
}
