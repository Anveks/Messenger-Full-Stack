import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import { ICredentialsModel } from "../2-models/credentials-model";
import { IUserModel, UserModel } from "../2-models/user-model";
import appConfig from "../4-utils/app-config";
import cyber from "../4-utils/cyber";
import imageHandler from "../4-utils/image-handler";

async function login(credentials: ICredentialsModel): Promise<string> {
  const err = credentials.validateSync();
  if (err) throw new ValidationError(err.message);

  credentials.password = cyber.hashPassword(credentials.password);

  const user = await UserModel.findOne({
    email: credentials.email,
    password: credentials.password,
  });

  if (!user) throw new UnauthorizedError("Incorrect email or password!");

  const token = cyber.createToken(user);
  return token;
} 

async function register(user: IUserModel): Promise<string>{
  const err = user.validateSync();
  if (err) throw new ValidationError(err.message);
  if (await isEmailTaken(user.email)) throw new ValidationError(`${user.email} is already in use.`);

  user.profilePicture = appConfig.imageUrl + user.profilePicture; // adding the profile pic
  delete user.pictureFile; // maybe i should delete it, but not sure...

  user.password = cyber.hashPassword(user.password); // hashing the password
  await user.save(); // adding new user to the db

  const token = cyber.createToken(user); // creating the token
  return token;
}

async function isEmailTaken(email: string): Promise<boolean> {
  const count = await UserModel.countDocuments({ email });
  return count > 0;
}

export default {
  register,
  login
}