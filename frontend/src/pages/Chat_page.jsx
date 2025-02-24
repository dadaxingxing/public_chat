import '../App.css';
import InputField from '../components/inputField';
import Header from '../components/Header';
import Message from '../components/Message';
import { useState, useEffect } from 'react';

import axiosInstance from '../utilities/axiosConfig';


// remember to delete the below line, it's for debugging
// localStorage.clear();
// console.log(localStorage.getItem('userId'));

function Chat(){
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/history')
            .then(response => {
                const messages = response.data;

                messages.map((message) => {
                    setMessages(prevMessage => [...prevMessage, { text: message['message'], isSender: localStorage.getItem('userId') === message['userId']}])
                });
            })

    }, []);

    
    const handleInputChanges = (value) => {
        setInputValue(value);
    };

    const handleSubmitClick = async () => {
        if (inputValue.trim() !== ''){
            // setMessages([...messages, { text: inputValue, isSender: true  }]);
            try {
                const response = await axiosInstance.post('/api/chat', {
                    "Message": inputValue,

                });

                console.log('Message sent!');
            } catch (error) {
                console.log('Error sending message!')
            }           

            setInputValue('');
        }
    }; 
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
                    <div className='input_container mx-auto'>
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