require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

// Database Connection
require("./config/database");

// Routes
const authRoutes = require("./routes/authRoutes");
const sheepRoutes = require("./routes/sheepRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Global Error Handler
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ================= Middleware =================

app.use(cors());
app.use(express.json());

// Serve Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= Swagger =================

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// ================= API Routes =================

app.use("/api/auth", authRoutes);
app.use("/api/sheep", sheepRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ================= Home Route =================

app.get("/", (req, res) => {
    res.json({
        message: "🐑 Sheep Farm Management API Running"
    });
});

// ================= Global Error Handler =================

app.use(errorHandler);

// ================= Start Server =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on Port ${PORT}`);
});