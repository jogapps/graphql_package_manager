const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const User = require('../models/user');
const {generateToken} = require("../utils/security/tokens.utils");
const ApiError = require("../utils/requests/ApiError");

const createUser = async ({ email, password, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ email, password: hashedPassword, role });
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(httpStatus.HTTP_STATUS_UNAUTHORIZED, 'Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(httpStatus.HTTP_STATUS_UNAUTHORIZED, 'Invalid credentials');
    return generateToken(user.id, user.role, email)
    // jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
    createUser,
    loginUser,
};