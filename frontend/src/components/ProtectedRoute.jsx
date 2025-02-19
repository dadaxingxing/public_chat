import { Outlet, Navigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from "axios";


const SecureRoute = () => {
    const [isValid, setIsValid] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return setIsValid(false);
        
        axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
            .then(() => setIsValid(true))
            .catch(() => setIsValid(false))
    }, [token]);
    
    return isValid === null ? <div className="spinner-grow text-primary" role="status"></div>
    : isValid ? <Outlet/> : <Navigate to='/'/>;

};


export default SecureRoute;