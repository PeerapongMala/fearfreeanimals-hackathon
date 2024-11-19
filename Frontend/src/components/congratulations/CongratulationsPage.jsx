import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../congratulations/CongratulationsPage.css";

const CongratulationsPage = () => {
    const history = useHistory();
    const [userId, setUserId] = useState(null); // State to track userId

    useEffect(() => {
        // Check for userId in localStorage
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
    }, []);

    const handleContinue = () => {
        history.push("/categories"); // Redirect to categories
    };

    const handleSignUp = () => {
        history.push("/register"); // Redirect to registration page
    };

    return (
        <div className="congratulations-page">
            <h1>ยินดีด้วย!</h1>
            <div className="coin-container">
                <img src="/images/coins.png" alt="Coin" className="coin-icon" />
                <p>คุณได้ผ่านด่านที่ 10</p>
                {userId ? (
                    <p>ได้รับ 1 คอยน์</p>
                ) : (
                    <p>(หากคุณต้องการสะสมคอยน์ โปรดสมัครบัญชี)</p>
                )}
            </div>
            <button onClick={handleContinue} className="continue-button">ออกจากเกม</button>
            {!userId && (
                <button onClick={handleSignUp} className="continue-button">
                    สมัครบัญชีการใช้งาน
                </button>
            )}
        </div>
    );
};

export default CongratulationsPage;
