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
        <div className=' d-flex align-items-horizontal'>
          <Active/>
          <Referral/>
        </div>

      </navbar>  
    );
};


export default Header;