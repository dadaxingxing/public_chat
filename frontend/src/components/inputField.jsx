import '../App.css';
import React from 'react';

function InputField( { inputValue, onInputChange, onButtonClick} ) {
    return (
        <div>
            <input
            type="text"
            placeHolder='Send a message'
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {if (e.key === 'Enter') onButtonClick();} }
            value={inputValue} 
            />
            <button
            onClick={onButtonClick}>
                Send
            </button>
        </div>
    );
}



export default InputField;

