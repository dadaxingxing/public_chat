import {createBrowserRouter, RouterProvider, UNSAFE_getSingleFetchDataStrategy} from 'react-router-dom'
import './App.css'
import Home from './pages/Home_page'
import Chat from './pages/Chat_page'


function App(){
    const router = createBrowserRouter([
        {
            path: '/', 
            element: <Home/>,
        },
        {

            //todo:  find a way to only allow if indeed there is session
            path: '/chat',
            element: <Chat/>,
        }
    ])

    return (
        <RouterProvider router={router} />
    );
}

export default App;