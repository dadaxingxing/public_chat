import '../App.css';
import React, {useState, useAffect} from 'react';
import Popup from 'reactjs-popup';
import axiosInstance from '../utilities/axiosConfig';

const Active = () => {
    const [message, setMessage] = useState('');

    const handleBugSubmit = async () => {
        if (message.trim() !== ''){
            try {
                await axiosInstance.post('api/admin', {"Message": message});
            } catch (error) {
                console.log('Error sending bug report:', error);
            } finally {
                setMessage('');
            }
        }
    };

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
                <div className='popup_container d-flex flex-column align-items-center'>
                    <div className='popup_header'>Report any bugs or feature requests!</div>
                    <textarea 
                        onChange={(e) => setMessage(e.target.value)} 
                        className='popup_input'></textarea>
                    <div className='text-center pt-1'>
                        <button 
                            className='popup_submit'                     
                            onClick= {() => {
                                    handleBugSubmit();
                                    close();
                                }}>
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