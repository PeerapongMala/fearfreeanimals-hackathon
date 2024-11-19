// src/components/game/CategoriesPage/CategoriesPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import { animalData } from "../../../dummydata"; // นำเข้า animalData จาก data.js
import "./CategoriesPage.css";

const CategoriesPage = () => {
    return (
        <div className="categories-page">
            <h1>แบบทดสอบเสมือนเกม</h1>
            <div className="categories-container">
                {/* Challenge Card */}
                <div className="challenge-card">
                    <img src="/images/catagory.png" alt="Challenge" className="challenge-image" />
                    <h2>ท้าทาย</h2>
                    <p>กลัวอะไรมากที่สุด?</p>
                    <p className="note">*คำเตือน* อาจมีรูปภาพจริงประกอบ</p>
                    <Link to="/challenge">
                        <button className="challenge-button">
                            <i className="fa fa-arrow-right"></i>
                        </button>
                    </Link>
                </div>

                {/* Categories List */}
                <div className="categories">
                    {animalData.map((category) => (
                        <Link to={`/subcategory/${category.category}`} className="category-card" key={category.category}>
                            <h2>{category.category}</h2>
                        </Link>
                    ))}
                </div>
               
            </div>

        </div>
    );
};

export default CategoriesPage;
