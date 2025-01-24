import '../App.css';
import React from 'react';

function InputField( { inputValue, onInputChange, onButtonClick} ) {
    return (
        <div className='outerContainer'>
            <input
            className='inputField'
            type="text"
            placeHolder='Send a message'
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {if (e.key === 'Enter') onButtonClick();} }
            value={inputValue} 
            />
            <button
            className='sendMessageButton'
            onClick={onButtonClick}>
                Send
            </button>
        </div>
    );
}



export default InputField;

