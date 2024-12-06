import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

/* Proxy - Structural Design Pattern */

class AuthProxy {
    constructor() {
        this.accessToken = localStorage.getItem(ACCESS_TOKEN);
        this.refreshToken = localStorage.getItem(REFRESH_TOKEN);
    }

    async isAuthorized() {
        if (!this.accessToken) {
            return false;
        }
        const decoded = jwtDecode(this.accessToken);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            return await this.refreshTokenHandler();
        }
        return true;
    }

    async refreshTokenHandler() {
        if (!this.refreshToken) {
            return false;
        }
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: this.refreshToken,
            });
            if (res.status === 200) {
                this.accessToken = res.data.access;
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                return true;
            }
        } catch (error) {
            console.error("Failed to refresh token:", error);
        }
        return false;
    }
}

export const authProxy = new AuthProxy();
