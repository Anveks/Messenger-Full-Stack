class MessageModel{
  public _id?: string;
  public sender: string;
  public recipient: string;
  public content: string;
  public timestamp: string;
  public isRead: boolean;
}

export default MessageModel;