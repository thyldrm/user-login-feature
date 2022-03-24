const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken")

const passwordToHash = (password) => {
    return CryptoJS.HmacSHA256(password, CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString();
}

const generateActivationCode = (user) => {
    return JWT.sign({email:user.email}, process.env.ACCESS_TOKEN_SECRET_KEY)
}

const verifyToken = (token) => {
    return JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
}

module.exports = {
    passwordToHash,
    verifyToken,
    generateActivationCode
}