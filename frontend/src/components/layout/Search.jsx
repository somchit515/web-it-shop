import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        // Navigate with keyword as a query parameter
        if (keyword.trim()) {
            navigate(`/?keyword=${encodeURIComponent(keyword)}`);
        } else {
            navigate(`/`);
        }
    }

    return (
        <div className="mb-3">
            <form onSubmit={submitHandler}>
                <div className="input-group">
                    <input
                        type="text"
                        id="search_field"
                        aria-describedby="search_btn"
                        className="form-control"
                        placeholder="Enter Product Name ..."
                        name="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        aria-label="Search for products"
                    />
                    <button 
                        id="search_btn" 
                        className="btn btn-outline-secondary" 
                        type="submit"
                        aria-label="Search"
                    >
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Search;
