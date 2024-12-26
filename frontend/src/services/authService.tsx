import axios from "axios";

// const API_URL = "http://localhost:5328";
const API_URL = "https://ai-meme-generator-backend.vercel.app/";

export interface RegisterResponse {
    message: string;
}

export interface LoginResponse {
    access_token: string;
}

export const registerUser = async (
    email: string,
    password: string
): Promise<RegisterResponse> => {
    const response = await axios.post<RegisterResponse>(
        `${API_URL}/auth/register`,
        { email, password }
    );
    return response.data;
};

export const loginUser = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
        email,
        password,
    });
    return response.data;
};
