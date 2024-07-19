import ChartWrapper from "@/app/components/course-dashboard/graphs/ChartWrapper";

import {
  options as QuestionsAskedOptions,
  data as QuestionsAskedData,
  barDescriptions as QuestionsAskedDescription,
} from "@/app/components/course-dashboard/graphs/LiveClasses/data";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
        <ChartWrapper
          title="Live Classes Attended"
          barDescriptions={QuestionsAskedDescription}
          options={QuestionsAskedOptions}
          data={QuestionsAskedData}
          type="bar"
        />
      </div>
    </>
  );
}
