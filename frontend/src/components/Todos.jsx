// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxQGdtYWlsLmNvbSIsInVzZXJJZCI6IjZhYWNiZmIxNzQ0MDg0ZmY5NmVlZjg5YSIsImlhdCI6MTc4OTcwNjY1NH0.tOpLHX5N3vaWKDhD5d7F2cMsw3bjMqXapaocejE53Tk

import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

function Todos({ view = 'all' }){
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchTodos() {
            const data = await apiRequest('/todo/allTodos');
            setTodos(data.allTodos || []);
        }

        fetchTodos().catch((fetchError) => {
            setError(fetchError.message);
        }
        );
    }, []);

    const visibleTodos = view === 'completed' ? todos.filter((todo) => todo.completed) : todos;

    const markCompleted = async (id) => {
        try {
            await apiRequest(`/todo/completed/${id}`, { method: 'PUT' });
            setTodos((currentTodos) => currentTodos.map((todo) => todo._id === id ? { ...todo, completed: true } : todo));
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    return (
                <section className="todo-list-section">
                    <div className="list-heading"><div><p className="eyebrow">YOUR LIST</p><h2>{view === 'completed' ? 'Completed todos' : 'All todos'}</h2></div><span className="todo-count">{visibleTodos.length} {visibleTodos.length === 1 ? 'item' : 'items'}</span></div>
                    {error && <p className="error-message">{error}</p>}
                    {visibleTodos.length === 0 && !error && <div className="empty-state"><span className="empty-icon">✓</span><h3>{view === 'completed' ? 'Nothing completed yet.' : 'Your list is clear.'}</h3><p>{view === 'completed' ? 'Finish a todo and it will appear here.' : 'Add a todo when something needs your attention.'}</p></div>}
                    <div className="todo-grid">{visibleTodos.map((todo) => <article className={todo.completed ? 'todo-card completed' : 'todo-card'} key={todo._id}><div className="todo-card-top"><span className="todo-status">{todo.completed ? 'DONE' : 'OPEN'}</span><span className="todo-dot" /></div><h3>{todo.title}</h3><p>{todo.description}</p>{todo.completed ? <span className="completed-label">Completed</span> : <button className="complete-button" onClick={() => markCompleted(todo._id)} type="button">Mark complete <span>→</span></button>}</article>)}</div>
                </section>
    )
}

export default Todos;
