import '../App.css'
import Button from '../components/button'
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


function Home() {
  
  const navigate = useNavigate();
  
  const handleLogin = async (token) => {
    localStorage.setItem('token', token);
    navigate('/chat');
  
  }
  
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <GoogleOAuthProvider clientId='986679823190-04srmlcmfsbguvp8egnqv0lcg486ubna.apps.googleusercontent.com'>
          <Button className='start_button' onSuccess={handleLogin}/>
        </GoogleOAuthProvider>


      </div>
    </div>

  )
}

export default Home;
