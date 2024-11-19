// src/components/game/SubcategoryPage/SubcategoryPage.jsx

import React from "react";
import { Link, useParams } from "react-router-dom";
import { animalData } from "../../../dummydata"; // Import animalData from data.js
import "./SubcategoryPage.css";

const SubcategoryPage = () => {
    const { id: categoryId } = useParams(); // Capture the category ID from the route

    // Find the matching category in animalData based on the category ID
    const categoryData = animalData.find((category) => category.category === categoryId);
    const animals = categoryData ? Object.keys(categoryData.animals) : []; // Get list of animals for the category

    return (
        <div className="subcategory-page">
            <h2>{categoryId}</h2>
            <div className="animal-list">
                {animals.map((animal) => (
                    <Link to={`/levels/${categoryId}/${animal}`} className="animal-card" key={animal}>
                        <h3>{animal}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SubcategoryPage;
