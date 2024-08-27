"use client"
import React, { useState, useEffect } from 'react';
import { jobRoles, dateRanges, courseNames, placedAt } from "./data";

export default function TableFilter({
  data,
  setFilteredData,
}: {
  data: any[];
  setFilteredData: (data: any) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState({
    placedAt: "",
    jobRole: "",
    dateRange: "",
    courseName: "",
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
        if (key === "placedAt" || key === "jobRole" || key === "courseName") {
          filteredData = filteredData.filter((applicant) => applicant[key] === value);
        } else if (key === "dateRange") {
          const currentDate = new Date();
          let startDate: Date;

          switch (value) {
            case "A Month Ago":
              startDate = new Date(currentDate);
              startDate.setMonth(startDate.getMonth() - 1);
              break;
            case "3 Months Ago":
              startDate = new Date(currentDate);
              startDate.setMonth(startDate.getMonth() - 3);
              break;
            case "6 Months Ago":
              startDate = new Date(currentDate);
              startDate.setMonth(startDate.getMonth() - 6);
              break;
            case "A Year Ago":
              startDate = new Date(currentDate);
              startDate.setFullYear(startDate.getFullYear() - 1);
              break;
            default:
              startDate = new Date(0);
          }

          filteredData = filteredData.filter((applicant) => {
            const placedDate = new Date(applicant.placedDate);
            return placedDate >= startDate && placedDate <= currentDate;
          });
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
      jobRole: "",
      dateRange: "",
      courseName: "",
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
                onChange={(e) => handleFilterChange(e, "placedAt")}
                value={selectedFilters.placedAt}
              >
                <option value="">Select Company</option>
                {placedAt.map((location:any) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <select
                className="custom-select mb-2 mr-sm-2 mb-sm-0"
                onChange={(e) => handleFilterChange(e, "jobRole")}
                value={selectedFilters.jobRole}
              >
                <option value="">Select Job Role</option>
                {jobRoles.map((role:any) => (
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
                {dateRanges.map((range:any) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <select
                className="custom-select mb-2 mr-sm-2 mb-sm-0"
                onChange={(e) => handleFilterChange(e, "courseName")}
                value={selectedFilters.courseName}
              >
                <option value="">Select Course Name</option>
                {courseNames.map((course:any) => (
                  <option key={course} value={course}>
                    {course}
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
                  {key}: {value} <span onClick={() => removeFilter(key)}>&times;</span>
                </span>
              )
          )}
        </div>
      </div>
    </div>
  );
}