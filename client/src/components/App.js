import React, { useState, useEffect } from 'react'
import Navbar from './Navbar.js'
import Content from './Content.js'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div className='page'>

      <Navbar> </Navbar>

      <div className='content'>

      </div>

    </div>
  )
}

export default App