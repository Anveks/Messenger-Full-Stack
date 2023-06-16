import React, { useRef } from "react";
import "./SendBar.css";
import SendIcon from '@mui/icons-material/Send';

function SendBar(props: any): JSX.Element {
    const inputRef = useRef(null);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        const message = inputRef.current?.value;
        props.getMessage(message);
        inputRef.current.value = "";
    };

    return (
        <div className="SendBar">
            <form onSubmit={handleSend}>
                <input type="text" name="message" ref={inputRef} />
                <button type="submit">Send <SendIcon /></button>
            </form>
        </div>
    );
}

export default SendBar;
