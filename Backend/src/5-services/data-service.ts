import { ValidationError } from "../2-models/client-errors";
import { IMessageModel, MessageModel } from "../2-models/message-model";
import { IUserModel, UserModel } from "../2-models/user-model";

async function getAllUsers(): Promise<IUserModel[]>{
  const users = await UserModel.find().exec();
  return users;
}

async function sendMessage(message: IMessageModel): Promise<IMessageModel> {
  const err = message.validateSync();
  if (err) throw new ValidationError(err.message);
  await message.save();
  return message;
}

async function getMessageHistory(userId1: string, userId2: string): Promise<IMessageModel[]> {
  const messages = await MessageModel.find({
    $or: [
      { sender: userId1, recipient: userId2 },
      { sender: userId2, recipient: userId1 }
    ]
  }).sort({ timestamp: 1 });

  return messages;
}

export default {
  getAllUsers,
  sendMessage,
  getMessageHistory
}