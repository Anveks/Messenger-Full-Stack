import React, { useRef } from "react";
import "./SendBar.css";

function SendBar(props: any): JSX.Element {
    const inputRef = useRef(null);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        const message = inputRef.current?.value;
        console.log(message);
        // Perform any desired actions with the message value
    };

    return (
        <div className="SendBar">
            <form onSubmit={handleSend}>
                <input type="text" name="message" ref={inputRef} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default SendBar;
