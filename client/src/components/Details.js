import React, { useEffect, useState } from 'react';
import '../css/Details.css';

function Details( { data, itemNum, attributes, actor_films } ) {

    let attribute_headers = [];
    let displayFilms = true
    let rent = false;

    // Loop through attributes and set headers
    for (let i in attributes) {
        switch(attributes[i]) {
            case "description":
              attribute_headers[i] = "Description: ";
              break;
            case "release_year":
                attribute_headers[i] = "Release Year: ";
                break;
            case "rating":
              attribute_headers[i] = "Rating: ";
              break;
            case "special_features":
              attribute_headers[i] = "Special Features: ";
              break;
            case "rented":
              attribute_headers[i] = "Rental Count: ";
              break;
            case "title":
              attribute_headers[i] = "";
              break;
            case "copies":
              attribute_headers[i] = "Available Copies: ";
              break;
            default:
              attribute_headers[i] = "Header";
          }
    }

    // Determine if we are displaying Films or Actors information
    let i = 0
    if (attributes[0] === 'title') {
        displayFilms = false;
    }

    // Check if available copies > 0, set rent to true
    if (data[itemNum]?.copies > 0) {
        rent = true;
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

            {/* Conditionally show rent form if available copies > 0 */}
            {rent && (
                <div className="rent-form">
                    <input
                        type="text"
                        placeholder="Enter Customer ID"
                        className="rental-input"
                    />
                    <button className="rent-button">
                        Rent Movie
                    </button>
                </div>
            )}
        </div>
    );
}

export default Details;
