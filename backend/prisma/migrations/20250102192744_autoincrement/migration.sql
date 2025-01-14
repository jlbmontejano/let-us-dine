-- AlterTable
CREATE SEQUENCE answers_id_seq;
ALTER TABLE "Answers" ALTER COLUMN "id" SET DEFAULT nextval('answers_id_seq');
ALTER SEQUENCE answers_id_seq OWNED BY "Answers"."id";

-- AlterTable
CREATE SEQUENCE question_id_seq;
ALTER TABLE "Question" ALTER COLUMN "id" SET DEFAULT nextval('question_id_seq');
ALTER SEQUENCE question_id_seq OWNED BY "Question"."id";

-- AlterTable
CREATE SEQUENCE sessionquestionanswers_id_seq;
ALTER TABLE "SessionQuestionAnswers" ALTER COLUMN "id" SET DEFAULT nextval('sessionquestionanswers_id_seq');
ALTER SEQUENCE sessionquestionanswers_id_seq OWNED BY "SessionQuestionAnswers"."id";
