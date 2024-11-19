// src/context/UserContext.js
import React, { createContext, useState, useContext } from "react";

// สร้าง Context
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        coins: 0
    });

    const login = () => {
        setUser((prevState) => ({ ...prevState, isLoggedIn: true }));
    };

    const logout = () => {
        setUser({ isLoggedIn: false, coins: 0 });
    };

    const addCoin = () => {
        if (user.isLoggedIn) {
            setUser((prevState) => ({ ...prevState, coins: prevState.coins + 1 }));
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, addCoin }}>
            {children}
        </UserContext.Provider>
    );
};
