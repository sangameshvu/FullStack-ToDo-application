import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {

        e.preventDefault();

        setError('');
        setLoading(true);
        try {

            const data = await apiRequest("/auth/signin", {
                method: "POST",
                body: JSON.stringify({
                    username: email,
                    password
                })
            });

            // Store JWT
            localStorage.setItem("token", data.token);

            localStorage.setItem('username', email);
            navigate('/');

        } catch (error) {

            setError(error.message);
        } finally {
            setLoading(false);

        }
    };

    return (
                <main className="auth-page">
                    <form className="auth-card" onSubmit={handleLogin}>
                        <div className="auth-brand"><span className="brand-mark">✓</span> Daymark</div>
                        <p className="eyebrow">WELCOME BACK</p>
                        <h1>Pick up where you left off.</h1>
                        <p className="auth-copy">Sign in to keep your day moving with intention.</p>
                        {location.state?.message && <p className="success-message">{location.state.message}</p>}
                        {error && <p className="error-message">{error}</p>}
                        <label>Email address<input type="email" placeholder="you@smtg.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
                        <label>Password<input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
                        <button className="button button-primary button-wide" disabled={loading} type="submit">{loading ? 'Signing in...' : 'Sign in'}</button>
                        <p className="auth-switch">New here? <Link to="/signup">Create an account</Link></p>
                    </form>
                </main>
    );
}

export default Login;
