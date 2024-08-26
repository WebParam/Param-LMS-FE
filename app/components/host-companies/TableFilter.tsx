import { useEffect, useState } from "react";
import { industries, companyLocations, numberOfEmployeesRanges } from "./data";

export default function TableFilter({
  data,
  setFilteredData,
}: {
  data: any[];
  setFilteredData: (data: any) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    industry: "",
    companyLocation: "",
    numberOfEmployeesRange: "",
  });

  useEffect(() => {
    applyFilters();
  }, [data, selectedFilters, searchTerm]);

  const applyFilters = () => {
    let filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value) {
        if (key === "numberOfEmployeesRange") {
          filteredData = filteredData.filter((item) => {
            const numEmployees = item.numberOfEmployees;
            switch (value) {
              case "Less than 50":
                return numEmployees < 50;
              case "50-100":
                return numEmployees >= 50 && numEmployees <= 100;
              case "100-500":
                return numEmployees > 100 && numEmployees <= 500;
              case "500-1000":
                return numEmployees > 500 && numEmployees <= 1000;
              case "More than 1000":
                return numEmployees > 1000;
              default:
                return true;
            }
          });
        } else {
          filteredData = filteredData.filter((item) => item[key] === value);
        }
      }
    });

    setFilteredData(filteredData);
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

  const clearAllFilters = () => {
    setSelectedFilters({
      industry: "",
      companyLocation: "",
      numberOfEmployeesRange: "",
    });
    setSearchTerm("");
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
          <div
            className="d-flex flex-column align-items-start"
            style={{ gap: "10px" }}
          >
            <label className="mr-sm-2 form-label" htmlFor="inlineFormFilterBy">
              Filter by:
            </label>
            <div className="d-flex" style={{ gap: "2px" }}>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control search mb-2 mr-sm-2 mb-sm-0"
                id="inlineFormFilterBy"
                placeholder="Search ..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <select
                className="custom-select mb-2 mr-sm-2 mb-sm-0"
                onChange={(e) => handleFilterChange(e, "industry")}
                value={selectedFilters.industry}
              >
                <option value="">Select Industry</option>
                {industries.map((industry:any) => (
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
                {companyLocations.map((location:any) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <select
                className="custom-select mb-2 mr-sm-2 mb-sm-0"
                onChange={(e) => handleFilterChange(e, "numberOfEmployeesRange")}
                value={selectedFilters.numberOfEmployeesRange}
              >
                <option value="">Select Number of Employees Range</option>
                {numberOfEmployeesRanges.map((range:any) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <button className="btn btn-success" onClick={clearAllFilters}>
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
                  {key}: {value}{" "}
                  <span onClick={() => removeFilter(key)}>&times;</span>
                </span>
              )
          )}
        </div>
      </div>
    </div>
  );
}
