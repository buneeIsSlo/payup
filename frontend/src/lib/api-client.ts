import { TUserData } from "./types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function validateToken() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/user/auth-info`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.json();
    } catch (error) {
        console.error("Error fetching authentication info:", error);
    }
}

export async function validateFormData(data: TUserData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/user/signup`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        return err;
    }
}