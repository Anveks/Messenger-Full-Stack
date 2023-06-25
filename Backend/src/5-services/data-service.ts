import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";
import { IMessageModel, MessageModel } from "../2-models/message-model";
import { IUnreadMessage, UnreadMessageModel } from "../2-models/unread-message-model";
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
  // find user:
  const user = await UserModel.findById(userId);
  if (!user) throw new ResourceNotFoundError(userId);
  // get his unread messages:
  const unreadMessages = user.unreadMessages;
  // filter the relevant messages:
  const updatedUnreadMessages = unreadMessages.filter((m) => { m.sender !== senderId });
  // override the unread messages:
  user.unreadMessages = updatedUnreadMessages;
  user.save();
}

async function saveMessage(message: IMessageModel): Promise<IMessageModel> {
  const { sender, recipient, content, timestamp } = message;

  // Saving a new message
  const err = message.validateSync();
  if (err) throw new ValidationError(err.message);
  await message.save();  

  // Saving an unreadMessage
  const newUnreadMessage = {
    sender: sender,
    content: content,
    timestamp: timestamp
  };
  const user = await UserModel.findById(recipient);
  if (!user) throw new Error('Recipient user not found.');
  user.unreadMessages.push(newUnreadMessage);
  await user.save();

  return message;
}

async function getUnreadMessages(userId: string): Promise<IUnreadMessage[]> {
  const user = await UserModel.findById(userId).populate('unreadMessages').exec();
  if (!user) throw new ResourceNotFoundError(userId);
  return user.unreadMessages;
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
  addUnreadMessage,
  getUnreadMessages,
  clearUnreadMessages
}