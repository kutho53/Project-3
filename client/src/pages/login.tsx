import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../utils/mutations';
//import { fake_login_query } from '../utils/fakeData';

// import Auth from '../utils/auth';

export default function Login(){

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [login, { data }] = useMutation(LOGIN);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder login logic - replace with actual authentication
        if (loginData.username === 'admin' && loginData.password === 'password') {
            try {
                await login({
                  variables: { id: "68c48563a98e70171707b0ed" },
                });
          
              } catch (e) {
                console.error(e);
              }
          
              // clear form values
              setLoginData({
                username: '',
                password: ''
              });
        } else {
            setError('Invalid username or password');
        }
    };

    return(
        <section className="login-section">
            <div className="login-container">
                <h2>Log In</h2>
                {error && <div className="error-message">{error}</div>}
                { data ? (
                    <p>
                    Success! You may now head to your {' '}
                    <Link to={`user/${data?.login._id}`}>Client List.</Link>
                  </p>
                ):(
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
                )
                }
            </div>
        </section>
    )
}