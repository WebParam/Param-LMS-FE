import ChartLayout from '@/components/course-analytics/graphs/ChartLayout'
import {
    options as WorkbookOptions,
    data as WorkbookData,
    barDescriptions as WorkDescription,
  } from "@/app/components/course-analytics/graphs/workbook-signed/data";
  import { barDescriptions as CompetencyDescription } from "@/app/components/course-analytics/graphs/workbook-competency/data";
  import { CompetentVsIncompetent } from "@/app/components/course-analytics/graphs/workbook-competency/WorkCompetency";
  import ProgressBar from 'react-bootstrap/ProgressBar';
import ChartWrapper from '@/components/course-analytics/graphs/ChartWrapper';
import { IndustryOfHost } from "@/app/components/course-analytics/graphs/IndustryOfHost/IndustryOfHost";
import { barDescriptions as IndustryOfHostBarDataDescription } from "@/app/components/course-analytics/graphs/IndustryOfHost/data";
import {
  options as QuestionsAskedOptions,
  data as QuestionsAskedData,
  barDescriptions as QuestionsAskedDescription,
} from "@/app/components/course-analytics/graphs/QuestionsAsked/data";


export default function page() {
  return (
    <>
     <div className="page-separator">
        <div className="page-separator__text">Workbok Analytics</div>
      </div>
      <div className="row mb-lg-8pt">
       

       <div className="col-lg-6 col-md-12 card-group-row__col">
           <ChartWrapper
             title="Workbook Signed"
             barDescriptions={WorkDescription}
             options={WorkbookOptions}
             data={WorkbookData}
             type="bar"
           />
         </div>
         <div className="col-lg-6 col-md-12 card-group-row__col">
           <ChartLayout
             title="Workbook Competency"
             barDescriptions={CompetencyDescription}
             type="pie"
           >
             <CompetentVsIncompetent />
           </ChartLayout>
         </div>
 
         <div className="col-lg-6 col-md-12 card-group-row__col">
           <ChartLayout
             title="Overall Workbooks Signed"
             barDescriptions={WorkDescription}
           >
             
             <ProgressBar variant = "info" now={60} label={`${60}%`} />        
             
           </ChartLayout>
         </div>
     </div>
     <div className="page-separator">
        <div className="page-separator__text">Host Company Analytics</div>
      </div>
      <div className="row mb-lg-8pt">
        
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Host Industry"
            barDescriptions={IndustryOfHostBarDataDescription}
          >
            <IndustryOfHost />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Questions Asked"
            barDescriptions={QuestionsAskedDescription}
            options={QuestionsAskedOptions}
            data={QuestionsAskedData}
            type="bar"
          />
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Questions Asked"
            barDescriptions={QuestionsAskedDescription}
            options={QuestionsAskedOptions}
            data={QuestionsAskedData}
            type="bar"
          />
        </div>
 
      </div>
      
    </>
  )
}
