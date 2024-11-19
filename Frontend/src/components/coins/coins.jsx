import React from "react";
import "./coins.css";
import { rewardsData } from "../../dummydata"; // Import rewardsData from data.js
import { useParams } from "react-router-dom";

const Coins = () => {
    const { id } = useParams(); // ดึง id จาก URL

    if (id !== "coins") {
        return <div>Page not found</div>;
    }

    return (
        <div className="rewards-container">
            <header className="header">
                <h2>FearFree Animals</h2>
            </header>
            <div className="coin-section">
                <div className="coin-box">
                    <span className="coin-title">คอยน์ของฉัน</span>
                    <span className="coin-amount">1 คอยน์</span>
                </div>
            </div>
            <div className="rewards-list">
                <h3>แลกของรางวัล</h3>
                {rewardsData.map((reward) => (
                    <RewardItem
                        key={reward.id}
                        image={reward.image}
                        title={reward.title}
                        coins={reward.coins}
                    />
                ))}
            </div>
        </div>
    );
}

function RewardItem({ image, title, coins }) {
    return (
        <div className="reward-item">
            <img src={image} alt={title} className="reward-image" />
            <div className="reward-info">
                <p>{title}</p>
                <span>{coins} คอยน์</span>
                <button className="exchange-button">แลก</button>
            </div>
        </div>
    );
}

export default Coins; // เปลี่ยนชื่อเป็น Coins
