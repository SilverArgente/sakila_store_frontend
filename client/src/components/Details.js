import React, { act, useEffect, useState } from 'react';
import '../css/Details.css';

function Details( { data, itemNum, attributes, actor_films } ) {

    let attribute_headers = [];
    let displayFilms = true

    for (let i in attributes) {
        switch(attributes[i]) {
            case "description":
              attribute_headers[i] = "Description: "
              break;
            case "release_year":
                attribute_headers[i] = "Release Year: "
                break;
            case "rating":
              attribute_headers[i] = "Rating: "
              break;
            case "special_features":
              attribute_headers[i] = "Special Features: "
              break;
            case "rented":
              attribute_headers[i] = "Rental Count: "
              break;
            case "title":
              attribute_headers[i] = ""
              break;
            default:
              attribute_headers[i] = "Header"
          }
    }

    // Determine if we are displaying Films or Actors information
    let i = 0
    if (attributes[0] === 'title')
    {
        displayFilms = false
    }

    return (

        <div className='details'>

           {
                (displayFilms ? 
                    attributes.map((attr, i) => (
                        <p key={i}>{attribute_headers[i] + (data[itemNum]?.[attr] || "N/A")}</p>
                    ))
                    :
                    attributes.map((attr, i) => (
                        <p key={i}>{i+1 + ". " + (actor_films[i]?.[attr] || "N/A") + ", " + (actor_films[i++]?.["rented"] || "N/A") + " rentals"}</p>
                    ))
            
                )
            }
            
        </div>
    );
}

export default Details