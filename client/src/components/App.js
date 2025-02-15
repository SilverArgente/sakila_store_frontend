import React, { useState, useEffect } from 'react'
import '../css/App.css'
import Navbar from './Navbar.js'
import Content from './Content.js'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/top_5_films").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  const list = ['ryan', 'eric', 'eric', 'eric', 'eric']

  return (
    <div className='App' >

      <Navbar> </Navbar>
      
      <Content title={'Films'} data={list} />

      <Content title={'Actors'} data={list} />

    </div>
  )
}

export default App