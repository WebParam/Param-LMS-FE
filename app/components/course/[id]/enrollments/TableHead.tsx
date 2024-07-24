const TableHead = () => {
  const headers = [
    "Name",
    "Gender",
    "Age",
    "Home Language",
    "Race",
    "Disability",
    "Employement Status",
    "Provice",
    "Status"
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
          <th className="text-center">Actions</th>
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
