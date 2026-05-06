import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import path from "path";

import errorHandler from "@/middleware/errorHandler";
import answersRoutes from "@/routes/answer.routes";
import questionsRoutes from "@/routes/question.routes";
import resultRoutes from "@/routes/result.routes";
import sessionRoutes from "@/routes/session.routes";

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use(express.json());
app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(limiter);

app.use(express.static(path.join(process.cwd(), "public")));

app.use("/api/results", resultRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/answers", answersRoutes);
app.use("/api/questions", questionsRoutes);

app.use(errorHandler);

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

export default app;
