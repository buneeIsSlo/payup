require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const SECRET = process.env.JWT_SECRET;

        if (!token) {
            throw new Error("Token not found");
        }

        jwt.verify(token, SECRET, (err, decodedToken) => {
            if (err) {
                throw new Error("Token verification failed");
            } else {
                req.userId = decodedToken.userId;
                next();
            }
        });
    } catch (err) {
        res.status(401).json({ error: "Unauthorized request" });
    }
};

module.exports = authMiddleware;
