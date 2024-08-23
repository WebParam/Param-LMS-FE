import ChartLayout from '@/components/course-analytics/graphs/ChartLayout'
import {
    options as WorkbookOptions,
    data as WorkbookData,
    barDescriptions as WorkDescription,
  } from "@/app/components/course-analytics/graphs/workbook-signed/data";
import ChartWrapper from '@/components/course-analytics/graphs/ChartWrapper';
import { barDescriptions as AssessmentProgressStatusDescription } from "@/app/components/course-analytics/graphs/AssessmentProgress/data";
import { barDescriptions as AssessmentPassRateDescription } from "@/app/components/course-analytics/graphs/AssessmentPassRate/data";
import {
    options as AvgAssessmentBarOptions,
    data as AvgAssessmentBarData,
    barDescriptions as AvgAssessmentBarDescription,
  } from "@/app/components/course-analytics/graphs/AvgPerAssessment/data";
  import {AssessmentProgressStatus } from "@/app/components/course-analytics/graphs/AssessmentProgress/AssessmentProgressStatus";
  import {AssessmentPassRate} from "@/app/components/course-analytics/graphs/AssessmentPassRate/AssessmentPassRate";
import StudentsTable from './(components)/StudentsTable';
import mockData from './(components)/data';
export default function page() {
  return (
    <>
      <div className="row mb-lg-8pt">
       
       <div className="col-lg-6 col-md-12 card-group-row__col">
           <ChartWrapper
             title="Overall Class Average"
             barDescriptions={WorkDescription}
             options={WorkbookOptions}
             data={WorkbookData}
             type="bar"
           />
         </div>
         <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Average Per Assessments"
            barDescriptions={AvgAssessmentBarDescription}
            options={AvgAssessmentBarOptions}
            data={AvgAssessmentBarData}
            type="line"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Assessent Progress Status"
            barDescriptions={AssessmentProgressStatusDescription}
            type="pie"
          >
            <AssessmentProgressStatus />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Assessent Progress Status"
            barDescriptions={AssessmentPassRateDescription}
            type="pie"
          >
            <AssessmentPassRate />
          </ChartLayout>
        </div>
      </div>
      <StudentsTable data={mockData} />
    </>
  )
}