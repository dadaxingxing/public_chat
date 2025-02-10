import '../App.css';
import InputField from '../components/inputField';
import Header from '../components/Header';
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
                            <div 
                            key={index}
                            >{message}
                            </div>
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