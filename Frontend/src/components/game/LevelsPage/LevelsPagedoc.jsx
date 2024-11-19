import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { getGameProgress, updateGameProgress } from "../../api"; // Import API functions
import { animalData } from "../../../dummydata";
import "./LevelsPage.css";

const LevelsPagedoc = () => {
    const { subcategoryId: category, animal } = useParams();
    const history = useHistory();
    const [unlockedLevel, setUnlockedLevel] = useState(1); // ด่านเริ่มต้น
    const [totalLevels, setTotalLevels] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const accessCode = localStorage.getItem("accessCode");
                if (!accessCode) {
                    setError("ไม่พบ AccessCode โปรดกรอกโค้ดอีกครั้ง");
                    return;
                }

                const userId = localStorage.getItem("userId"); // ดึง userId จาก localStorage
                if (!userId) {
                    setError("ไม่พบข้อมูลผู้ใช้ โปรดเข้าสู่ระบบอีกครั้ง");
                    return;
                }

                // ดึงความคืบหน้าเกมจาก API
                const progress = await getGameProgress(userId, animal);
                setUnlockedLevel(progress.currentLevel || 1);
            } catch (err) {
                console.error("Failed to fetch progress:", err);
                setError("เกิดข้อผิดพลาดในการดึงข้อมูลความคืบหน้าเกม");
            }
        };

        // ดึงข้อมูลจำนวนด่านทั้งหมดจาก dummydata
        const categoryData = animalData.find((cat) => cat.category === category);
        const animalLevels = categoryData?.animals[animal]?.levels;
        if (animalLevels) {
            setTotalLevels(Object.keys(animalLevels).length);
        } else {
            setError("ไม่พบข้อมูลด่านสำหรับสัตว์นี้");
        }

        fetchProgress();
    }, [category, animal]);

    const handleLevelClick = async (level) => {
        if (level > unlockedLevel) {
            alert("โปรดปลดล็อกด่านก่อนหน้านี้ก่อน!");
            return;
        }

        try {
            const accessCode = localStorage.getItem("accessCode");
            if (!accessCode) {
                alert("ไม่พบ AccessCode กรุณาเข้าสู่ระบบใหม่");
                return;
            }

            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่");
                return;
            }

            // อัปเดตความคืบหน้าเมื่อเล่นด่านใหม่
            if (level === unlockedLevel && level < totalLevels) {
                await updateGameProgress(userId, animal, level + 1);
                setUnlockedLevel(level + 1);
            }

            // ไปที่ด่านที่เลือก
            history.push(`/category/${category}/${animal}/level/${level}/doc`);
        } catch (err) {
            console.error("Error updating game progress:", err);
            alert("เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า");
        }
    };

    const levels = Array.from({ length: totalLevels }, (_, index) => index + 1); // สร้าง array ของด่านทั้งหมด

    return (
        <div className="levels-page">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <>
                    <h2>เลือกด่านสำหรับ {animal}</h2>
                    <div className="levels">
                        {levels.map((level) => (
                            <div
                                key={level}
                                className={`level ${level <= unlockedLevel ? "unlocked" : "locked"}`}
                            >
                                {level <= unlockedLevel ? (
                                    <Link
                                        to="#"
                                        onClick={() => handleLevelClick(level)}
                                    >
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

export default LevelsPagedoc;
