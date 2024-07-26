"use client";
import React, { useState, useCallback } from "react";
import Table from "./Table";
import Pagination from "@/app/components/Pagination";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import debounce from "lodash.debounce";

const provinces = [
  "Gauteng",
  "Western Cape",
  "Eastern Cape",
  "Northern Cape",
  "Limpopo",
  "Mpumalanga",
  "KZN",
  "Free State",
  "North West",
];

const genders = ["Male", "Female"];

const races = [
  "black",
  "coloured",
  "indian",
  "white",
  "asian",
  "other",
  "notSpecified",
];

const employmentStatuses = [
  "Employed",
  "Unemployed",
  "Home Maker",
  "Scholar",
  "Unemployed(Disabled)",
  "Employed(Disabled)",
  "Other",
  "Unspecified",
];

const disabilities = [
  "deaf",
  "blind",
  "dumb",
  "physicallyDisabled",
  "intellectuallyDisabled",
  "multipleDisabilities",
];

interface TablePaginationProps {
  data: CourseApplicants[];
  courseId?: string;
}

function TablePagination({ data, courseId }: TablePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    province: "",
    gender: "",
    race: "",
    employmentStatus: "",
    disability: "",
  });

  const debouncedSearch = useCallback(
    debounce((term) => {
      applyFilters(term, selectedFilters);
    }, 300),
    [data, selectedFilters]
  );

  function applyFilters(term: any, filters: any) {
    let newFilteredData = data.filter((applicant) =>
      Object.values(applicant).some((value) =>
        String(value).toLowerCase().includes(term.toLowerCase())
      )
    );

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newFilteredData = newFilteredData.filter(
          (applicant: any) => applicant[key] === value
        );
      }
    });

    setFilteredData(newFilteredData);
  }

  function handleFilterChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    filterKey: string
  ) {
    const newFilters = {
      ...selectedFilters,
      [filterKey]: e.target.value,
    };

    setSelectedFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  }

  function removeFilter(filterKey: string) {
    const newFilters = {
      ...selectedFilters,
      [filterKey]: "",
    };

    setSelectedFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  }

  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = filteredData.slice(
    indexOfFirstItem,
    indexOfFirstItem + ITEMSPERPAGE
  );

  function downloadAsXls(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    fetch(
      `https://khumla-dev-user-read.azurewebsites.net/api/Student/ExportStudentInformation/${courseId}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const xlsData = XLSX.utils.sheet_to_json(worksheet);
          const newWorkbook = XLSX.utils.book_new();
          const newWorksheet = XLSX.utils.json_to_sheet(xlsData);
          XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");
          const xlsArray = XLSX.write(newWorkbook, {
            bookType: "xlsx",
            type: "array",
          });
          const xlsBlob = new Blob([xlsArray], {
            type: "application/octet-stream",
          });
          saveAs(xlsBlob, "students.xlsx");
          setLoading(false);
        };
        reader.readAsBinaryString(blob);
      })
      .catch((error) => console.error("Error downloading XLS file:", error));
  }

  return (
    <>
      <div className="filters-container mb-2 d-flex align-items-center">
        <input
          placeholder="Search"
          type="text"
          className="form-control search-input"
          id="datatable-search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          onChange={(e) => handleFilterChange(e, "province")}
          className="form-control ml-2"
        >
          <option value="">Select Province</option>
          {provinces.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => handleFilterChange(e, "gender")}
          className="form-control ml-2"
        >
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => handleFilterChange(e, "race")}
          className="form-control ml-2"
        >
          <option value="">Select Race</option>
          {races.map((race) => (
            <option key={race} value={race}>
              {race}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => handleFilterChange(e, "employmentStatus")}
          className="form-control ml-2"
        >
          <option value="">Select Employment Status</option>
          {employmentStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => handleFilterChange(e, "disability")}
          className="form-control ml-2"
        >
          <option value="">Select Disability</option>
          {disabilities.map((disability) => (
            <option key={disability} value={disability}>
              {disability}
            </option>
          ))}
        </select>
      </div>
      <div className="ml-3 selected-filters mb-3">
        {Object.entries(selectedFilters).map(([key, value]) => {
          return value ? (
            <span key={key} className="badge badge-primary">
              {key}: {value}
              <button type="button" onClick={() => removeFilter(key)}>
                &times;
              </button>
            </span>
          ) : null;
        })}
      </div>
      <div className="card mb-0">
        <div className="table-responsive">
          <Table list={currentItems} />
        </div>

        <Pagination
          listLength={filteredData.length}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
      </div>

      <button
        className="btn btn-primary enrolBtn m-3"
        onClick={downloadAsXls}
        style={{ cursor: "pointer" }}
      >
        {loading ? (
          <div className="spinner-border text-white" role="status" />
        ) : (
          "Download As XLS"
        )}
      </button>
      <style jsx>{`
        .filters-container {
          display: flex;
          align-items: center;
        }
        .search-input {
          max-width: 200px;
        }
        .form-control {
          margin-left: 8px;
        }
        .selected-filters {
          display: flex;
          flex-wrap: wrap;
        }
        .badge {
          margin-right: 8px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
        }
        .badge button {
          background: none;
          border: none;
          margin-left: 4px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

export default TablePagination;
