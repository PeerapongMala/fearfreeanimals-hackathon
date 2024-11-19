import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import Head from "./Head";
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState(null);
  const history = useHistory();

  const fetchUsername = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/${userId}`
      );
      setUsername(response.data.username); // อัปเดต username จากเซิร์ฟเวอร์
      console.log("Username updated:", response.data.username);
    } catch (error) {
      console.error("Failed to fetch username:", error);
    }
  };
  useEffect(() => {
    const handleUsernameChange = () => {
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername); // อัปเดต username ทันทีที่มีการเปลี่ยนแปลง
    };

    window.addEventListener('storage', handleUsernameChange);
    window.addEventListener('usernameChange', handleUsernameChange);

    return () => {
      window.removeEventListener('storage', handleUsernameChange);
      window.removeEventListener('usernameChange', handleUsernameChange);
    };
  }, []);
  
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      fetchUsername(storedUserId);
    } else {
      setUsername(null); // ถ้าไม่มี userId ให้ล้าง username
    }

    // ฟัง event การเปลี่ยนแปลง username
    const handleUsernameChange = (e) => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        fetchUsername(storedUserId);
      } else {
        setUsername(null);
      }
    };

    window.addEventListener("usernameChange", handleUsernameChange);

    return () => {
      window.removeEventListener("usernameChange", handleUsernameChange);
    };
  }, []);

  const handleLoginClick = () => {
    if (!username) {
      history.push("/login"); // ไปที่หน้าเข้าสู่ระบบ
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setUsername(null); // ล้าง username ใน state
    window.dispatchEvent(new Event("usernameChange")); // Trigger event
    history.push("/"); // กลับไปที่หน้าแรก
  };

  const goToProfile = () => {
    history.push("/profile"); // ไปที่หน้าโปรไฟล์
  };

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB"}
            onClick={() => setClick(false)}
          >
            <li>
              <NavLink exact to="/" activeClassName="active">
                หน้าหลัก
              </NavLink>
            </li>
            <li>
              <NavLink to="/fearfreeform" activeClassName="active">
                ประเมินความกลัว
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" activeClassName="active">
                แบบทดสอบ
              </NavLink>
            </li>
            <li>
              <NavLink to="/team" activeClassName="active">
                คู่มือแนะนำ
              </NavLink>
            </li>
          </ul>
          <div className="start">
            {username ? (
              <div className="username-display" onClick={goToProfile}>
                <span className="username">สวัสดี, {username}</span>
                {/* <button onClick={handleLogout} className="logout-btn">
                  ออกจากระบบ
                </button> */}
              </div>
            ) : (
              <div className="button" onClick={handleLoginClick}>
                เข้าสู่ระบบ
              </div>
            )}
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times"> </i> : <i className="fa fa-bars"></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
