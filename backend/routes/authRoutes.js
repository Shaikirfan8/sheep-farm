const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User Authentication APIs
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login Successful
 *       401:
 *         description: Invalid Username or Password
 *       500:
 *         description: Internal Server Error
 */

// Login
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register New User
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - username
 *               - password
 *               - role
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: John Doe
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 example: Manager
 *     responses:
 *       201:
 *         description: User Registered Successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

// Register
router.post("/register", authController.register);

module.exports = router;