export const cookieConfig = {
    httpOnly: true, // Makes cookie inaccessible to JavaScript
    secure: false,  // Set to true if using HTTPS
    sameSite: 'strict', // Prevents CSRF
    secure: process.env.NODE_ENV === 'production',
    maxAge: 2592000,
}