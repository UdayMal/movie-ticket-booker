const jwt = require("jsonwebtoken");
const jwt_secret = "MERN-STACK-MOVIE";

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ success: false, message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        console.log("Extracted Token:", token);

        const decoded = jwt.verify(token, jwt_secret);
        console.log("Decoded Token:", decoded);

        req.body.userId = decoded.userId;  // Ensure the token contains userId
        next();
    } catch (error) {
        res.status(401).send({ success: false, message: "Invalid token" });
    }
};
