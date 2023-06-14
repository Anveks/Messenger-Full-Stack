import express, { Request, Response, NextFunction } from "express";
import { CredentialsModel } from "../2-models/credentials-model";
import authService from "../5-services/auth-service";
import cyber from "../4-utils/cyber";
import { UserModel } from "../2-models/user-model";

const router = express.Router();

// login
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await authService.login(credentials);
      response.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});

// register
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = new UserModel(request.body);
    const token = await authService.register(user);
    response.status(201).json(token);
  }
  catch(err: any) {
      next(err);
  }
});

export default router;