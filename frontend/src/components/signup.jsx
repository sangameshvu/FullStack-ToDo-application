import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        setError('');
        setLoading(true);
        try {

            await apiRequest('/auth/signup', {
                method: "POST",
                body: JSON.stringify({
                    username: email,
                    password
                })
            });

            navigate('/login', { state: { message: 'Account created. You can sign in now.' } });

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
                <main className="auth-page">
                    <form className="auth-card" onSubmit={handleSignup}>
                        <div className="auth-brand"><span className="brand-mark">✓</span> Daymark</div>
                        <p className="eyebrow">START FRESH</p>
                        <h1>Build a better rhythm.</h1>
                        <p className="auth-copy">Create your private workspace and turn loose ends into progress.</p>
                        {error && <p className="error-message">{error}</p>}
                        <label>Email address<input type="email" placeholder="you@example.com" pattern="^[^\s@]+@[^\s@]+\.com$" title="Use an email containing @ and ending with .com" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
                        <label>Password<input type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required /></label>
                        <p className="field-hint">Use uppercase, lowercase, a number, and a special character.</p>
                        <button className="button button-primary button-wide" disabled={loading} type="submit">{loading ? 'Creating account...' : 'Create account'}</button>
                        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
                    </form>
                </main>
    );
}

export default Signup;
