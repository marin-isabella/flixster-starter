import React from "react";
import { useState } from "react";


const SearchForm = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchQuery !== "") {
            onSearch(searchQuery);
        }
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button className="search-button">Search</button>
            <button className="clear-button">Clear</button>
        </form>
    );
}

export default SearchForm;
