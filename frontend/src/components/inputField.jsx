import '../App.css';
import React from 'react';

function InputField( { inputValue, onInputChange, onButtonClick} ) {
    return (
        <div className='position-relative sendMessageContainer'>
            <input
            className='inputField'
            type="text"
            placeholder='Send a message'
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {if (e.key === 'Enter') onButtonClick();} }
            value={inputValue} 
            />
            <button
            className='sendMessageButton position-absolute'
            onClick={onButtonClick}>
                <img src='arrow.svg' alt='icon' className='icon'/>
            </button>
        </div>
    );
}



export default InputField;

