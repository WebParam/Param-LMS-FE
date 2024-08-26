const TableHead = () => {
  const headers = [
    "StudentID",
    "Student Name",
    "Completion",
    "Time Spent",
    "Points Collected",
    "Progress Status"
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
                    <th className="text-center">Action</th>

        </tr>
      </thead>
    </>
  );
};

export default TableHead;
