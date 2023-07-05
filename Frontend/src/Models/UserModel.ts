import UnreadMessageModel from "./UnreadMessageModel";

class UserModel{
  public _id: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public profilePicture: string;
  public pictureFile: File;
  public lastActive: string;
  public isOnline: boolean;
  public unreadMessages: UnreadMessageModel[];
    _doc: any; // unknown stuff from mongo db
}

export default UserModel;