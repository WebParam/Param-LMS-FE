const TableHead = () => {
  const headers = [
    { name: "Name", align: "pl-48pt text-left" }, 
    { name: "Completion", align: "text-center" }, 
    { name: "Time Spent", align: "text-left" },
    { name: "Points", align: "text-center" },  
    { name: "Activeness", align: "text-center" }, 
    { name: "Questions", align: "text-center" }, 
    { name: "Notes", align: "text-center" }, 
    { name: "Downloads", align: "text-center" }, 
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
