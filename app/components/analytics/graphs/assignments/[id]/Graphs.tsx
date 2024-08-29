"use client"
import ChartLayout from '@/components/analytics/graphs/ChartLayout'
import {
    WorkbookSignedData
  } from "@/components/analytics/graphs/assessments/WorkbookSigned";

import {
    options as AssessmentPassRateOptions,
    series as AssessmentPassRateSeries,
  } from "@/app/components/analytics/graphs/assessments/AssessmentPassRate";

import ChartProvider from '@/components/analytics/graphs/ChartProvider';
import PieChart from '@/components/analytics/graphs/PieChart';
import { AvgAssessmentData } from '@/components/analytics/graphs/assessments/AvgPerAssessment';
export default function Graphs() {
  return (
    <>
       <div className="row mb-lg-8pt">
       
       <div  className="col-lg-6 col-md-12 card-group-row__col">
       <ChartLayout chartData={WorkbookSignedData} title="Workbooks Signed" type="bar">
            <ChartProvider  />
          </ChartLayout>
         </div>

         <div  className="col-lg-6 col-md-12 card-group-row__col">
         <ChartLayout  chartData={AvgAssessmentData} title="Average Per Assessment" type="line">
            <ChartProvider />
          </ChartLayout>
        </div>
        <div  className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout title="Assessment Progress Status" type="pie">
            <PieChart
              options={AssessmentPassRateOptions}
              series={AssessmentPassRateSeries}
            />
          </ChartLayout>
        </div>
        <div  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Assessment Pass Rate" type="pie">
            <PieChart
              options={AssessmentPassRateOptions}
              series={AssessmentPassRateSeries}
            />
          </ChartLayout>
        </div>
      </div>
    </>
  )
}
