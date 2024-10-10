"use client";
import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/analytics/graphs/videos/CompletionRate";
import PieChart from "@/components/analytics/graphs/PieChart";
import ChartLayout from "../ChartLayout";

type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

export default function Graphs({Graphdata}:any) {

  return (
    <>
      <div className="row mb-lg-8pt justify-content-center">
        <div className="col-lg-6 col-md-12 card-group-row__col d-flex justify-content-center">
          <ChartLayout title="Video Completion Rate" type="pie">
            <PieChart options={studentProgressRateOptions} series={studentProgressRateSeries({
              data: Graphdata
            })} />
          </ChartLayout>
        </div>
      </div>
    </>
  );
}
