const JWT = require("jsonwebtoken");
const httpStatus = require("http-status");
const ApiError = require("../utils/requests/ApiError");
const jwtUtils = require("../utils/security/jwt.utils");

module.exports = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token || !token.startsWith('Bearer ')) {
        return next();
    }

    // Extract the actual token without "Bearer "
    const tokenWithoutBearer = token.slice(7);

    if (token) {
        JWT.verify(tokenWithoutBearer, jwtUtils.secret, (error, data) => {
            if (error) throw new ApiError(httpStatus.HTTP_STATUS_UNAUTHORIZED, "Invalid token found");
            else {
                req.user = data;
                next();
            }
        });
    } else throw new ApiError(httpStatus.HTTP_STATUS_UNAUTHORIZED, "Token is required");
}