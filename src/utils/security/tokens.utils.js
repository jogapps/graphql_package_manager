const JWT = require("jsonwebtoken");
const jwtUtils = require("./jwt.utils");

const generateToken = (userId, role, email) => {

    const payload = {
        id: userId,
        email,
        role,
    };

    const options = {
        algorithm: jwtUtils.algorithm, 
        expiresIn: Math.floor(Date.now() / 1000) + parseInt(jwtUtils.expiresIn),   
        issuer: jwtUtils.issuer, 
        audience: jwtUtils.audience
      };

    let token = JWT.sign(payload, jwtUtils.secret, options);
    return token;
}

module.exports = { generateToken };