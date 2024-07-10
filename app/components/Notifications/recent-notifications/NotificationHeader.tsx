const NotificationHeader = () => {
    const headers = [
      "Students",
      "Facilitators",
      "Moderators"
    ];
  
    return (
      <>
        <thead className="card-header card-header-tabs-basic nav px-0">
          <tr>
            {headers.map((name) => (
              <th key={name} className="text-center px-3">
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
  
  export default NotificationHeader;  
