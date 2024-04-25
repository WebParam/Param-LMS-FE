const TableHead = () => {
  const headers = [
    { name: "Quiz Name", align: "w-25 text-center" }, 
    { name: "Attempts", align: "text-center" }, 
    { name: "Result", align: "text-center" }, 
    { name: "Time Spent", align: "text-center" }, 
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
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
