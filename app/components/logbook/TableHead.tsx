"use client";

const TableHead = () => {
  const headers = ["Student Name", "Course", "Placed At", "Job Role", "Placed Date","Actions"];


  return (
    <>
      <thead>
        <tr>
          {headers.map((name) => (
              <th key={name} className="text-center">
                <a
                  key={name}
                  className="sort"
                  data-sort="js-lists-values-employee-name"
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
