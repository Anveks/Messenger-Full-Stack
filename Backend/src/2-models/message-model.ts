import mongoose from 'mongoose';

export interface IMessageModel extends mongoose.Document {
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export const MessageSchema = new mongoose.Schema<IMessageModel>({
  sender: {
    type: String,
    required: [true, 'Sender is required.']
  },
  recipient: {
    type: String,
    required: [true, 'Recipient is required.']
  },
  content: {
    type: String,
    required: [true, 'Content is required.']
  },
  timestamp: {
    type: String,
    required: [true, 'Timestamp is required.']
  },
  isRead: {
    type: Boolean,
    reqired: [true, 'isRead is required.'],
    default: false,
  }
}, {
  versionKey: false
});

export const MessageModel = mongoose.model<IMessageModel>("MessageModel", MessageSchema, 'messages');
