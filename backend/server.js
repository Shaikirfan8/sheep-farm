require("dotenv").config();

// ================= Environment Validation =================
const validateEnv = require("./config/envValidator");

// Validate Environment Variables BEFORE starting the application
validateEnv();

const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

// Enterprise Rate Limiter
const {
    apiLimiter,
    loginLimiter
} = require("./middleware/rateLimiter");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

// Database Connection
require("./config/database");

// Routes
const authRoutes = require("./routes/authRoutes");
const sheepRoutes = require("./routes/sheepRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const healthRoutes = require("./routes/healthRoutes");

// Global Error Handler
const errorHandler = require("./middleware/errorHandler");

const app = express();

// =====================================================
// Security & Middleware
// =====================================================

// Security HTTP Headers
app.use(helmet());

// HTTP Request Logger
app.use(morgan("dev"));

// Login Rate Limiter (Protect Login API)
app.use("/api/auth/login", loginLimiter);

// General API Rate Limiter
app.use(apiLimiter);

// Compress HTTP Responses
app.use(compression());

// Enable CORS
app.use(cors());

// Parse JSON Request Body
app.use(express.json());

// Serve Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =====================================================
// Swagger Documentation
// =====================================================

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// =====================================================
// API Routes
// =====================================================

// Health Check Route
app.use("/health", healthRoutes);

// Application Routes
app.use("/api/auth", authRoutes);
app.use("/api/sheep", sheepRoutes);
app.use("/api/dashboard", dashboardRoutes);

// =====================================================
// Home Route
// =====================================================

app.get("/", (req, res) => {
    res.json({
        message: "🐑 Sheep Farm Management API Running"
    });
});

// =====================================================
// Global Error Handler
// =====================================================

app.use(errorHandler);

// =====================================================
// Start Server
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on Port ${PORT}`);
});