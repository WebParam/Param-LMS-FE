import { useEffect, useState } from "react";
import {
  provinces,
  industries,
  companyLocations,
  companies,
  placementStatuses,
  jobRoles,
} from "./data";

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
    company: "",
    placementStatus: "",
    jobRole: "",
  });

  useEffect(() => {
    applyFilters();
  }, [data, selectedFilters, searchTerm]);

  const applyFilters = () => {
    let filteredData = data.filter((applicant) =>
      Object.values(applicant).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value) {
        filteredData = filteredData.filter(
          (applicant) => applicant[key] === value
        );
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
      placedAt: "",
      industry: "",
      companyLocation: "",
      company: "",
      placementStatus: "",
      jobRole: "",
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
          <div className="d-flex flex-column align-items-start" style={{ gap: "10px" }}>
            <label className="mr-sm-2 form-label" htmlFor="inlineFormFilterBy">
              Filter by:
            </label>
            <div className="d-flex" style={{ gap: "2px" }}>
              <input
    
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
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              <select
                className="custom-select mb-2 mr-sm-2 mb-sm-0"
                onChange={(e) => handleFilterChange(e, "companyLocation")}
                value={selectedFilters.companyLocation}
              >
                <option value="">Select Company Location</option>
                {companyLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <select
                className="custom-select mb-2 mr-sm-2 mb-sm-0"
                onChange={(e) => handleFilterChange(e, "company")}
                value={selectedFilters.company}
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
              <select
                className="custom-select mb-2 mr-sm-2 mb-sm-0"
                onChange={(e) => handleFilterChange(e, "placementStatus")}
                value={selectedFilters.placementStatus}
              >
                <option value="">Select Status</option>
                {placementStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <select
                className="custom-select mb-2 mr-sm-2 mb-sm-0"
                onChange={(e) => handleFilterChange(e, "jobRole")}
                value={selectedFilters.jobRole}
              >
                <option value="">Select Job Role</option>
                {jobRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-danger"
                onClick={clearAllFilters}
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
                  {key}: {value} <span onClick={() => removeFilter(key)}>&times;</span>
                </span>
              )
          )}
        </div>
      </div>
    </div>
  );
}
