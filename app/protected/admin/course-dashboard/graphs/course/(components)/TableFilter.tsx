import { useEffect, useState } from "react";
import { provinces, industries, companyLocations } from "./data"; // Import the data from the correct location

const statuses = [
  { value: 0, label: "Enrolled" },
  { value: 1, label: "Rejected" },
  { value: 2, label: "Completed" },
  { value: 3, label: "Review Pending" },
];

export default function TableFilter({
  data,
  setFilteredData,
}: {
  data: any[];
  setFilteredData: (data: any) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedFilters, setSelectedFilters] = useState({
    provinces:"",
    industries:"",
    companyLocations:"",
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
        newFilteredData = newFilteredData.filter((applicant: any) =>
          key === "status"
            ? applicant[key] === Number(value)
            : applicant[key] === value
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
    const newFilters = {
      ...selectedFilters,
      [filterKey]:
        filterKey === "status" ? (value === "" ? "" : Number(value)) : value,
    };

    setSelectedFilters(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const removeFilter = (filterKey: string) => {
    const newFilters = {
      ...selectedFilters,
      [filterKey]: "",
    };

    setSelectedFilters(newFilters);
  };

  return (
    <>
      <div className=" mb-0">
        <div className="card-header h-100">
          <div className="form-inline">
            <div
              className="d-flex flex-column align-items-start"
              style={{ gap: "10px" }}
            >
              <div>
                <label
                  className="mr-sm-2 form-label"
                  htmlFor="inlineFormFilterBy"
                >
                  Filter by:
                </label>
              </div>
              <div className="d-flex " style={{ gap: "2px" }}>
                <input
                  style={{ width: "400px" }}
                  type="text"
                  className="form-control search mb-2 mr-sm-2 mb-sm-0"
                  id="inlineFormFilterBy"
                  placeholder="Search ..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <label className="sr-only" htmlFor="inlineFormRole">
                  Role
                </label>
                <select
                  id="inlineFormRole"
                  className="custom-select mb-2 mr-sm-2 mb-sm-0"
                  onChange={(e) => handleFilterChange(e, "provinces")}
                  value={selectedFilters.provinces}

                >
                  <option value="">Select Province</option>
                  {provinces.map((province: string) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
                <select
                  id="inlineFormRole"
                  className="custom-select mb-2 mr-sm-2 mb-sm-0"
                  onChange={(e) => handleFilterChange(e, "industries")}
                  value={selectedFilters.industries}

                >
                  <option value="">Select Industry</option>
                  {industries.map((industry: string) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                <select
                  id="inlineFormRole"
                  className="custom-select mb-2 mr-sm-2 mb-sm-0"
                  onChange={(e) => handleFilterChange(e, "companyLocations")}
                  value={selectedFilters.companyLocations}

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
                      provinces: "",
                      industries: "",
                      companyLocations: "",
                    
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
            {Object.entries(selectedFilters).map(([key, value]) => {
              return value ? (
                <span key={key} className="badge badge-primary mr-2">
                  {key}:{" "}
                  {key === "status"
                    ? statuses.find((s: any) => s.value === value)?.label
                    : value}
                  <div onClick={() => removeFilter(key)}>&times;</div>
                </span>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
