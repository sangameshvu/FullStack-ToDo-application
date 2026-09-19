import { useState } from 'react';
import { apiRequest } from '../services/api';

function CreateTodo({ onCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            await apiRequest('/todo/addTodo', { method: 'POST', body: JSON.stringify({ title, description }) });
            setTitle('');
            setDescription('');
            setMessage('Todo added to your list.');
            onCreated();
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    };

    return <form className="todo-form panel" onSubmit={handleSubmit}>
        <p className="eyebrow">NEW TODO</p>
        <h2>What needs your attention?</h2>
        <label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Prepare tomorrow's presentation" required /></label>
        <label>Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add a little context..." rows="5" required /></label>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button className="button button-primary" disabled={loading} type="submit">{loading ? 'Adding...' : 'Add todo'}</button>
    </form>
}

export default CreateTodo;
