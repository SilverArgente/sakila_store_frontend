import React, { useState, useEffect } from 'react'
import '../css/navbar.css'

function App() {

  return (
    <div className='page'>

      <div className='navbar'>
        
        <p className='logo'>Sakila Store</p>
        <ul>
          <li><a>Home</a></li>
          <li><a>Films</a></li>
          <li><a>Customers</a></li>
        </ul>

      </div>

    </div>
  )
}

export default App