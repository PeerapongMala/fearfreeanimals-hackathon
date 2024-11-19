import axios from "axios";

const API_URL = "http://localhost:8080";
const GAME_PROGRESS_URL = `${API_URL}/game-progress`;
const USERS_URL = `${API_URL}/users`;

// Fetch game progress by userId
// export const getGameProgress = async (userId) => {
//     try {
//         const response = await axios.get(`${GAME_PROGRESS_URL}/${userId}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching game progress:", error.response || error.message);
//         throw error;
//     }
// };

// Create game progress for a user
export const createGameProgress = async (userId, progress) => {
    try {
        const response = await axios.post(`${GAME_PROGRESS_URL}/${userId}`, progress);
        return response.data;
    } catch (error) {
        console.error("Error creating game progress:", error.response || error.message);
        throw error;
    }
};

// Move user to the next level
export const moveToNextLevel = async (userId) => {
    try {
        const response = await axios.put(`${GAME_PROGRESS_URL}/next-level/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error moving to next level:", error.response || error.message);
        throw error;
    }
};

// Fetch user ID by access code
export const getUserIdByAccessCode = async (accessCode) => {
    try {
        const response = await axios.get(`${USERS_URL}/user-id-by-access-code/${accessCode}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user ID by access code:", error.response || error.message);
        throw error;
    }
};

// Update symptom notes for a specific level
export const updateSymptomNotes = async (userId, level, notes) => {
    try {
        const response = await axios.put(
            `${GAME_PROGRESS_URL}/${userId}/update-symptom`,
            notes,
            {
                params: { level },
                headers: { "Content-Type": "text/plain" },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating symptom notes:", error.response || error.message);
        throw error;
    }
};

// Update game progress (with extra data if needed)
// export const updateGameProgress = async (userId, animalType, level) => {
//     try {
//         const response = await axios.put(
//             `${GAME_PROGRESS_URL}/progress/${userId}`, // URL สำหรับ PUT
//             null, // ไม่มี body
//             {
//                 params: { animalType, level }, // ส่ง animalType และ level เป็น query parameters
//                 headers: { "Content-Type": "application/json" }, // Content-Type
//             }
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Error updating game progress:", error.response || error.message);
//         throw error;
//     }
// };

// Check if the user exists by ID
export const checkUserExists = async (userId) => {
    try {
        const response = await axios.get(`${USERS_URL}/${userId}/exists`);
        return response.data; // Boolean indicating if the user exists
    } catch (error) {
        console.error("Error checking if user exists:", error.response || error.message);
        throw error;
    }
};

// Delete game progress for a user
export const deleteGameProgress = async (userId) => {
    try {
        const response = await axios.delete(`${GAME_PROGRESS_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting game progress:", error.response || error.message);
        throw error;
    }
};

// Fetch all animals' progress for a user
export const getAllAnimalProgress = async (userId) => {
    try {
        const response = await axios.get(`${GAME_PROGRESS_URL}/${userId}/all`);
        return response.data; // Array of all animal progress
    } catch (error) {
        console.error("Error fetching all animal progress:", error.response || error.message);
        throw error;
    }
};

export const getGameProgress = async (userId, animalType) => {
    const response = await axios.get(`http://localhost:8080/game-progress/${userId}?animalType=${animalType}`);
    return response.data;
};
export const updateGameProgress = async (userId, animalType, level) => {
    const response = await axios.put(`http://localhost:8080/game-progress/${userId}/update`, null, {
        params: { animalType, level },
    });
    return response.data;
};
