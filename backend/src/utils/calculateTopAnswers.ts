import { Prisma } from "@prisma/client";
import { TopAnswer } from "../types/shared";

export default async function calculateTopAnswers(
	id: string,
	txClient: Prisma.TransactionClient
): Promise<TopAnswer[]> {
	return txClient.$queryRaw<TopAnswer[]>`
  		WITH AnswerCounts AS 
  		(
  		  SELECT
  		    a."text" as "answerText",
			a."apiParams" as "answerApiParams",
  		    q."text" as "questionText", 
  		    r."questionId" as "questionId",
  		    r."answerId" as "answerId",
  		    CAST(COUNT(*) AS INTEGER) AS "voteCount"
  		  FROM
  		    "Result" r
  		    JOIN "Question" q ON q."id" = r."questionId"
  		    JOIN "Answer" a ON a."id" = r."answerId"
  		  WHERE
  		    r."sessionUuid" = ${id}
  		  GROUP BY
  		    r."questionId",
  		    r."answerId",
  		    a."text",
			a."apiParams",
  		    q."text"
  		),
	
  		MaxCounts AS (
  		  SELECT
  		    "questionId",
  		    MAX("voteCount") AS "maxVoteCount"
  		  FROM
  		    AnswerCounts
  		  GROUP BY
  		    "questionId"
  		)
	
  		SELECT
  		  ac."answerText",
		  ac."answerApiParams",
  		  ac."questionText",
  		  ac."voteCount"
  		FROM
  		  AnswerCounts ac
  		JOIN
  		  MaxCounts mc ON ac."questionId" = mc."questionId" 
  		               AND ac."voteCount" = mc."maxVoteCount"
  		ORDER BY
  		  ac."questionId"
	`;
}
