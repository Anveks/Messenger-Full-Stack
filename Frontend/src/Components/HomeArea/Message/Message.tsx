import MessageModel from "../../../Models/MessageModel";
import { authStore } from "../../../Redux/AuthState";
import "./Message.css";

function Message(props: any): JSX.Element {
    const { sender, recepient, content, timestamp } = props.message;
    console.log(sender);

    function getTime(date: string) {
        const time = new Date(date);
        return time.getHours() + ":" + time.getMinutes();
    }

    return (
        <div className="message-container">
            <div className={sender === authStore.getState().user._doc._id ? "message message-me" : "message message-other"}>
                <p>{content}</p>
                <div className="time">{getTime(timestamp)}</div>
            </div>
        </div>

    );
}

export default Message;
