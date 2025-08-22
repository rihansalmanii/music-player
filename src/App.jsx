import React, {useState, useRef} from 'react'
import './index.css'
import Card from './components/Card'

const App = () => {

  const [isplay, setisplay] = useState(false)

  return (
   <div className='bg-gradient-to-r from-[#0f0c29] to-[#302b63] w-full h-screen'>
    <Card isplay={isplay} setisplay={setisplay}/>
   </div>
  )
}

export default App
