import express from "express";
import walletRoutes from "./router";
import pool from "./utils";
import cors from "cors";

const app = express();

const port = 3000;

app.use(cors());

app.use(express.json());

app.use("/api", walletRoutes);

// 测试数据库连接
app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 + 1 AS result");
        res.json({ success: true, result: rows });
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ success: false, message: "Database connection failed" });
    }
});

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
