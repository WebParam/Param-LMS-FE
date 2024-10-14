"use client";
import ChartLayout from "@/components/analytics/graphs/ChartLayout";

import {
  options as AssessmentPassRateOptions,
  series as AssessmentPassRateSeries,
} from "@/app/components/analytics/graphs/assessments/AssessmentPassRate";

import StudentsTable from "@/app/components/analytics/tables/assessments/StudentsTable";
import mockData from "@/app/components/analytics/tables/assessments/data";
import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import PieChart from "@/components/analytics/graphs/PieChart";
import { AvgAssessmentData ,AvgAssessmentDatafiltersMapping,
  AvgAssessmentDataFilterOptions} from "@/components/analytics/graphs/assessments/AvgPerAssessment";
import { AvgTimeSpentAssesmentData, AvgTimeSpentData, AvgTimeSpentDataFilterOptions, AvgTimeSpentDatafiltersMapping } from "../course/AvgTimeSpent";

export default function Graphs() {
  return (
    <>
      <div className="row mb-lg-8pt">
      
        <div
          className="col-lg-6 col-md-12 card-group-row__col"
        >
          <ChartLayout title="Assessment Pass Rate" type="pie">
            <PieChart
              options={AssessmentPassRateOptions}
              series={AssessmentPassRateSeries}
            />
          </ChartLayout>
        </div>
        <div
          className="col-lg-6 col-md-12 card-group-row__col"
        >
          <ChartLayout
            hasFilter={true}
            title="Time spent on assessments (mins)"
            type="bar"
            chartData={AvgTimeSpentAssesmentData}
            filterOptions={AvgTimeSpentDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={AvgTimeSpentDatafiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>


      </div>
      <div>
        <StudentsTable data={mockData} />
      </div>
    </>
  );
}
