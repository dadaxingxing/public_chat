import { useState } from 'react'
import './App.css'
import Button from './components/button'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="text-center">
        <Button/>
      </div>
    </div>
  )
}

export default App
