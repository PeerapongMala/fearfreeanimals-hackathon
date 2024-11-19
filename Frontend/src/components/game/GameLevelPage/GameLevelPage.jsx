import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { animalData } from "../../../dummydata";
import "./GameLevelPage.css";

const GameLevelPage = () => {
    const { category, animal, level } = useParams();
    const history = useHistory();
    const userId = localStorage.getItem("userId"); // Check if user is logged in
    const [mediaUrl, setMediaUrl] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMedia = () => {
            const categoryData = animalData.find((cat) => cat.category === category);
            const animalLevels = categoryData?.animals[animal]?.levels;

            if (animalLevels) {
                const media = animalLevels[level];
                setMediaUrl(media || "");
            } else {
                console.error("Category or animal levels not found");
                alert("ไม่พบข้อมูลในระบบสำหรับระดับนี้");
            }
        };

        fetchMedia();
    }, [category, animal, level]);

    const handleNextLevel = async () => {
        try {
            setLoading(true);

            // Handle unauthenticated users
            if (!userId) {
                if (parseInt(level) === 10) {
                    history.push("/congratulations");
                } else {
                    history.push(`/category/${category}/${animal}/level/${parseInt(level) + 1}`);
                }
                return;
            }

            // Handle authenticated users
            await axios.put(
                `http://localhost:8080/game-progress/progress/general/${userId}`,
                null,
                {
                    params: {
                        animalType: animal,
                        level: parseInt(level),
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Navigate to the next level or congratulations page
            if (parseInt(level) === 10) {
                history.push("/congratulations");
            } else {
                history.push(`/category/${category}/${animal}/level/${parseInt(level) + 1}`);
            }
        } catch (error) {
            console.error("Error saving progress or unlocking next level:", error.response || error.message);
            alert("ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="game-level-page">
            <h2>Level {level} - {animal}</h2>
            <div className="image-container">
                {mediaUrl ? (
                    parseInt(level) === 9 || parseInt(level) === 10 ? (
                        <video key={mediaUrl} controls autoPlay>
                            <source src={process.env.PUBLIC_URL + mediaUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img src={process.env.PUBLIC_URL + mediaUrl} alt={`Level ${level} animal`} />
                    )
                ) : (
                    <p>ไม่พบสื่อในระดับนี้</p>
                )}
            </div>
            <div className="game-instructions">
                <p>*คำแนะนำ* ก่อนเริ่มรับชมภาพถัดไป โปรดปฏิบัติตามขั้นตอนผ่อนคลายต่อไปนี้:</p>
                <ol>
                    <li>หายใจเข้าลึก ๆ นับในใจ 1... 2... 3... 4... 5...</li>
                    <li>ค่อย ๆ หายใจออกลึก ๆ เพื่อช่วยลดความตึงเครียด</li>
                </ol>
            </div>
            <div className="button-group">
                <button onClick={() => history.goBack()} disabled={loading}>
                    {loading ? "กำลังโหลด..." : "ออก"}
                </button>
                <button onClick={handleNextLevel} disabled={loading}>
                    {loading ? "กำลังบันทึก..." : "ต่อไป"}
                </button>
            </div>
        </div>
    );
};

export default GameLevelPage;
