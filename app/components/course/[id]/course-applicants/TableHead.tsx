const TableHead = () => {
  const headers = [
    "StudentID",
    "Name",
    "Course Applied",
    "Statuses"
  ];

  return (
    <>
      <thead>
        <tr>          
          <th className="text-center">Actions</th>
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
