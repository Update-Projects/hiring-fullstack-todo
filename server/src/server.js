const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const todosRouter = require("./routes/todos");

const connectDB = require("./config/db");
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);
app.use(express.json());

connectDB();

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/todos", todosRouter);
app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
