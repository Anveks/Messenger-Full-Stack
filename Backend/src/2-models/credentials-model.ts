import mongoose from 'mongoose';

export interface ICredentialsModel extends mongoose.Document {
  email: string;
  password: string;
}

export const CredentialsSchema = new mongoose.Schema<ICredentialsModel>({
  email: {
    type: String,
    required: [true, 'Email is required.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  }
}, {
  versionKey: false
});

export const CredentialsModel = mongoose.model<ICredentialsModel>("CredentialsModel", CredentialsSchema, 'credentials');

