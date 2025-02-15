import React, { useState, useEffect } from 'react'
import '../css/Item.css'
import Details from './Details.js'

function Item( { name, data, attributes, itemNum, actor_films } ) {

  const [detailState, setDetailState] = useState(false)
  const [infoSet, setInfoSet] = useState('')

  function changeDetailState() {
    setDetailState(!detailState)
  }

  function assignInfoSet(set) {
    setInfoSet(set)
  }

  const displayDetails = () => {
    changeDetailState()
  }

  return (

    <div className='item'>

        <button onClick={displayDetails}>{name}</button>
        {detailState ? <Details data={data} itemNum={itemNum} attributes={attributes} actor_films={actor_films}/> : null}
    </div>

  )
}

export default Item