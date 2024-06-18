import React from 'react'

type DataTiles = {
    name: string;
    icon: string;
    data: number;
  };
  
export const DataTiles = () => {
    const dataTiles: DataTiles[] = [
        { name: "Students", icon: "person_outline", data: 112 },
        { name: "Modules", icon: "book", data: 5 },
        { name: "Quizzes", icon: "help", data: 10 },
        { name: "Assessments", icon: "list", data: 4 },
        { name: "Documents Downloaded", icon: "cloud_download", data: 79 },
      ];

  return (
    <div className="row mb-lg-8pt">
    {dataTiles.map((data: DataTiles) => (
      <div key={data.name} className="col-lg-3">
        <div className="card">
          <div
            data-toggle="tab"
            role="tab"
            aria-selected="true"
            className="dashboard-area-tabs__tab card-body text-center active"
          >
            <span className="font-weight-bold">{data.name}</span>
            <i className="material-icons text-success icon-48pt">
              {data.icon}
            </i>
            <span className="h2 mb-0 mt-n1">{data.data}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}
