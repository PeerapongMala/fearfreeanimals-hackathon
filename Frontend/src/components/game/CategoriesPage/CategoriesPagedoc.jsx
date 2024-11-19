// src/components/game/CategoriesPage/CategoriesPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import { animalData } from "../../../dummydata"; // นำเข้า animalData จาก data.js
import "./CategoriesPage.css";


const CategoriesPagedoc = () => {
    return (
        <div className="categories-page">
            <h1>แบบทดสอบเสมือนเกม</h1>
                {/* Categories List */}
                <div className="categories">
                    {animalData.map((category) => (
                        <Link to={`/subcategory/${category.category}/doc`} className="category-card" key={category.category}>
                            <h2>{category.category}</h2>
                        </Link>
                    ))}
                </div>
            </div>
    );
};

export default CategoriesPagedoc;
