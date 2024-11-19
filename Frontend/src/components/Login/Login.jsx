import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Login = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/users/login", {
                username: formData.username,
                password: formData.password,
            });

            localStorage.setItem("userId", response.data.id); // Save user ID
            localStorage.setItem("username", response.data.username); // Save username

            // Trigger event to notify Header of username change
            window.dispatchEvent(new Event("usernameChange"));

            alert(`Welcome, ${response.data.username}!`);
            history.push("/"); // Redirect to home
        } catch (error) {
            console.error("Login failed:", error.response || error.message);
            setError("Invalid username or password. Please try again.");
        }
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" id="btn-login">Login</button>
                    <button type="button" onClick={() => history.push('/register')}>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
