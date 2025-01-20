import '../App.css'
import Button from '../components/button'
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/chat');
  };


  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <Button onClick={handleNavigation}/>
      </div>
    </div>

  )
}

export default Home;
