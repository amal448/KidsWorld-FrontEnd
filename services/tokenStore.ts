
let accessToken: string | null = null;

export const tokenStore = {
    setToken: (token: string) => {
        accessToken = token;
    },
    getToken: () => {
        return accessToken;
    },
    clearToken: () => {
        accessToken = null;
    }
};
