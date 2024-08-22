const TableHead = () => {
  const headers = [
    "Name",
    "Placed At",
    "Company Name",
    "Company Location",
    "Placed At Date",
    "Industry",
    "Placement Status",
    "Job Role",
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
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
