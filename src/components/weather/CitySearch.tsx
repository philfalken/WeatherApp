import React, { useState } from "react";

export interface CitySearchProps {
  onSearch: (city: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText);
    setSearchText("");
  };

  return (
    <div style={{ backgroundColor: "#4B515D" }}>
      <div className="row justify-content-center">
        <div className="col-md-3">
          <h2 style={{ color: "white", padding: "20px" }}>Weather App</h2>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-3">
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Enter city name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="col-md-3">
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CitySearch;
