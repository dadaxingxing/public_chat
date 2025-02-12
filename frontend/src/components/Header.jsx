import '../App.css';
import React from 'react';


function Header() {
    return (
      <navbar className='navBar d-flex justify-content-between align-items-center px-5'>
        <div className='logo'>
          BlorpChat.gg
        </div>
        <div>
          <button className='btn-lg'></button>
          <button className='btn-lg'></button>
        </div>

      </navbar>  
    );
};


export default Header;