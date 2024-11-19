import React, { useState } from "react";
import "./FearFreeForm.css"; // Connect to the CSS for FearFreeForm
import { useHistory } from "react-router-dom";
import axios from "axios";

const FearFreeForm = () => {
  const [step, setStep] = useState(1);
  const [scores, setScores] = useState(Array(10).fill(0)); // Store scores for 10 questions
  const [percentage, setPercentage] = useState(0); // Store fear percentage
  const [age, setAge] = useState(""); // Store user's age
  const [fear, setFear] = useState(""); // Store fear data
  const [error, setError] = useState(""); // Handle errors
  const history = useHistory();

  const handleNextStep = () => {
    if (step === 1) {
      if (!age || age <= 0) {
        alert("กรุณากรอกอายุที่ถูกต้อง");
        return;
      }
      if (!fear.trim()) {
        alert("กรุณากรอกสัตว์ที่กลัว");
        return;
      }
    }

    if (step === 2) {
      const totalScore = scores.reduce((sum, score) => sum + score, 0);
      const calculatedPercentage = (totalScore / (10 * 10)) * 100;
      setPercentage(calculatedPercentage);
    }

    if (step < 3) setStep(step + 1);
  };

  // Handle score change for questions
  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  // Handle Test Submission
  const handleTestClick = async () => {
    const userId = localStorage.getItem("userId"); // Check if user is logged in
    try {
      if (userId) {
        // If logged in, save data to backend
        await axios.put(
          `http://localhost:8080/users/${userId}/fear-percentage`,
          { fearPercentage: parseFloat(percentage.toFixed(2)) },
          { headers: { "Content-Type": "application/json" } }
        );
        alert("ผลการประเมินของคุณถูกบันทึกเรียบร้อยแล้ว!");
        console.log({
          fearPercentage: parseFloat(percentage.toFixed(2)),
        });
      } else {
        // If not logged in, inform the user
        alert("คุณได้ทำการประเมินเรียบร้อยแล้ว!");
      }
      history.push("/categories");
    } catch (error) {
      console.error("Error updating fear percentage:", error.response || error.message);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่");
    }
  };


  return (
    <div className="fearfree-container">
      {/* Progress Bar */}
      <section className="progress-section">
        <div className="progress-wrapper">
          {/* Step 1 */}
          <div
            className={`step ${step >= 1 ? "active" : ""}`}
            onClick={() => setStep(1)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={step === 1 ? "/images/UxUi2.png" : "/images/UxUi5.png"}
              className="progress-icon"
              alt="กรอกข้อมูล"
            />
            <p>กรอกข้อมูล</p>
          </div>

          <div className={`line ${step > 1 ? "active" : ""}`}></div>

          {/* Step 2 */}
          <div
            className={`step ${step >= 2 ? "active" : ""}`}
            onClick={() => setStep(2)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={step === 2 ? "/images/UxUi6.png" : "/images/UxUi3.png"}
              className="progress-icon"
              alt="ประเมินระดับความกลัว"
            />
            <p>ประเมินระดับความกลัว</p>
          </div>

          <div className={`line ${step > 2 ? "active" : ""}`}></div>

          {/* Step 3 */}
          <div
            className={`step ${step >= 3 ? "active" : ""}`}
            onClick={() => setStep(3)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={step === 3 ? "/images/UxUi7.png" : "/images/UxUi4.png"}
              className="progress-icon"
              alt="ผลสรุป"
            />
            <p>ผลสรุป</p>
          </div>
        </div>
      </section>
      {/* ขั้นตอนที่ 1 */}
      {step === 1 && (
        <main className="form-container">
          <h2>1. กรอกข้อมูล</h2>
          <p>ขั้นตอน 1 ใน 3</p>
          <div className="form-container1">
            <form>

              <label htmlFor="age">อายุ</label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <label htmlFor="fear">กลัวสัตว์อะไรมากที่สุด?</label>
              <input className="input1"
                id="fear"
                name="fear"
                value={fear}
                onChange={(e) => {
                  const value = e.target.value;
                  // ตรวจสอบเฉพาะตัวอักษร (ไม่อนุญาตให้มีตัวเลข)
                  if (/^[^0-9]*$/.test(value)) {
                    setFear(value);
                  } else {
                    alert("กรุณากรอกเฉพาะตัวอักษรเท่านั้น");
                  }
                }}
              ></input>
              <button type="button" className="step1-button" onClick={handleNextStep}>
                เสร็จสิ้น
              </button>
            </form>
          </div>
        </main>
      )}

      {/* ขั้นตอนที่ 2 */}
      {step === 2 && (
        <main className="assessment-container">
          <h2>2. ประเมินระดับความกลัว</h2>
          <p>ขั้นตอน 2 ใน 3</p>
          <div className="assessment-container1">
            <form>
              {[
                "คุณเคยพบกับสัตว์หรือแมลงที่คุณกลัว แล้วคุณมีปฏิกิริยาความกลัวมากน้อยเพียงใด?",
                "หากต้องเผชิญหน้ากับสัตว์หรือแมลงที่กลัว คุณคิดว่าตัวเองจะสามารถจัดการสถานการณ์นั้นได้มากน้อยเพียงใด?",
                "ความกลัวที่คุณมีต่อสัตว์หรือแมลงมันส่งผลกระทบต่อชีวิตประจำวันของคุณมากน้อยแค่ไหน?",
                "คุณคิดว่าวิธีการต่างๆ เพื่อจัดการกับความกลัวสัตว์หรือแมลง วิธีการเหล่านั้นได้ผลมากน้อยแค่ไหน?",
                "หากต้องแนะนำวิธีลดความกลัวสัตว์หรือแมลงให้คนอื่น คุณคิดว่าคำแนะนำของคุณจะช่วยได้มากน้อยเพียงใด?",
                "คุณคิดว่าการอยู่ในสภาพแวดล้อมที่มีสัตว์หรือแมลงที่คุณกลัวจะช่วยลดความกลัวได้มากน้อยแค่ไหน?",
                "หากมีสัตว์หรือแมลงบางชนิดที่คุณรู้สึกกลัวมากกว่าชนิดอื่น ความกลัวนั้นรุนแรงมากน้อยแค่ไหน?",
                "คุณรู้สึกว่าความกลัวสัตว์หรือแมลงรบกวนชีวิตประจำวันของคุณมากน้อยเพียงใด?",
                "หากต้องใช้เทคนิคการบำบัดความกลัว เช่น การเผชิญหน้ากับสัตว์หรือแมลงที่กลัว คุณคิดว่าตัวเองจะสามารถรับมือได้มากน้อยแค่ไหน?",
                "คุณคิดว่าความกลัวนี้สามารถลดลงได้เองตามกาลเวลามากน้อยแค่ไหน?",
              ].map((question, index) => (
                <div key={index} className="question-container">
                  <p>คำถาม {index + 1}: {question}</p>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={scores[index]}
                    onChange={(e) => handleScoreChange(index, parseInt(e.target.value))}
                  />
                </div>
              ))}
              <button type="button" className="step2-button" onClick={handleNextStep}>
                เสร็จสิ้น
              </button>
            </form>
          </div>
        </main>
      )}

      {/* ขั้นตอนที่ 3 */}
      {step === 3 && (
        <main className="result-container">
          <h2>3. ผลการประเมิน</h2>
          <p>ขั้นตอน 3 ใน 3</p>
          <div className="result-box">
            <p>
              <strong>เปอร์เซ็นต์ความกลัว:</strong> {percentage.toFixed(2)}%
            </p>
            {percentage <= 20 && <p>ความกลัวเล็กน้อย - มีความรู้สึกกลัวเล็กน้อยหรือไม่รู้สึกกลัวมากนัก เมื่อเห็น
              หรือเผชิญหน้ากับสัตว์หรือแมลงที่กลัว สามารถควบคุมอารมณ์และความรู้สึกได้ง่าย</p>}
            {percentage > 20 && percentage <= 40 && <p>ความกลัวระดับต่ำถึงปานกลาง - เริ่มรู้สึกไม่สบายใจ แต่ยังสามารถ
              ควบคุมตัวเองได้ และไม่ส่งผลต่อพฤติกรรมหรือการตัดสินใจอย่างชัดเจน</p>}
            {percentage > 40 && percentage <= 60 && <p>ความกลัวระดับปานกลาง - รู้สึกกลัวชัดเจนและเริ่มมีปฏิกิริยา เช่น เหงื่อ
              ออก หรือตัวสั่น แต่ยังสามารถเผชิญหน้าได้แม้ว่าจะรู้สึกอึดอัด</p>}
            {percentage > 60 && percentage <= 80 && <p>ความระดับกลัวสูง - ความกลัวเริ่มเข้มข้นขึ้น มีปฏิกิริยาชัดเจนและต้องการ
              หลีกเลี่ยงการเผชิญหน้า เช่น หลีกหนีหรือถอยออกไป รู้สึกว่าไม่สามารถควบคุมอารมณ์ได้</p>}
            {percentage > 80 && <p>ความกลัวรุนแรงถึงระดับสูงสุด - มีความกลัวเข้าขั้นวิกฤต อาจมีอาการ
              ตื่นตระหนก หายใจไม่สะดวก หรือถึงขั้นช็อคเมื่อเห็นสัตว์หรือแมลงนั้นๆ ไม่สามารถ
              เผชิญหน้าได้และต้องการการช่วยเหลือในการจัดการความกลัว</p>}
          </div>
          <button type="button" className="step3-button" onClick={handleTestClick}>
            พร้อมทดสอบ
          </button>
        </main>
      )}
    </div>
  );
};

export default FearFreeForm;