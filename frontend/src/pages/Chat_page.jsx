import '../App.css';
import InputField from '../components/inputField';
import Header from '../components/Header';
import Message from '../components/Message';
import { useState, useEffect, useRef } from 'react';

import axiosInstance from '../utilities/axiosConfig';


// remember to delete the below line, it's for debugging
// localStorage.clear();
// console.log(localStorage.getItem('userId'));

function Chat(){
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const messageBox = useRef(null);
    
    // handle getting past message history
    useEffect(() => {
        axiosInstance.get('/api/history')
            .then(response => {
                setMessages(response.data.map(message => ({
                    text: message['message'],
                    isSender: localStorage.getItem('userId') === message['userId']
                })));
            })
            .catch(error => console.error("Error fetching messages:", error));
    }, []);

    // handle userInput
    const handleInputChanges = (value) => {
        setInputValue(value);
    };


    // handle submitting a message
    const handleSubmitClick = async () => {
        if (inputValue.trim() !== ''){
            try {
                const response = await axiosInstance.post('/api/chat', {
                    "Message": inputValue,

                });

            } catch (error) {
                console.log('Error sending message!')
            }           

            setInputValue('');
        }
    }; 

    // handle scrolling to the bottom
    const scrollToBottom = () => {
        if (messageBox.current) {
            requestAnimationFrame( () => {
                messageBox.current.scrollTop = messageBox.current.scrollHeight;
            });
        }

    };

    // update message box everytime messages is appended
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='header_container col-12'>
                    <Header/>
                </div>
            </div>

            {/* Displays the message board */}
            <div className='row'>
                <div className='col-12 '>
                    <div className='input_container mx-auto' ref={messageBox}>
                        {messages.map((message, index) => (
                            <Message
                                text={message.text}
                                isSender={message.isSender}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className='row justify-content-center'>
                <div className='col-4 '>
                    {/* Displays the input text button */}
                    <InputField 
                        inputValue={inputValue}
                        onInputChange={handleInputChanges}
                        onButtonClick={handleSubmitClick}
                    />
                </div>
            </div>
        </div>
    );
}


export default Chat;