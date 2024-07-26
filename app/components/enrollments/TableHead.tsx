const TableHead = () => {
    const headers = [
      "Name",
      "Gender",
      "Race",
      "Disability",
      "Employement Status",
      "Province",
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
  