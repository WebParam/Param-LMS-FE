"use client";
import { useSearchParams } from "next/navigation";

const TableHead = () => {
  const headers = ["Student Name", "Course", "Placed At", "Actions"];

  const searchParams = useSearchParams();
  const isEnrolled = searchParams.get("isEnrolled");

  return (
    <>
      <thead>
        <tr>
          {headers.map((name) => (
            (name !== "Action" || (Number(isEnrolled) !== 0 && Number(isEnrolled) !== 1)) && (
              <th key={name} className="text-center">
                {name === "Embedded Link" && (
                  <i className="material-icons mr-8pt">link</i>
                )}
                <a
                  key={name}
                  className="sort"
                  data-sort="js-lists-values-employee-name"
                >
                  {name}
                </a>
              </th>
            )
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
