export const cookieConfig = {
    httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not accessible to JavaScript
    secure: true, // Ensures the cookie is sent only over HTTPS
    sameSite: "None", // Allows cross-site cookies
    path: "/", // Ensures the cookie is sent for all paths
};