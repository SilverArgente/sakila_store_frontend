import React, { useState, useEffect } from 'react'
import '../css/item.css'

function Item( { name } ) {

  return (

    <div className='item'>

        <p>{name}</p>

    </div>

  )
}

export default Item