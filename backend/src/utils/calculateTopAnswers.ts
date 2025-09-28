import { TopAnswer } from "../../../shared/types";
import prisma from "../../prisma/prismaClient";

export default async function calculateTopAnswers(
	id: string
): Promise<TopAnswer[]> {
	return prisma.$queryRaw`
  		WITH AnswerCounts AS 
  		(
  		  SELECT
  		    a."text" as answer_text,
			a."apiParams" as answer_api_params,
  		    q."text" as question_text, 
  		    r."questionId" as question_id,
  		    CAST(COUNT(*) AS INTEGER) AS vote_count
  		  FROM
  		    "Result" r
  		    JOIN "Question" q ON q."id" = r."questionId"
  		    JOIN "Answer" a ON a."id" = r."answerId"
  		  WHERE
  		    r."sessionUuid" = ${id}
  		  GROUP BY
  		    r."questionId", 
  		    a."text",
			a."apiParams",
  		    q."text"
  		),
	
  		MaxCounts AS (
  		  SELECT
  		    question_id,
  		    MAX(vote_count) AS max_vote_count
  		  FROM
  		    AnswerCounts
  		  GROUP BY
  		    question_id
  		)
	
  		SELECT
  		  ac.answer_text,
		  ac.answer_api_params,
  		  ac.question_text,
  		  ac.vote_count
  		FROM
  		  AnswerCounts ac
  		JOIN
  		  MaxCounts mc ON ac.question_id = mc.question_id 
  		               AND ac.vote_count = mc.max_vote_count
  		ORDER BY
  		  ac.question_id
	`;
}
