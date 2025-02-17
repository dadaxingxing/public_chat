import '../App.css';
import Active from './activeButton.jsx';
import Referral from './referralButton.jsx';
import React from 'react';

function Header() {
    return (
      <navbar className='navBar d-flex justify-content-between align-items-center px-5'>
        <div className='logo'>
          BlorpChat.gg
        </div>
        <div className='header_buttons_container d-flex align-items-center'>
          <Active/>
          <Referral/>
        </div>

      </navbar>  
    );
};


export default Header;