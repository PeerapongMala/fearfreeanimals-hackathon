import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { animalData } from "../../../dummydata";
import "./GameLevelPage.css";

const GameLevelPagedoc = () => {
    const { category, animal, level } = useParams(); // รับพารามิเตอร์จาก URL
    const history = useHistory();
    const [mediaUrl, setMediaUrl] = useState("");
    const [symptomNotes, setSymptomNotes] = useState(""); // เก็บข้อความอาการ
    const [userId, setUserId] = useState(null); // เก็บ userId
    const [loading, setLoading] = useState(false); // สถานะการโหลด

    // ดึงข้อมูล userId และ Media URL
    useEffect(() => {
        const fetchUserIdAndMedia = async () => {
            try {
                const accessCode = localStorage.getItem("accessCode");
                if (!accessCode) throw new Error("ไม่พบ AccessCode");

                // ดึง userId จาก AccessCode
                const userIdResponse = await axios.get(
                    `http://localhost:8080/users/user-id-by-access-code/${accessCode}`
                );
                const userId = userIdResponse.data;

                if (!userId) throw new Error("ไม่พบข้อมูลผู้ใช้");

                setUserId(userId);
                localStorage.setItem("userId", userId);

                // โหลดข้อมูล Media สำหรับ animal
                const categoryData = animalData.find((cat) => cat.category === category);
                const animalLevels = categoryData?.animals[animal]?.levels;

                if (animalLevels) {
                    setMediaUrl(animalLevels[level] || "");
                } else {
                    throw new Error("ไม่พบข้อมูลด่านในระบบ");
                }
            } catch (error) {
                console.error("Failed to fetch userId or media:", error.message);
                alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
                history.push("/registerdoc"); // เปลี่ยนไปหน้า Register หากมีปัญหา
            }
        };

        fetchUserIdAndMedia();
    }, [category, animal, level, history]);

    // ฟังก์ชันบันทึก Symptom Notes
    const saveSymptomNotes = async () => {
        try {
            setLoading(true);

            // ส่งข้อมูลไปยัง Backend
            await axios.put(
                `http://localhost:8080/game-progress/${userId}/update-symptom`,
                {
                    animal: animal, // ประเภทของสัตว์
                    level: parseInt(level), // ระดับเลเวล
                    text: symptomNotes, // ข้อความอาการ
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            console.log("Data saved:", { userId,animal, level, text: symptomNotes });
        } catch (error) {
            console.error("Failed to save symptom notes:", error.response || error.message);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        } finally {
            setLoading(false);
        }
    };

    // ฟังก์ชันสำหรับไปยังด่านถัดไป
    const handleNextLevel = async () => {
        if (!symptomNotes.trim()) {
            alert("กรุณากรอกอาการก่อนดำเนินการต่อ");
            return;
        }

        try {
            await saveSymptomNotes();

            // เปลี่ยนไปยังด่านถัดไป
            if (parseInt(level) === 10) {
                history.push("/congratulations");
            } else {
                history.push(`/category/${category}/${animal}/level/${parseInt(level) + 1}/doc`);
            }
        } catch (error) {
            console.error("Failed to move to next level:", error.message);
        }
    };

    // ฟังก์ชันสำหรับออกจากหน้า
    const handleExit = async () => {
        try {
            await saveSymptomNotes(); // บันทึกข้อมูลก่อนออก
        } catch (error) {
            console.error("Failed to save on exit:", error.message);
        } finally {
            history.push(`/levels/${category}/${animal}/doc`);
        }
    };

    return (
        <div className="game-level-page">
            <h2>
                Level {level} - {animal}
            </h2>
            <div className="image-container">
                {mediaUrl ? (
                    <img src={process.env.PUBLIC_URL + mediaUrl} alt={`Level ${level} animal`} />
                ) : (
                    <p>ไม่พบสื่อในระดับนี้</p>
                )}
            </div>
            <div className="symptom-notes">
                <label htmlFor="symptom-notes">บันทึกอาการขณะรับชมภาพ</label>
                <textarea
                    id="symptom-notes"
                    value={symptomNotes}
                    onChange={(e) => setSymptomNotes(e.target.value)}
                    placeholder="พิมพ์ข้อความอาการที่นี่..."
                />
            </div>
            <div className="button-group">
                <button onClick={handleExit} disabled={loading}>
                    {loading ? "กำลังบันทึก..." : "ออก"}
                </button>
                <button onClick={handleNextLevel} disabled={loading}>
                    {loading ? "กำลังบันทึก..." : "ต่อไป"}
                </button>
            </div>
        </div>
    );
};

export default GameLevelPagedoc;
