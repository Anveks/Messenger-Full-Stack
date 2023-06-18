import mongoose, { Schema } from 'mongoose';

export interface IUnreadMessage {
  sender: string; // note: before it was an ObjectId and typescript does not like it at all
  messageBody: string;
  timestamp: string;
}

const UnreadMessageSchema = new Schema<IUnreadMessage>({
  sender: { 
    type: String, 
    required: true 
  },
  messageBody: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: String, 
    required: true 
  }
});

export const UnreadMessageModel = mongoose.model<IUnreadMessage>("UnreadMessage", UnreadMessageSchema);
