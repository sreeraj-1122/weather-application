const jwt = require("jsonwebtoken");
const SECRET_KEY='123456789';

const AuthMiddleware = async (req, res, next) => {
    console.log(req.headers.authorization, "****");
    let token;

    try { 
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
            console.log(token);

            const user = jwt.verify(token, SECRET_KEY);
            console.log('user???', user);

            // Attach user information to the request for future use if needed
            req.user = user;
            
            next();
        } else {
            throw new Error("Invalid Token Format");            
        }
    } catch (error) {
        console.error('JWT Verification Error:', error);

        if (error.name === "TokenExpiredError") {
            res.status(401).json({ error: "Token Expired" });
        } else if (error.name === "JsonWebTokenError") {
            res.status(401).json({ error: "Invalid Token" });
        } else {
            res.status(401).json({ error: "Authentication Failed" });
        }
    }
};

module.exports = AuthMiddleware;
