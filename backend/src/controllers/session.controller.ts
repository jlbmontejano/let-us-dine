import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import asyncHandler from "../middleware/asyncHandler";
import * as SessionServices from "../services/session.services";
import { CreateSessionInfo } from "../types/index";
import { SessionInfo as FindSessionInfo } from "../types/shared";
import ErrorResponse from "../utils/errorResponse";
import {
  createSessionResultSchema,
  createSessionSchema,
} from "../utils/zod-validation";

//@desc    Create a new session
//@route   POST /sessions
//@access  Public
export const createSession = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const dataValidation = createSessionSchema.safeParse(req.body);

    if (!dataValidation.success) {
      return res.status(400).json({
        success: false,
        message: "Data validation failed.",
      });
    }

    const { totalParticipants } = dataValidation.data;

    try {
      const uuid = uuidv4();

      const session: CreateSessionInfo = await SessionServices.create(
        uuid,
        totalParticipants,
      );

      return res.status(201).json({
        success: true,
        data: session,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal error." });
    }
  },
);

//@desc    Get a specific session
//@route   GET /sessions/:id
//@access  Public
export const getSession = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const session: FindSessionInfo | null = await SessionServices.findById(id);

    if (!session) {
      throw new ErrorResponse("Session not found.", 404);
    }

    return res.status(200).json({ success: true, data: session });
  },
);

//@desc    Get all sessions
//@route   GET /sessions
//@access  Admin
export const getSessions = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const sessions: FindSessionInfo[] = await SessionServices.findAll();

    return res
      .status(200)
      .json({ success: true, count: sessions.length, data: sessions });
  },
);

//@desc    Create a session's results for one user
//@route   POST /sessions/:id
//@access  Public
export const createSessionResult = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const session: FindSessionInfo | null = await SessionServices.findById(id);

    if (!session) {
      throw new ErrorResponse("Session not found.", 404);
    }

    if (!session.isActive) {
      throw new ErrorResponse("This session is inactive.", 400);
    }

    try {
      const dataValidation = createSessionResultSchema.safeParse(req.body);

      if (!dataValidation.success) {
        return res.status(400).json({
          success: false,
          message: "Data validation failed.",
        });
      }

      await SessionServices.createResult(id, dataValidation.data);

      return res.status(201).json({
        success: true,
        message: "Your results have been added to the session.",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Error creating session result.",
      });
    }
  },
);

//@desc    Get a session's results
//@route   GET /sessions/:id/results
//@access  Public
export const getSessionResults = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const completedSession = await SessionServices.findResultsById(id);

    if (!completedSession) {
      throw new ErrorResponse("Session not found.", 404);
    }

    return res.status(200).json({
      success: true,
      data: completedSession,
    });
  },
);

//@desc    Delete sessions that are older than 1 week
//@route   DELETE /sessions/cleanup
//@access  Admin
export const deleteSessions = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await SessionServices.deleteOldSessions();

    return res.status(204).json({
      success: true,
    });
  },
);
