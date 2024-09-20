
const TableHead = () => {
  const headers = [
    "Student ID",
    "Full Name",
    "Assessment Type",
    "Assessment Date",
    "Average Score",
    "Instructor"
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
