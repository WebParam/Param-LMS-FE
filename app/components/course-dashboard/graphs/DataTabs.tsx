type DataTiles = {
  name: string;
  icon: string;
  data: number;
};
type DataTabProps = {
  totalEnrollments: number;
  totalModdules: number;
  totalAssessments: number;
  totalQuizzes: number;
  documentsDownloaded: number;
}
export default function DataTab({
  totalEnrollments,
  totalModdules,
  totalAssessments,
  totalQuizzes,
  documentsDownloaded,
}: DataTabProps) {
  const dataTiles: DataTiles[] = [
    { name: "Students", icon: "person_outline", data: totalEnrollments },
    { name: "Modules", icon: "book", data: totalModdules },
    { name: "Quizzes", icon: "help", data: totalAssessments },
    { name: "Assessments", icon: "list", data: totalQuizzes },
    { name: "Documents Downloaded", icon: "cloud_download", data: documentsDownloaded },
  ];

  return (
    <div className="row mb-lg-8pt">
      {dataTiles &&
        dataTiles.map((data: DataTiles) => (
          <div key={data.name} className="col-lg-3">
            <div className="card">
              <div
                data-toggle="tab"
                role="tab"
                aria-selected="true"
                className="dashboard-area-tabs__tab card-body text-center active"
              >
                <i className="material-icons text-success icon-48pt">
                  {data.icon}
                </i>
                <span className="h2 mb-0 mt-n1">{data.data}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
