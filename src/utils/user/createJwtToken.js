const jwt = require("jsonwebtoken");

// create jwt token
const createJwtToken = (user_name, id) => {
    const token = jwt.sign({user_name, id}, process.env.PASS_SEC);
    return token
}

module.exports = { createJwtToken }