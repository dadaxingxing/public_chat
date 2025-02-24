import '../App.css'
import Button from '../components/button'
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';


function Home() {
  
  const navigate = useNavigate();
  
  const handleLogin = async (token) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {headers : {Authorization: `Bearer ${token}`}})
      .then( response => localStorage.setItem('userId', response.data.email))
      .catch( error => {console.log('Error fetching userId', error)});

    localStorage.setItem('Token', token);

    navigate('/chat');
  
  }
  
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="middle_container d-flex align-items-center flex-column">
        <div className='top'>[one big group chat]</div>
        <div className='middle'>CHAT</div>

        <div className='lower_container d-flex align-items-center flex-direction-horizontal'>
          <div className='lower'>USING</div>

          <GoogleOAuthProvider clientId='986679823190-04srmlcmfsbguvp8egnqv0lcg486ubna.apps.googleusercontent.com'>
            <Button onSuccess={handleLogin}/>
          </GoogleOAuthProvider>

          <div className='lower'><u className='lower_underline'>BLORP</u></div>

        </div>

      </div>
    </div>

  )
}

export default Home;
