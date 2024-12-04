const {ROLES} = require("../utils/text");
const httpStatus = require("http-status");
const ApiError = require("../utils/requests/ApiError");

let adminAuth = (req, res, next) => {
    const { role } = req.user;
    if(role === ROLES.ADMIN) return;
    else throw new ApiError(httpStatus.HTTP_STATUS_UNAUTHORIZED, "Unauthorized Admin");
}

let validateAuth = (req, res, next) => {
    const { id, role } = req.user;
    if(id && role) return;
    else throw new ApiError(httpStatus.HTTP_STATUS_UNAUTHORIZED, "Unauthorized User");
}

module.exports = {
    adminAuth,
    validateAuth
}