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
        <div className='container mt-5'>
            {/* Displays the message board */}
            <div className='row mb-3'>
                <div className='col-12'>
                    <div>
                        {messages.map((message, index) => (
                            <div 
                            key={index}
                            >{message}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-8'>
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