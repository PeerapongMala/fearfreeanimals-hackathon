import React, { useEffect, useState } from "react";
import "./profile.css";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Retrieve username from localStorage
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            alert("กรุณาเข้าสู่ระบบก่อนเข้าถึงโปรไฟล์");
            history.push("/login"); // Redirect to login if no username is found
        }
    }, [history]);

   
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        setUsername(null); // ล้าง username ใน state
        window.dispatchEvent(new Event("usernameChange")); // Trigger event
        history.push("/"); // กลับไปที่หน้าแรก
        alert("คุณได้ออกจากระบบแล้ว");
    };
    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>ข้อมูลส่วนตัว</h1>
            </div>
            <div className="profile-card">
                
                <h2>{username}</h2> {/* Display the username dynamically */}
                <ul className="profile-options">
                    <li>
                        <i className="fa fa-key"></i> เปลี่ยนรหัสผ่านใหม่
                        <i className="fa fa-chevron-right"></i>
                    </li>
                    <li>
                        <i className="fa fa-book"></i> ประวัติการทดสอบ
                        <i className="fa fa-chevron-right"></i>
                    </li>
                    <li>
                        <i className="fa fa-star"></i> สะสมคอยน์
                        <i className="fa fa-chevron-right"></i>
                    </li>
                    <li>
                        <i className="fa fa-gift"></i> แลกรางวัล
                        <i className="fa fa-chevron-right"></i>
                    </li>
                    <li>
                        <i className="fa fa-info-circle"></i> ข้อมูล
                        <i className="fa fa-chevron-right"></i>
                    </li>
                    <li>
                        <i className="fa fa-book"></i> คู่มือและคำแนะนำ
                        <i className="fa fa-chevron-right"></i>
                    </li>
                </ul>
                <button className="logout-button" onClick={handleLogout}>
                    <i className="fa fa-sign-out-alt" onClick={handleLogout}></i> ออกจากระบบ
                </button>
            </div>
        </div>
    );
};

export default Profile;
