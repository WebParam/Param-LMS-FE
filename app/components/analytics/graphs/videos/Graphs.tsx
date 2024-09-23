"use client";

import {
  filterOptions,
  filtersMapping,
  workbookData,
} from "@/app/components/analytics/graphs/course/WorkbookTimeSpent";

import ChartLayout from "@/app/components/analytics/graphs/ChartLayout";

import {
  options as workbookCompetionRateOptions,
  series as workbookCompetionRateSeries,
} from "@/app/components/analytics/graphs/course/WorkbookCompletionRate";

import {
  options as assignmentsPassRateOptions,
  series as assignmentsPassRateSeries,
} from "@/components/analytics/graphs/assignments/AssignmentsPassRate";
import {   wookbookSignedDataFilterOptions,
  wookbookSignedDatafiltersMapping,wookbookSignedData } from "@/components/analytics/graphs/assessments/WorkbookSigned";

import {
  options as assignmentsCompletionRateOptions,
  series as assignmentsCompletionRateSeries,
} from "@/app/components/analytics/graphs/assignments/AssignmentsCompletionRate";
import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import PieChart from "@/components/analytics/graphs/PieChart";

type DataTiles = {
    name: string;
    icon: string;
    data: number;
  };
  

export default function Graphs() {
    const dataTiles: DataTiles[] = [
        { name: "Total Students", icon: "person_outline", data: 1 },
        { name: "Videos Watched by All Students", icon: "videocam", data: 1 },
        { name: "Total Videos in Course", icon: "video_library", data: 1 },
        { name: "Completion Percentage", icon: "check_circle", data: 100 },
      ];

  return (
    <>
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
      {/* <div className="row mb-lg-8pt">
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Wookbooks Signed"
            type="bar"
            chartData={wookbookSignedData}
            filterOptions={wookbookSignedDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={wookbookSignedDatafiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>

      </div> */}
    </>
  );
}
