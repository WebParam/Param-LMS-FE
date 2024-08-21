"use client";
import { useSearchParams } from "next/navigation";

const TableHead = () => {
  const headers = ["Name", "Student ID", "Course ID", "Program Name", "Assigned At", "Document","Icons"];


  const searchParams = useSearchParams();

  return (
    <>
      <thead>
        <tr>
          {headers.map((name) => (
            <th key={name} className="text-center">
              {name === "Embedded Link" && (
                <i className="material-icons mr-8pt">link</i>
              )}
              <a
                key={name}
                className="sort"
                data-sort={`js-lists-values-${name.toLowerCase().replace(/ /g, "-")}`}
              >
                {name}
              </a>
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
