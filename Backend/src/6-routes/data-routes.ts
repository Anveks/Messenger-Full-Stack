import express, { NextFunction, Request, Response } from "express";
import { request } from "http";

const router = express.Router();

router.get("/", async(request: Request, response: Response, next: NextFunction) => {
  try{
    response.send("Server routing works.")
  } catch(err: any) {
    next(err);
  }
});

export default router;