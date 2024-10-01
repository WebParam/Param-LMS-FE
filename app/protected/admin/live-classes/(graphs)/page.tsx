import ChartWrapper from "@/app/components/course-dashboard/graphs/ChartWrapper";

import {
  options as QuestionsAskedOptions,
  data as QuestionsAskedData,
  barDescriptions as QuestionsAskedDescription,
} from "@/app/components/course-dashboard/graphs/LiveClasses/data";
import PageHeader from "@/components/course-dashboard/graphs/PageHeader";
import UnitStandardTable from "./(components)/unit-standard-table";

export default function Page() {
  return (
    <>
      <div
      className="col-lg-6 w-100 col-md-12 card-group-row__col">
        <ChartWrapper
          title="Live Classes Attended"
          barDescriptions={QuestionsAskedDescription}
          options={QuestionsAskedOptions}
          data={QuestionsAskedData}
          type="bar"
        />
      </div>
      <div className="mb-24pt mb-sm-0 mr-sm-24pt">
        <PageHeader title="Knowledge Modules" />
      </div>

      <div className="card p-relative o-hidden mb-0">
        <UnitStandardTable path="course" />
      </div>
    </>
  );
}