"use client";

import { useEffect } from "react";
import { useStore } from "../store/useStore";
import Header from "../components/Header";
import styles from "../styles/Home.module.scss";
import RootLayout from "./layout";

export default function Home() {
  const { tasks, setTasks } = useStore();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        if (!response.ok) {
          throw new Error("Не вдалося завантажити завдання");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Помилка завантаження завдань:", error);
      }
    };

    if (tasks.length === 0) {
      fetchTasks();
    }
  }, [tasks, setTasks]);

  return (
    <RootLayout>
      <div className={styles.container}>
        <Header />

        <h2>Завдання</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{task.isCompleted ? "Виконано" : "Не виконано"}</p>
            </li>
          ))}
        </ul>
      </div>
    </RootLayout>
  );
}
