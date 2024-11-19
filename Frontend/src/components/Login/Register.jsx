import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Register = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/general', formData);
            console.log(response);

            alert('Registration Successful! Please log in.');
            history.push('/login');
        } catch (error) {
            console.error('Registration failed:', error.response || error.message);
            setError('Unable to register. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Register as General User</h2>
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
                    <button type="submit" id="btn-register">Register</button>
                    <button type="button" onClick={() => history.push('/login')}>
                        Already have an account? Log in
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
