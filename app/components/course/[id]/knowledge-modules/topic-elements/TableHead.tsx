import { Title } from "chart.js";

const TableHead = () => {
  const headers = [
    "Element Code",
    "Topic Element",
    // "Action",
    "Edit",
    "Copy Video Script"
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