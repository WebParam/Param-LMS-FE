
const TableHead = () => {
  const headers = [
    "Full Name",
    "Number of Videos Watched",
    "Topic Completion Rate"
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
