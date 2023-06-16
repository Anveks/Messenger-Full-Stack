class UserModel{
  public _id: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public profilePicture: string;
  public lastActive: string;
  public isOnline: boolean;
    _doc: any; // unknown stuff from mongo db
}

export default UserModel;