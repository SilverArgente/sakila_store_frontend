import React, { useState, useEffect } from 'react'
import '../css/content.css'
import Item from './Item.js'

function Content( { title, data, names }) {

  useEffect(() => {

          console.log(data)
  
    
  
    }, [])

    let a = 'a'



  return (

    <div className='content' >

        <h1>Trending Top 5: {title}</h1>
        
        <Item name={names?.[0]}></Item>
        <Item name={names?.[1]}></Item>
        <Item name={names?.[2]}></Item>
        <Item name={names?.[3]}></Item>
        <Item name={names?.[4]}></Item>

    </div>

  )
}

export default Content