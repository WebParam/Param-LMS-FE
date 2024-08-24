const TableHead = () => {
  const headers = [
    "Company Name",
    "Company Location",
    "Industry",
    "No. Of Employees"
  ];

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
          <th>Action</th>
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
