import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import dataService from "../5-services/data-service";
import { MessageModel } from "../2-models/message-model";
import cyber from "../4-utils/cyber";

const router = express.Router();

// get all users list
router.get("/home", verifyLoggedIn, async(request: Request, response: Response, next: NextFunction) => {
  try{
    const users = await dataService.getAllUsers();
    response.json(users)
  } catch(err: any) {
    next(err);
  }
});

// send a new message
router.post("/message", verifyLoggedIn, async(request: Request, response: Response, next: NextFunction) => {
  try{
    const message = new MessageModel(request.body);
    const newMessage = await dataService.saveMessage(message);
    response.json(newMessage);
  } catch(err: any) {
    next(err);
  }
});

// get message history
router.get("/history/:id([a-zA-Z0-9]+)", verifyLoggedIn, async(request: Request, response: Response, next: NextFunction) => {
  try{
    let userId1;
    const userId2 = request.params.id;
    const header = request.headers.authorization; // get the authorization header
    if (header) {
      const token = header.substring(7); // extract token
      const user = await cyber.decodeToken(token);    
      userId1 = user._doc._id;    
    } 
    const messageHistory = await dataService.getMessageHistory(userId1, userId2);
    response.send(messageHistory);
  } catch(err: any) {
    next(err);
  }
});

export default router;