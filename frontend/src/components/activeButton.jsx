import '../App.css';
import React, {useState, useAffect} from 'react';
    import Popup from 'reactjs-popup';


const Active = () => {

    return (
        <Popup trigger={     
            <div className='status_container btn btn-light'>
                <div className='greenStatus'/>
                <div className='statusText'>
                    Message Developer
                </div>
            </div>
          } modal nested overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          {
            close => (
                <div className='popup_container d-flex flex-column'>
                    <div>Report any bugs or feature requests!</div>
                    <input></input>
                    <div className='justify-content-center'>
                        <button onClick=
                            {() => close()}>
                                submit
                        </button>
                    </div>
                </div>
            )
          }

        </Popup>
    );
};

export default Active;