"use client";
import ChartLayout from "@/components/analytics/graphs/ChartLayout";

import {
  options as AssessmentPassRateOptions,
  series as AssessmentPassRateSeries,
} from "@/app/components/analytics/graphs/assessments/AssessmentPassRate";

import StudentsTable from "../../../../../components/analytics/tables/assessments/StudentsTable";
import mockData from "../../../../../components/analytics/tables/assessments/data";
import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import PieChart from "@/components/analytics/graphs/PieChart";
import { AvgAssessmentData } from "@/components/analytics/graphs/assessments/AvgPerAssessment";

export default function page() {
  return (
    <>
      <div className="row mb-lg-8pt">
      
        <div
          data-aos="flip-down"
          className="col-lg-6 col-md-12 card-group-row__col"
        >
          <ChartLayout title="Average Per Assessment" type="line">
            <ChartProvider chartData={AvgAssessmentData} />
          </ChartLayout>
        </div>

        <div
          data-aos="flip-down"
          className="col-lg-6 col-md-12 card-group-row__col"
        >
          <ChartLayout title="Assessment Completion Rate" type="pie">
            <PieChart
              options={AssessmentPassRateOptions}
              series={AssessmentPassRateSeries}
            />
          </ChartLayout>
        </div>
        <div
          data-aos="flip-down"
          className="col-lg-6 col-md-12 card-group-row__col"
        >
          <ChartLayout title="Assessment Pass Rate" type="pie">
            <PieChart
              options={AssessmentPassRateOptions}
              series={AssessmentPassRateSeries}
            />
          </ChartLayout>
        </div>


      </div>
      <div data-aos="slide-right">
        <StudentsTable data={mockData} />
      </div>
    </>
  );
}
