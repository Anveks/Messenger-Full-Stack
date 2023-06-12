import express, { NextFunction, Request, Response } from "express";
import { request } from "http";

const router = express.Router();

router.get("/data", async(request: Request, response: Response, next: NextFunction) => {
  try{
    //
  } catch(err: any) {
    next(err);
  }
});

export default router;