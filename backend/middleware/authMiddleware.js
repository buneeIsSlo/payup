require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(403).json({});
    }

    const token = authHeader.split(" ")[1];
    const SECRET = process.env.JWT_SECRET;
    try {
        const decodedToken = jwt.verify(token, SECRET);
        req.userId = decodedToken.userId;
        next();
    }
    catch (err) {
        res.status(403).json({});
    }
}

module.exports = authMiddleware;

