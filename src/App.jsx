import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Items from './Components/Items'
import Order from './Components/Order'


const App = () => {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="items" element={<Items/>}/>
          <Route path="order" element={<Order/>}/>

        </Routes>
      </Router>

      
    </div>
  )
}

export default App