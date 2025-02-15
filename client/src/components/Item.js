import React, { useState, useEffect } from 'react'
import '../css/Item.css'
import Details from './Details.js'

function Item( { name } ) {

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
        {detailState ? <Details /> : null}
    </div>

  )
}

export default Item