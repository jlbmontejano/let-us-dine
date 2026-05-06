import { NextFunction, Request, Response } from "express";

import asyncHandler from "@/middleware/asyncHandler";
import ErrorResponse from "@/utils/errorResponse";
import { checkParamsSchema } from "@/utils/zod-validation";

const validateParams = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const idValidation = checkParamsSchema.safeParse(req.params);

    if (!idValidation.success) {
      return next(new ErrorResponse("Error validando ID.", 400));
    }

    next();
  },
);

export default validateParams;
