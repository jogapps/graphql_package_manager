const bcrypt = require('bcrypt');
const User = require('../models/user');
const httpStatus = require('http-status');
const ApiError = require("../utils/requests/ApiError");
const {generateToken} = require("../utils/security/tokens.utils");

const createUser = async ({ email, password, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ email, password: hashedPassword, role });
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(httpStatus.HTTP_STATUS_UNAUTHORIZED, 'Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(httpStatus.HTTP_STATUS_UNAUTHORIZED, 'Invalid credentials');
    return generateToken(user.id, user.role, email);
};

module.exports = {
    createUser,
    loginUser,
};