import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helpers";
import { PRODUCT_CATEGORIES, RATINGS } from "../../constans/constans";

function Filters() {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // เลือกได้ทีละหมวดหมู่
  const [selectedRating, setSelectedRating] = useState(""); // เลือกได้ทีละ rating

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Debugging: Log selectedCategory and selectedRating when they change
  useEffect(() => {
    console.log("Selected Category Updated:", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    console.log("Selected Rating Updated:", selectedRating);
  }, [selectedRating]);

  // Handle category selection (เลือกได้ทีละอัน)
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory((prev) => (prev === category ? "" : category)); // เลือกหรือยกเลิก
  };

  // Handle rating selection (เลือกได้ทีละอัน)
  const handleRatingChange = (e) => {
    const rating = e.target.value;
    setSelectedRating((prev) => (prev === rating ? "" : rating)); // เลือกหรือยกเลิก
  };

  // Handle price filter submission
  const handleButtonClick = (e) => {
    e.preventDefault();

    // Validate min and max prices
    if (min && max && parseInt(min) > parseInt(max)) {
      alert("Minimum price cannot be greater than maximum price.");
      return;
    }

    const updatedParams = new URLSearchParams(searchParams);

    // Update min and max prices in URL
    getPriceQueryParams(updatedParams, "min", min);
    getPriceQueryParams(updatedParams, "max", max);

    // Update category in URL
    if (selectedCategory) {
      updatedParams.set("category", selectedCategory);
    } else {
      updatedParams.delete("category");
    }

    // Update rating in URL
    if (selectedRating) {
      updatedParams.set("rating", selectedRating);
    } else {
      updatedParams.delete("rating");
    }

    // Navigate with updated search parameters
    navigate(`${window.location.pathname}?${updatedParams.toString()}`);
    console.log("Updated URL:", `${window.location.pathname}?${updatedParams.toString()}`); // Debugging
  };

  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form id="filter_form" className="px-2" onSubmit={handleButtonClick}>
        <div className="row">
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              min="0"
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Max ($)"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              min="0"
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              GO
            </button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>
      {PRODUCT_CATEGORIES?.map((category) => (
        <div className="form-check" key={category}>
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            value={category}
            checked={selectedCategory === category} // ตรวจสอบว่าเลือกอยู่หรือไม่
            onChange={handleCategoryChange}
          />
          <label className="form-check-label">{category}</label>
        </div>
      ))}
      <hr />
      <h5 className="mb-3">Ratings</h5>
      {RATINGS.map((rating) => (
        <div className="form-check" key={rating.value}>
          <input
            className="form-check-input"
            type="checkbox"
            value={rating.value}
            checked={selectedRating === rating.value} // ตรวจสอบว่าเลือกอยู่หรือไม่
            onChange={handleRatingChange}
          />
          <label className="form-check-label">{rating.label}</label>
        </div>
      ))}
    </div>
  );
}

export default Filters;