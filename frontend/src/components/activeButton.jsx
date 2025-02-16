import '../App.css';
import React, {useState} from 'react';


const Active = () => {
    const [userCount, setUserCount] = useState(0);

    return (
        <div className='btn btn-light d-flex align-items-center gap-4'>
            <div className='greenStatus'/>
            <div className='statusText'>
                1000 currently online
            </div>
        </div>
    );
};

export default Active;