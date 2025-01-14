import cors from "cors";
import express from "express";
import answersRoutes from "./routes/answer.routes";
import questionsRoutes from "./routes/question.routes";
import sessionRoutes from "../src/routes/session.routes";
import resultRoutes from "../src/routes/result.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(sessionRoutes);
app.use(questionsRoutes);
app.use(answersRoutes);
app.use(resultRoutes);

export default app;
