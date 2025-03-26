import '../App.css';
import React from 'react';


const Message = ( { text, isSender, user}) => {

    const name = user.split('@')[0];

    return (
    <div className={`d-flex ${isSender ? "justify-content-end" : "justify-content-start"} my-1 mx-0 mx-md-5`}>
        <div className={`w-100 ${isSender ? "message_box_sender_name" : "message_box_receiver_name"}`}>

            <div className='message_box_username'>{name}</div>
            <div 
                className={`p-2 message_box ${isSender ? "message_box_sender" : "message_box_receiver"}`}
            >
                {text}
            </div>
        </div>
    </div>);
}


export default Message;