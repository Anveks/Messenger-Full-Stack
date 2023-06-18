import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";
import { IMessageModel, MessageModel } from "../2-models/message-model";
import { IUnreadMessage } from "../2-models/unread-message-model";
import { IUserModel, UserModel } from "../2-models/user-model";

async function getAllUsers(): Promise<IUserModel[]>{
  const users = await UserModel.find().exec();
  return users;
}

async function updateUserOnlineStatus(userId: string, isOnline: boolean) {
  const user = await UserModel.findOne({ _id: userId });
  if (user) {
      user.isOnline = isOnline;
      await user.save();
  }
}

async function addUnreadMessage(userId: string, message: IUnreadMessage): Promise<void> {
  await UserModel.updateOne(
    { _id: userId },
    { $push: { unreadMessages: message } }
  );
}

async function clearUnreadMessages(userId: string, senderId: string): Promise<void>{
  // find user
  // get his unread messages
  // delete all the unread messages with certain senderId
}

async function saveMessage(message: IMessageModel): Promise<IMessageModel> {
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
  saveMessage,
  getMessageHistory,
  updateUserOnlineStatus,
  addUnreadMessage
}