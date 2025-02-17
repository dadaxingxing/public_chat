import '../App.css';
import React, {useState, useAffect} from 'react';


const Active = () => {
    const [userCount, setUserCount] = useState(0);

    return (
        <div className='status_container btn btn-light'>
            <div className='greenStatus'/>
            <div className='statusText'>
                1000 users online
            </div>
        </div>
    );
};

export default Active;