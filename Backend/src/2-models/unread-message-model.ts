import mongoose, { Schema } from 'mongoose';

export interface IUnreadMessage {
  sender: string; // note: before it was an ObjectId and typescript does not like it at all
  content: string;
  timestamp: string;
}

export const UnreadMessageSchema = new Schema<IUnreadMessage>({
  sender: { 
    type: String // here i has to delete all the required: true fields per each property becuase it was blockign the data passing for no reason. should check it later.
  },
  content: { 
    type: String
  },
  timestamp: { 
    type: String
  }
});

export const UnreadMessageModel = mongoose.model<IUnreadMessage>("UnreadMessage", UnreadMessageSchema);

// TODO: check why required: true here throws validation errors even if all the properties are present.
