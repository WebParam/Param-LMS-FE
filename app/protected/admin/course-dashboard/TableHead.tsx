const TableHead = () => {
  const headers = [
    "StudentID",
    "Student Name",
    "Completion",
    "Time Spent",
    "Points Collected",
  ];

  return (
    <>
      <thead>
        <tr>
          <th style={{ width: "18px" }} className="pr-0">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input js-toggle-check-all"
                data-target="#staff"
                id="customCheckAllstaff"
              />
              <label className="custom-control-label">
                <span className="text-hide">Toggle all</span>
              </label>
            </div>
          </th>
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
