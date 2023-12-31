import crypto from "crypto";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../2-models/client-errors";
import { IUserModel } from "../2-models/user-model";

interface JwtPayload {
  user: IUserModel;
}

const secretKey = "I like cute kittens.";

function createToken(user: IUserModel): string{
  const { password, ...userData } = user; // separating the password and userData
  const container = { user: userData };
  const options = { expiresIn: "3h" };
  const token = jwt.sign(container, secretKey, options);
  return token;
}

function decodeToken(token: string): any {
  const decodedToken = jwt.verify(token, secretKey) as JwtPayload; // decode the token  
  const { user } = decodedToken; // extract the user obj
  return user;
}

function hashPassword(password: string): string {
  const salt = "chat-app";
  const hashedPassword = crypto.createHmac("sha512", salt).update(password).digest("hex");
  return hashedPassword;
}

function verifyToken(request: Request, response: Response, adminCheck?: boolean): boolean {

  const token = request.header("authorization")?.substring(7);  

  if(!token) throw new UnauthorizedError('No token found');

  jwt.verify(token, secretKey, (err) => {

      if (err) {
        throw new UnauthorizedError('Invalid token');
      } // Check for token validity
  });

  return true;
  
}

export default {
  createToken,
  decodeToken,
  hashPassword,
  verifyToken
}