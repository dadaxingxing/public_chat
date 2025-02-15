import '../App.css';
import React from 'react';


const Message = ( { text, isSender}) => {
    return (
    <div className={`d-flex ${isSender ? "justify-content-end" : "justify-content-start"} my-1 mx-5`}>
        <div 
            className={`p-2 rounded message_box ${isSender ? "message_box_sender" : "message_box_receiver"}`}
        >
            {text}
        </div>
    </div>);
}


export default Message;