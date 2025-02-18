import React, { useState, useEffect } from 'react'
import '../css/content.css'
import Item from './Item.js'

function Customers( { title, data, names, actor_films }) {

  let attributes = []

  if (title === 'Films') {
    attributes = ['description', 'release_year', 'rating', 'special_features', 'rented']
  }
  else if (title === 'Actors') {
    attributes = ['title', 'title', 'title', 'title', 'title']
  }

  return (

    <div className='content' >

        <h1>Customers: {title}</h1>

    </div>

  )
}

export default Customers