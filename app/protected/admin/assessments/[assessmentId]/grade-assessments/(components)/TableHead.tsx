const TableHead = () => {
  const headers = [
    { name: "Student Name", align: "text-center" },
    { name: "Student ID", align: "w-25 text-center" },
    { name: "Date of Submission", align: "text-center" },
    { name: "Facilitator Mark Allocation", align: "text-center" },
    { name: "Moderator Mark Allocation", align: "text-center" },
  ];

  return (
    <>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.name} className={header.align}>
              <a
                key={header.name}
                className="sort"
                data-sort="js-lists-values-employee-name"
              >
                {header.name}
              </a>
            </th>
          ))}
          <th className="text-center">Action</th>
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
