"use client";

import "@/app/css/tiles.css";

import { AgeVsGenderData } from "@/app/components/analytics/graphs/course-applicants/AgeVsGender";

import {
  studentsDisabilitiesData,
  studentsDisabilitiesDataFilterOptions,
  studentsDisabilitiesDatafiltersMapping,
} from "@/app/components/analytics/graphs/course-applicants/StudentDisabilities";

import {
  options as raceOptions,
  series as raceSeries,
} from "@/app/components/analytics/graphs/course-applicants/Genders";

import ChartLayout from "./ChartLayout";

import {
  options as placementOptions,
  series as placementSeries,
} from "@/app/components/analytics/graphs/course-applicants/StudentsPlacement";
import ChartProvider from "./ChartProvider";
import PieChart from "./PieChart";

import SkeletonLoader from "../skeletonLoader";
import SkeletonApplicantsTable from "./TableSkeleton/SkeletonApplicantsTable";

type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

export default async function SkeletonGraphs({ data }: any) {
  const dataTiles: DataTiles[] = [
    { name: "Students", icon: "person_outline", data: 112 },
    { name: "Disabilities", icon: "book", data: 5 },
    { name: "Employed", icon: "list", data: 4 },
    { name: "Unemployed", icon: "help", data: 10 },
  ];

  return (
    <>
      <div className="row mb-lg-8pt">
        {dataTiles.map((data: DataTiles) => (
          <div key={data.name} className="col-lg-3">
            <div className="card">
              <div
                data-toggle="tab"
                role="tab"
                aria-selected="true"
                className="dashboard-area-tabs__tab card-body text-center active"
              >
                <span className="font-weight-bold">
                  <SkeletonLoader width="100%" height="40px" />
                </span>
                <i className="material-icons text-success icon-48pt">
                  <SkeletonLoader width="100%" height="40px" />
                </i>
                <span className="h2 mb-0 mt-n1">
                  <SkeletonLoader width="100%" height="40px" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row card-group-row">
        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout
            hasFilter={false}
            title="Age vs Gender "
            type="bar"
            chartData={AgeVsGenderData}
          >
            <ChartProvider />
          </ChartLayout>
        </div>
        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout
            hasFilter={false}
            title="Age vs Gender "
            type="bar"
            chartData={AgeVsGenderData}
          >
            <ChartProvider />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Students Placement" type="pie">
            <PieChart options={placementOptions} series={placementSeries} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Student Race" type="pie">
            <PieChart options={raceOptions} series={raceSeries} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout
            hasFilter={false}
            title="Age vs Gender "
            type="bar"
            chartData={AgeVsGenderData}
          >
            <ChartProvider />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            hasFilter={false}
            title="Students Disabilities"
            type="bar"
            chartData={studentsDisabilitiesData}
            filterOptions={studentsDisabilitiesDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={studentsDisabilitiesDatafiltersMapping}
          >
            <ChartProvider />
          </ChartLayout>
        </div>
        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout
            hasFilter={false}
            title="Age vs Gender "
            type="bar"
            chartData={AgeVsGenderData}
          >
            <ChartProvider />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Students Placement" type="pie">
            <PieChart options={placementOptions} series={placementSeries} />
          </ChartLayout>
        </div>
      </div>
        <SkeletonApplicantsTable />
    </>
  );
}
