import { TUserData, TLoginUserData, TUpdateUserData, TTransferMoney } from "./types";
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
    } catch (err) {
        return err;
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

export async function validateLoginForm(data: TLoginUserData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/user/login`, {
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

export async function validateUpdateForm(data: TUpdateUserData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/user/update`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return response.json();
    } catch (err) {
        return err;
    }
}

export async function clearAuthCookie() {
    try {
        await fetch(`${API_BASE_URL}/api/v1/user/logout`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        return err;
    }
}

export async function fetchUsers(filter?: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/user/bulk?filter=${filter ? filter : ""}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.json();
    }
    catch (err) {
        return err;
    }
}

export async function fetchBalance() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/account/balance`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.json();
    }
    catch (err) {
        return err;
    }
}

export async function sendMoney(data: TTransferMoney) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/account/transfer`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
    catch (err) {
        return err;
    }
}