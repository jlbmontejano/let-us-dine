import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import resultRoutes from "../src/routes/result.routes";
import sessionRoutes from "../src/routes/session.routes";
import errorHandler from "./middleware/errorHandler";
import answersRoutes from "./routes/answer.routes";
import questionsRoutes from "./routes/question.routes";
import path from "path";

const app = express();

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	ipv6Subnet: 56,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
	})
);
app.use(limiter);

app.use("/results", resultRoutes);
app.use("/sessions", sessionRoutes);
app.use("/answers", answersRoutes);
app.use("/questions", questionsRoutes);

app.use(errorHandler);

export default app;
