import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin  } from '@react-oauth/google';
import '../App.css';

const Button = ({ onSuccess }) => {

    const login = useGoogleLogin({
        onSuccess: (response) => {
            onSuccess(response.access_token);
        },
        onError: () => console.log('Google Auth Failed!'),
    });

    return (
        <button className='start_button' onClick={login}>start</button>
    );
}


export default Button;