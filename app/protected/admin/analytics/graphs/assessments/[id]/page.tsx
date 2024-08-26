"use client"
import ChartLayout from '@/components/course-analytics/graphs/ChartLayout'
import {
    WorkbookSignedData
  } from "@/components/course-analytics/graphs/assessments/WorkbookSigned";

import {
    options as AssessmentPassRateOptions,
    series as AssessmentPassRateSeries,
  } from "@/app/components/course-analytics/graphs/assessments/AssessmentPassRate";

import ChartProvider from '@/components/course-analytics/graphs/ChartProvider';
import PieChart from '@/components/course-analytics/graphs/PieChart';
import { AvgAssessmentData } from '@/components/course-analytics/graphs/assessments/AvgPerAssessment';
export default function page() {
  return (
    <>
       <div className="row mb-lg-8pt">
       
       <div   data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
       <ChartLayout title="Workbooks Signed" type="bar">
            <ChartProvider chartData={WorkbookSignedData} />
          </ChartLayout>
         </div>

         <div   data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
         <ChartLayout title="Average Per Assessment" type="line">
            <ChartProvider chartData={AvgAssessmentData} />
          </ChartLayout>
        </div>
        <div   data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout title="Assessment Progress Status" type="pie">
            <PieChart
              options={AssessmentPassRateOptions}
              series={AssessmentPassRateSeries}
            />
          </ChartLayout>
        </div>
        <div   data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
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
