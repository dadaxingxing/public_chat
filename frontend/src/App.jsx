import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home_page'
import Chat from './pages/Chat_page'
import Admin from './pages/admin_page'
import SecureRoute from './components/ProtectedRoute'


function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<SecureRoute reverse/>}>
                    <Route element={<Home/>} path='/'></Route>
                </Route>

                <Route element={<SecureRoute/>}>
                    <Route element={<Chat/>} path='/chat'></Route>
                </Route>

                <Route element={<Admin/>} path='/secret/admin'></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;