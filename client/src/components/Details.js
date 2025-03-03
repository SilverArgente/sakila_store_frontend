import React, { useState } from 'react';
import '../css/Details.css';

function Details({ data, itemNum, attributes, actor_films }) {
    let attribute_headers = [];
    let displayFilms = true;
    let rent = false;
    const [customerId, setCustomerId] = useState(""); // State for customer ID
    const [message, setMessage] = useState(""); // State for response message
    const [loading, setLoading] = useState(false); // State for loading state

    // Loop through attributes and set headers
    for (let i in attributes) {
        switch (attributes[i]) {
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
    if (attributes[0] === 'title') {
        displayFilms = false;
    }

    // Check if available copies > 0, set rent to true
    if (data[itemNum]?.copies > 0) {
        rent = true;
    }

    // Function to fetch inventory ID by movie title
    const fetchInventoryId = async (movieTitle) => {
        try {
            const response = await fetch(`http://localhost:5000/get_inventory_id?title=${encodeURIComponent(movieTitle)}`);
            const result = await response.json();
            return result.inventory_id;
        } catch (error) {
            console.error("Error fetching inventory ID:", error);
            return null;
        }
    };

    // Handle rent movie action
    const handleRentMovie = async () => {
        if (!customerId.trim()) {
            setMessage("Please enter a valid customer ID.");
            return;
        }

        setLoading(true);
        const movieTitle = data[itemNum]?.title;
        let inventoryId = data[itemNum]?.inventory_id;

        // If inventory_id is not available, fetch it from the backend
        if (!inventoryId) {
            inventoryId = await fetchInventoryId(movieTitle);
        }

        if (!inventoryId) {
            setMessage("Error: Could not retrieve inventory ID.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/rent_movie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ customer_id: customerId, inventory_id: inventoryId }),
            });

            const result = await response.json();
            setMessage(result.message || "Something went wrong.");
        } catch (error) {
            setMessage("Error: Could not complete the request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='details'>
            {displayFilms ? (
                attributes.map((attr, i) => (
                    <p key={i}>{attribute_headers[i] + (data[itemNum]?.[attr] || "N/A")}</p>
                ))
            ) : (
                attributes.map((attr, i) => (
                    <p key={i}>
                        {i + 1 + ". " + (actor_films[i]?.[attr] || "N/A") + ", " + (actor_films[i]?.["rented"] || "N/A") + " rentals"}
                    </p>
                ))
            )}

            {/* Rent movie form, only shows if copies > 0 */}
            {rent && (
                <div className="rent-form">
                    <input
                        type="text"
                        placeholder="Enter Customer ID"
                        className="rental-input"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                    />
                    <button className="rent-button" onClick={handleRentMovie} disabled={loading}>
                        {loading ? "Renting..." : "Rent Movie"}
                    </button>
                    {message && <p className="rent-message">{message}</p>}
                </div>
            )}
        </div>
    );
}

export default Details;
