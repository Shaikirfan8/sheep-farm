const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// ================= LOGIN SERVICE =================

const login = async ({ username, password }) => {

    const users = await User.findByUsername(username);

    if (users.length === 0) {
        throw {
            status: 401,
            message: "Invalid username or password"
        };
    }

    const user = users[0];

    const match = await bcrypt.compare(
        password,
        user.password
    );

    if (!match) {
        throw {
            status: 401,
            message: "Invalid username or password"
        };
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    const {
    password: _,
    ...safeUser
} = user;

return {
    token,
    user: safeUser
};

};

// ================= REGISTER SERVICE =================

const register = async ({
    full_name,
    username,
    password,
    role
}) => {

    const existingUser = await User.checkUsernameExists(username);

    if (existingUser.length > 0) {
        throw {
            status: 400,
            message: "Username already exists"
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.createUser({
        full_name,
        username,
        password: hashedPassword,
        role
    });

};

module.exports = {
    login,
    register
};