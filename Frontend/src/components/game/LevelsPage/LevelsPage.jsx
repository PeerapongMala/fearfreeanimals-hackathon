import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { animalData } from "../../../dummydata";
import "./LevelsPage.css";

const LevelsPage = () => {
    const { subcategoryId: category, animal } = useParams();
    const [unlockedLevel, setUnlockedLevel] = useState(1); // Default unlocked level
    const [totalLevels, setTotalLevels] = useState(0); // Total number of levels
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

    useEffect(() => {
        const fetchLevelData = async () => {
            try {
                // Fetch total levels from dummydata
                const categoryData = animalData.find((cat) => cat.category === category);
                const animalLevels = categoryData?.animals[animal]?.levels;

                if (animalLevels) {
                    setTotalLevels(Object.keys(animalLevels).length);
                } else {
                    throw new Error("ไม่พบข้อมูลระดับในระบบ");
                }

                // Fetch unlocked levels from the backend only for authenticated users
                if (userId) {
                    const response = await axios.get(
                        `http://localhost:8080/game-progress/${userId}`,
                        { params: { animalType: animal } }
                    );

                    // Set unlocked level based on the backend data
                    setUnlockedLevel(response.data.currentLevel || 1);
                } else {
                    // Default unlocked level for unauthenticated users
                    setUnlockedLevel(1);
                }
            } catch (err) {
                console.error("Error fetching level data:", err.response || err.message);
                setError(err.response?.data?.message || err.message || "เกิดข้อผิดพลาด");
            } finally {
                setLoading(false);
            }
        };

        fetchLevelData();
    }, [category, animal, userId]);

    // Generate level numbers dynamically
    const levels = Array.from({ length: totalLevels }, (_, index) => index + 1);

    return (
        <div className="levels-page">
            {loading ? (
                <p>กำลังโหลด...</p>
            ) : error ? (
                <p className="error-message">เกิดข้อผิดพลาด: {error}</p>
            ) : (
                <>
                    <h2>{animal}</h2>
                    <div className="levels">
                        {levels.map((level) => (
                            <div
                                key={level}
                                className={`level ${level <= unlockedLevel ? "unlocked" : "locked"}`}
                            >
                                {level <= unlockedLevel ? (
                                    <Link to={`/category/${category}/${animal}/level/${level}`}>
                                        {level}
                                    </Link>
                                ) : (
                                    <span>🔒</span>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LevelsPage;
