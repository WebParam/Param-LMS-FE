"use client";

import { workbookTimeSpentData } from "@/app/components/analytics/graphs/course/WorkbookTimeSpent";

import ChartLayout from "@/app/components/analytics/graphs/ChartLayout";

import {
  options as workbookCompetionRateOptions,
  series as workbookCompetionRateSeries,
} from "@/app/components/analytics/graphs/course/WorkbookCompletionRate";

import {
  options as assignmentsPassRateOptions,
  series as assignmentsPassRateSeries,
} from "@/components/analytics/graphs/assignments/AssignmentsPassRate";
import { WorkbookSignedData } from "@/components/analytics/graphs/assessments/WorkbookSigned";

import {
  options as assignmentsCompletionRateOptions,
  series as assignmentsCompletionRateSeries,
} from "@/app/components/analytics/graphs/assignments/AssignmentsCompletionRate";
import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import PieChart from "@/components/analytics/graphs/PieChart";
export default async function Graphs() {
  return (
    <>
      <div className="row mb-lg-8pt">
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Workbooks Signed" type="bar" chartData={WorkbookSignedData}>
            <ChartProvider/>
          </ChartLayout>
        </div>


        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Workbook Completion Rate" type="pie">
            <PieChart
              options={workbookCompetionRateOptions}
              series={workbookCompetionRateSeries}
            />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            hasFilter={true}
            title="Workbook Time Spent"
            type="line"
            chartData={workbookTimeSpentData}
          >
            <ChartProvider />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Assignment Completion Rate" type="pie">
            <PieChart
              options={assignmentsPassRateOptions}
              series={assignmentsPassRateSeries}
            />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Assignment Pass Rate" type="pie">
            <PieChart
              options={assignmentsCompletionRateOptions}
              series={assignmentsCompletionRateSeries}
            />
          </ChartLayout>
        </div>
      </div>
    </>
  );
}
