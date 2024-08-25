import { useEffect, useState } from "react";
import {
  provinces,
  genders,
  races,
  employmentStatuses,
  disabilities,
} from "../../../course/[id]/course-applicants/graphs/data";

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
    province: "",
    gender: "",
    race: "",
    employmentStatus: "",
    disability: "",
    status: "",
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
              <div className="d-flex" style={{ gap: "2px" }}>
                <input
                  style={{ width: "100px" }}
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
                  onChange={(e) => handleFilterChange(e, "province")}
                  value={selectedFilters.province}

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
                  onChange={(e) => handleFilterChange(e, "gender")}
                  value={selectedFilters.gender}

                >
                  <option value="">Select Gender</option>
                  {genders.map((gender: string) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
                <select
                  id="inlineFormRole"
                  className="custom-select mb-2 mr-sm-2 mb-sm-0"
                  onChange={(e) => handleFilterChange(e, "race")}
                  value={selectedFilters.race}

                >
                  <option value="">Select Race</option>
                  {races.map((race: string) => (
                    <option key={race} value={race}>
                      {race}
                    </option>
                  ))}
                </select>
                <select
                  style={{ width: "190px" }}
                  id="inlineFormRole"
                  className="custom-select mb-2 mr-sm-2 mb-sm-0"
                  onChange={(e) => handleFilterChange(e, "employmentStatus")}
                  value={selectedFilters.employmentStatus}

                >
                  <option value="">Select Employment Status</option>
                  {employmentStatuses.map((status: string) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <select
                  id="inlineFormRole"
                  className="custom-select mb-2 mr-sm-2 mb-sm-0"
                  onChange={(e) => handleFilterChange(e, "status")}
                  value={selectedFilters.status}
                >
                  <option value="">Select Status</option>
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <select
                  style={{ width: "150px" }}
                  id="inlineFormRole"
                  value={selectedFilters.disability}
                  className="custom-select mb-2 mr-sm-2 mb-sm-0"
                  onChange={(e) => handleFilterChange(e, "disability")}
                >
                  <option value="">Select Disability</option>
                  {disabilities.map((disability: string) => (
                    <option key={disability} value={disability}>
                      {disability}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-success"
                  onClick={() =>
                    setSelectedFilters({
                      province: "",
                      gender: "",
                      race: "",
                      employmentStatus: "",
                      disability: "",
                      status: "",
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
