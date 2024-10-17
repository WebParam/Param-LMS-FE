import { useEffect, useState } from "react";
import { provinces, industries, companyLocations } from "./data";

export default function TableFilter({
  data,
  setFilteredData,
}: {
  data: any[];
  setFilteredData: (data: any) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedFilters, setSelectedFilters] = useState({
    placedAt: "",
    industry: "",
    companyLocation: "",
  });

  useEffect(() => {
    applyFilters();
  }, [data, selectedFilters, searchTerm]);

  const applyFilters = () => {
    let newFilteredData = data.filter((applicant: any) =>
      Object.values(applicant).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value !== "") {
        newFilteredData = newFilteredData.filter(
          (applicant: any) => applicant[key] === value
        );
      }
    });

    setFilteredData(newFilteredData);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    filterKey: string
  ) => {
    const value = e.target.value;
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const removeFilter = (filterKey: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: "",
    }));
  };

  return (
    <div className="mb-0">
      <div className="card-header h-100">
        <div className="form-inline">
          <div className="d-flex flex-column align-items-start" style={{ gap: "10px" }}>
            <label className="mr-sm-2 form-label" htmlFor="inlineFormFilterBy">
              Filter by:
            </label>
            <div className="d-flex" style={{ gap: "2px" }}>
              <input
                style={{ width: "400px" }}
                type="text"
                className="form-control search mb-2 mr-sm-2 mb-sm-0"
                id="inlineFormFilterBy"
                placeholder="Search ..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <select
                className="custom-select mb-2 mr-sm-2 mb-sm-0"
                onChange={(e) => handleFilterChange(e, "placedAt")}
                value={selectedFilters.placedAt}
              >
                <option value="">Select Province</option>
                {provinces.map((province: string) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              <select
                className="custom-select mb-2 mr-sm-2 mb-sm-0"
                onChange={(e) => handleFilterChange(e, "industry")}
                value={selectedFilters.industry}
              >
                <option value="">Select Industry</option>
                {industries.map((industry: string) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              <select
                className="custom-select mb-2 mr-sm-2 mb-sm-0"
                onChange={(e) => handleFilterChange(e, "companyLocation")}
                value={selectedFilters.companyLocation}
              >
                <option value="">Select Company Location</option>
                {companyLocations.map((location: string) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-success"
                onClick={() =>
                  setSelectedFilters({
                    placedAt: "",
                    industry: "",
                    companyLocation: "",
                  })
                }
              >
                <i className="material-icons" style={{ fontSize: "15px" }}>
                  delete
                </i>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-1">
          {Object.entries(selectedFilters).map(
            ([key, value]) =>
              value && (
                <span key={key} className="badge badge-primary mr-2">
                  {key}: {value} <div onClick={() => removeFilter(key)}>&times;</div>
                </span>
              )
          )}
        </div>
      </div>
    </div>
  );
}
