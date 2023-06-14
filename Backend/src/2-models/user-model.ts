import mongoose from 'mongoose';

export interface IUserModel extends mongoose.Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  lastActive: string;
  isOnline: boolean;
}

export const UserSchema = new mongoose.Schema<IUserModel>({
  username:{
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Username is required.'],
    minlength: [2, "Username too short."],
    maxlength: [100, "Username too long."]
  },
  firstName:{
    type: String,
    trim: true,
    required: [true, "First name is required."],
    minlength: [2, "First name too short."],
    maxlength: [100, "First name too long."]
  },
  lastName:{
    type: String,
    trim: true,
    required: [true, "Last name is required."],
    minlength: [2, "Last name too short."],
    maxlength: [100, "Last name too long."]
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Email is required.'],
    minlength: [2, "Email too short."],
    maxlength: [100, "Email too long."]
  },
  password:{
    type: String,
    trim: true,
    required: [true, 'Password is required.'],
    minlength: [2, "Password too short."],
    maxlength: [2000, "Password too long."]
  },
  lastActive: {
    type: String,
  },
  isOnline: {
    type: Boolean
  }
}, {
  versionKey: false
});

export const UserModel = mongoose.model<IUserModel>("UserModel", UserSchema, 'users');
// model name - schema - collection name 
