import express, { NextFunction, Request, Response } from "express";
import { CredentialsModel } from "../2-models/credentials-model";
import { UserModel } from "../2-models/user-model";
import authService from "../5-services/auth-service";
import multer from 'multer';
import imageHandler from "../4-utils/image-handler";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageHandler.imagesFolder); // Set the destination folder where the files will be saved
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, imageHandler.generateImageName(file.originalname)); // Set the filename to be the original name of the file
  },
});

const upload = multer({storage});

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
router.post("/auth/register", upload.single('pictureFile'), async (request: Request, response: Response, next: NextFunction) => {
  try {
    // request won't see the image file so had to use the multer middleware to catch it
    const user = new UserModel(request.body);
    const token = await authService.register(user);
    response.status(201).json(token);
  }
  catch(err: any) {
      next(err);
  }
});

export default router;