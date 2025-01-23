import '../App.css';
import InputField from '../components/inputField';
import { useState } from 'react';

function Chat(){
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChanges = (value) => {
        setInputValue(value);
    };

    const handleSubmitClick = () => {
        if (inputValue.trim() !== ''){
            setMessages((prevMessages) => [...prevMessages, inputValue]);
            setInputValue('');
        }
    };
    return (
        <div>
            {/* Displays the input text button */}
            <InputField 
                inputValue={inputValue}
                onInputChange={handleInputChanges}
                onButtonClick={handleSubmitClick}
            />

            {/* Displays the message board */}
            <div>
                {messages.map((message, index) => (
                    <div 
                     key={index}
                    >{message}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Chat;