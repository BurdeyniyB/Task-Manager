"use client";

import { useRouter } from "next/navigation";
import { useStore } from "../store/useStore";
import styles from "../styles/Header.module.scss";

export default function Header() {
    const { search, setSearch, status, setStatus, setTasks } = useStore();
    const router = useRouter();

    // Обробка пошуку (якщо введено запит, виконуємо запит до API)
    const handleSearch = async () => {
        if (!search.trim()) return; // Якщо рядок порожній, не робимо запит
        try {
            console.log("search " + search);

            const response = await fetch(`http://localhost:5000/tasks/search?prompt=${encodeURIComponent(search)}`);
            if (!response.ok) {
                throw new Error("Пошуковий запит не вдався");
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Помилка пошуку:", error);
        }
    };

    // Обробка зміни статусу фільтрації
    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setStatus(value);
        try {
            let url = "http://localhost:5000/tasks";
            if (value !== "all") {
                url += `?status=${value}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Запит за статусом не вдався");
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Помилка завантаження завдань за статусом:", error);
        }
    };

    // Обробка кнопки "Створити задачу"
    const handleCreate = () => {
        router.push("/create");
    };

    return (
        <div className={styles.header}>

            <select value={status} onChange={handleStatusChange}>
                <option value="all">Всі</option>
                <option value="done">Виконані</option>
                <option value="pending">Не виконані</option>
            </select>

            <input
                type="text"
                placeholder="Пошук завдань..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <button onClick={handleCreate} className={styles.createBtn}>
                + 
            </button>
        </div>
    );
}
