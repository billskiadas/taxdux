/**
 * Check if a token is valid based on its expiration time.
 * @param {string} token - The token to check.
 * @returns {boolean} True if the token is valid, false otherwise.
 */
const isValidToken = (token) => {
    if (!token) {
        return false;
    }

    const payload = token.split(".")[1];
    if (!payload) {
        return false;
    }

    const decodedPayload = JSON.parse(window.atob(payload));

    const expiryTime = decodedPayload.exp * 1000;
    const currentTime = Date.now();
    return expiryTime > currentTime;
};

const hasTokenExpired = (timestamp) => {
    if (!timestamp) return true;
    return new Date(timestamp * 1000) < new Date();
}

const getFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // Adjusted for 'HH:MM' instead of 'HH:SS' as per typical requirement
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const hasAccessTokenChanged = (accessToken) => {
    const localAccessToken = localStorage.getItem('access_token');
    return localAccessToken !== accessToken;
}


export { isValidToken, hasTokenExpired, hasAccessTokenChanged, getFormattedDate };
