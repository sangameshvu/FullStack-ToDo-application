const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,

        headers: {
            "Content-Type": "application/json",
            ...(token && {
                Authorization: `Bearer ${token}`
            }),
            ...options.headers
        }
    });

    const data = response.status === 204 ? {} : await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};
