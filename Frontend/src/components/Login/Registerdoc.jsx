import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Registerdoc = () => {
    const [accessCode, setAccessCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // ตรวจสอบ AccessCode ว่ามีอยู่ในระบบ
            const validateResponse = await axios.get(`http://localhost:8080/users/validate-access-code/${accessCode}`);
            if (validateResponse.data) {
                // ดึง userId โดยใช้ AccessCode
                const userIdResponse = await axios.get(`http://localhost:8080/users/user-id-by-access-code/${accessCode}`);
                const userId = userIdResponse.data;

                // ดึง username โดยใช้ userId
                const usernameResponse = await axios.get(`http://localhost:8080/users/username-by-user-id/${userId}`);
                const username = usernameResponse.data;

                // เก็บ AccessCode, userId, และ username ลง LocalStorage
                localStorage.setItem('accessCode', accessCode);
                localStorage.setItem('userId', userId);
                localStorage.setItem('username', username);

                alert(`เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ ${username}`);
                history.push('/categoriesdoc'); // เปลี่ยนเส้นทางไปยังหน้าหมวดหมู่
            } else {
                setErrorMessage('AccessCode ไม่ถูกต้อง โปรดติดต่อผู้เชี่ยวชาญ');
            }
        } catch (error) {
            console.error('Error processing AccessCode:', error);
            setErrorMessage('เกิดข้อผิดพลาดในการตรวจสอบ AccessCode');
        }
    };

    return (
        <div className="login-container">
            <h2>กรอกโค้ดที่ได้รับจากผู้เชี่ยวชาญ</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="accessCode">AccessCode</label>
                    <input
                        type="text"
                        id="accessCode"
                        name="accessCode"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="form-group1">
                    <button type="submit" id="btn-login">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Registerdoc;
