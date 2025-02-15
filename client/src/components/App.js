import React, { useState, useEffect } from 'react'
import '../css/App.css'
import Navbar from './Navbar.js'
import Content from './Content.js'

function App() {

  const [data, setData] = useState([{}])

  const [films, setFilms] = useState([])
  const [actors, setActors] = useState([])
  const [actorFilms, setActorFilms] = useState([])

  const [filmNames, setFilmNames] = useState([])
  const [actorNames, setActorNames] = useState([])
  

  useEffect(() => {
    fetch("/top_5").then(
      res => res.json()
    ).then(
      data => {
        setData(data)

        setFilms(data["top_films"])
        setActors(data["top_actors"])

        setFilmNames([ data["top_films"][0]["title"], data["top_films"][1]["title"], data["top_films"][2]["title"], data["top_films"][3]["title"], data["top_films"][4]["title"] ])
        
        setActorNames([ data["top_actors"][0]["first_name"] + " " + data["top_actors"][0]["last_name"],
                       data["top_actors"][1]["first_name"] + " " + data["top_actors"][1]["last_name"], 
                       data["top_actors"][2]["first_name"] + " " + data["top_actors"][2]["last_name"], 
                       data["top_actors"][3]["first_name"] + " " + data["top_actors"][3]["last_name"], 
                       data["top_actors"][4]["first_name"] + " " + data["top_actors"][4]["last_name"] ])

        setActorFilms([ data["top_actor_films"][0], data["top_actor_films"][1], data["top_actor_films"][2], data["top_actor_films"][3], data["top_actor_films"][4] ])

        console.log(data)

      }
    )

  }, [])

  

  return (
    <div className='App' >

      <Navbar> </Navbar>
      
      <Content title={'Films'} data={films} names={filmNames}  />

      <Content title={'Actors'} data={actors} actor_films={actorFilms} names={actorNames} />

    </div>
  )
}

export default App