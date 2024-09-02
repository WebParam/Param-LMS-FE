"use client";
import {
  options as StudentsPlacedOptions,
  series as StudentsPlacedSeries,
} from "@/app/components/analytics/graphs/host-company/NoOfStudentsPlaced";

import ChartLayout from "@/app/components/analytics/graphs/ChartLayout";
import ChartProvider from "../ChartProvider";
import PieChart from "../PieChart";
import SimpleMap from "../../map/HostLocationMap";
import { industryOfHostdata } from "./IndustryOfHost";
import { CompanySizeData } from "./CompanySize";

export default async function Graphs() {
  return (
    <>
      <div className="row card-group-row">
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Location" type="line">
            <SimpleMap />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            hasFilter={false}
            title="Host Industries"
            type="line"
            chartData={industryOfHostdata}
          >
            <ChartProvider />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            hasFilter={false}
            title="Company Size"
            type="line"
            chartData={CompanySizeData}
          >
            <ChartProvider />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Students Placement" type="pie">
            <PieChart
              options={StudentsPlacedOptions}
              series={StudentsPlacedSeries}
            />
          </ChartLayout>
        </div>
      </div>
    </>
  );
}
