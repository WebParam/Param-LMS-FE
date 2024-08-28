import { useEffect, useState } from "react";
import {
  locations,
  placementStatuses,
  jobRoles,
  dateRanges,
} from "./data";
import { any } from "zod";

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
    placementStatus: "",
    jobRole: "",
    dateRange: "",
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
        if (key === "placedAt") {
          filteredData = filteredData.filter(
            (applicant) => applicant[key] === value
          );
        } else if (key === "dateRange") {
          const dateRange = value;
          const currentDate = new Date();
          let startDate: any, endDate: any;
          switch (dateRange) {
            case "A Month Ago":
              startDate = new Date(currentDate); // Create a new date object
              startDate.setMonth(startDate.getMonth() - 1);
              break;
            case "3 Months Ago":
              startDate = new Date(currentDate); // Create a new date object
              startDate.setMonth(startDate.getMonth() - 3);
              break;
            case "6 Months Ago":
              startDate = new Date(currentDate); // Create a new date object
              startDate.setMonth(startDate.getMonth() - 6);
              break;
            case "A Year Ago":
              startDate = new Date(currentDate); // Create a new date object
              startDate.setFullYear(currentDate.getFullYear() - 1);
              break;
            default:
              startDate = new Date(0); // Unix Epoch Time
          }
          endDate = currentDate; // Keep endDate as currentDate
          filteredData = filteredData.filter(applicant => {
            const applicantStartDate = new Date(applicant.startDate);
            const applicantEndDate = new Date(applicant.endDate);
            return applicantStartDate >= startDate && applicantEndDate <= endDate;
          });
        } else {
          filteredData = filteredData.filter(
            (applicant) => applicant[key] === value
          );
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
      placedAt: "",
      placementStatus: "",
      jobRole: "",
      dateRange: "",
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
                style={{width:"400px"}}
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
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
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
              <select
                className="custom-select mb-2 mr-sm-2 mb-sm-0"
                onChange={(e) => handleFilterChange(e, "dateRange")}
                value={selectedFilters.dateRange}
              >
                <option value="">Select Date Range</option>
                {dateRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-success"
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
