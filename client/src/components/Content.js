import React, { useState, useEffect } from 'react'
import '../css/content.css'
import Item from './Item.js'

function Content( { title, data }) {

    const name_one = (data ?? [])[0]
    const name_two = (data ?? [])[1]
    const name_three = (data ?? [])[2]
    const name_four = (data ?? [])[3]
    const name_five = (data ?? [])[4]

  return (

    <div className='content'>

        <h1>Trending Top 5: {title}</h1>
        
        <Item name={name_one}></Item>
        <Item name={name_two}></Item>
        <Item name={name_three}></Item>
        <Item name={name_four}></Item>
        <Item name={name_five}></Item>

    </div>

  )
}

export default Content