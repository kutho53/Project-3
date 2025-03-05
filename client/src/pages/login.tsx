//Default landing page if not logged in

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder login logic - replace with actual authentication
        if (loginData.username === 'admin' && loginData.password === 'password') {
            navigate('/clientList');
        } else {
            setError('Invalid username or password');
        }
    };

    return(
        <section className="login-section">
            <div className="login-container">
                <h2>Log In</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={loginData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Log In</button>
                </form>
            </div>
        </section>
    )
}