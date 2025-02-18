import '../App.css'
import Button from '../components/button'
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


const sendTokenToBackend = async (token) => {
  const res = await fetch('http://localhost:5173/api/auth', {
    
    method: 'POST',
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({ token}),
  });

  const data = await res.json();
  // console.log('Session Token', data.session_token);
  // console.log('Token received, about to be sent!', token);
}


function Home() {
  const navigate = useNavigate();



  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <GoogleOAuthProvider clientId='986679823190-04srmlcmfsbguvp8egnqv0lcg486ubna.apps.googleusercontent.com'>
          <Button className='start_button' onSuccess={sendTokenToBackend}/>
        </GoogleOAuthProvider>


      </div>
    </div>

  )
}

export default Home;
