import { Outlet, Navigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from "axios";


const SecureRoute = ( { reverse = false} ) => {
    const [isValid, setIsValid] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return setIsValid(false);
        
        axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
            .then(() => setIsValid(true))
            .catch(() => setIsValid(false))
    }, [token]);
    
    if (isValid === null){
        return <div className="spinner-grow text-primary" role="status"/>
    };

    if (!reverse){
        return  isValid ? <Outlet/> : <Navigate to='/'/>;
    } else {
        return isValid ? <Navigate to='/chat'/> : <Outlet/>;
    }

};


export default SecureRoute;