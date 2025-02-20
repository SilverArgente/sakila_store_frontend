import React, { useState } from "react";
import "../css/films.css";
import Item from "./Item.js";

function Films({ title }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("Film Name");
  const [data, setData] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const attributes = ['description', 'release_year', 'rating', 'special_features', 'copies']
  
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Mark as submitted to show loading or no results

    const searchData = new URLSearchParams({
      query: searchQuery,
      type: searchType,
    }).toString();

    try {
      const response = await fetch(`http://localhost:5000/film_search?${searchData}`, {
        method: "GET",
      });

      if (response.ok) {
        const d = await response.json();
        setData(d.results || []); // Ensure results is set
        console.log("Search Results:", d.results);
      } else {
        console.error("Failed to fetch search results");
        setData([]); // Clear data on failure
      }
    } catch (error) {
      console.error("Error:", error);
      setData([]); // Clear data on error
    }
  };

  const displayFilms = () => {
    if (data.length === 0) {
      return <p>No results available.</p>;
    }

    console.log(data); // This should show the array with film objects

    return (
      <div className="films-list">
      {data.map((film, index) => (
        <Item
          itemNum={index}
          name={film.title}          // Ensure the title is passed correctly
          attributes={attributes}
          data={data}
        />
      ))}
    
      </div>
    );
  };


  return (
    <div className="content">
      <div className="search" style={{ display: "inline-flex" }}>
        <h1>Search films: {title}</h1>
        <form className="example" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            name="search"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="submit">🔍</button>
        </form>
      </div>

      <div className="searchBy" style={{ display: "inline-flex" }}>
        <p>Search By</p>
        <select
          name="film_search"
          id="film_search"
          value={searchType}
          onChange={handleSelectChange}
        >
          <option value="Film Name">Film Name</option>
          <option value="Actor Name">Actor Name</option>
          <option value="Genre">Genre</option>
        </select>
      </div>

      <div className="displayFilms">
        {submitted ? displayFilms() : null}
      </div>
    </div>
  );
}

export default Films;
