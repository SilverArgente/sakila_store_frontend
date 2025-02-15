import React, { useState, useEffect } from 'react'
import '../css/content.css'
import Item from './Item.js'

function Content( { title, data, names, actor_films }) {

  let attributes = []

  if (title === 'Films') {
    attributes = ['description', 'release_year', 'rating', 'special_features', 'rented']
  }
  else if (title === 'Actors') {
    attributes = ['title', 'title', 'title', 'title', 'title']
  }

  return (

    <div className='content' >

        <h1>Trending Top 5: {title}</h1>
        
        <Item name={names?.[0]} data={data} itemNum={0} attributes={attributes} actor_films={actor_films?.[0]} />
        <Item name={names?.[1]} data={data} itemNum={1} attributes={attributes} actor_films={actor_films?.[1]} />
        <Item name={names?.[2]} data={data} itemNum={2} attributes={attributes} actor_films={actor_films?.[2]} />
        <Item name={names?.[3]} data={data} itemNum={3} attributes={attributes} actor_films={actor_films?.[3]} />
        <Item name={names?.[4]} data={data} itemNum={4} attributes={attributes} actor_films={actor_films?.[4]} />

    </div>

  )
}

export default Content