import React, { useState, useEffect } from 'react'
import '../css/navbar.css'

function Navbar( {setPageState} ) {
  
  return (
    <div className='page'>

      <div className='navbar'>
        
        <p className='logo'>Sakila Store</p>
        <ul>
          <li><a onClick={(e) => setPageState("home")} >Home</a></li>
          <li><a onClick={(e) => setPageState("films")} >Films</a></li>
          <li><a onClick={(e) => setPageState("customers")} >Customers</a></li>
        </ul>

      </div>

    </div>
  )
}

export default Navbar