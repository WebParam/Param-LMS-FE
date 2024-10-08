"use client";
import { studentProvincesData  } from "./StudentsProvinces";

import "@/app/css/tiles.css"

import { AgeVsGenderData } from "@/app/components/analytics/graphs/course-applicants/AgeVsGender";
import {  studentsEcoStatusDataFilterOptions, studentsEcoStatusDatafiltersMapping, studentsSocioEcoData } from "./SocioEcoStatusData"; 

import { studentsDisabilitiesData, studentsDisabilitiesDataFilterOptions, studentsDisabilitiesDatafiltersMapping } from "./StudentDisabilities";


import {
  options as raceOptions,
  series as raceSeries,
} from "./StudentRaces";

import ChartLayout from "@/app/components/analytics/graphs/ChartLayout";

import {
  options as genderOptions,
  series as genderSeries,
} from "./Genders";
import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import PieChart from "@/components/analytics/graphs/PieChart";
import { studentsCitizenshipData, studentsCitizenshipDataFilterOptions, studentsCitizenshipDatafiltersMapping } from "./StudentsCitizenship";
import { studentsLanguageDatafiltersMapping, studentsLanguages, studentsLanguagesDataFilterOptions } from "./StudentsLangData";

type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

export default function Graphs({Graphdata}:any) {


  const dataTiles: DataTiles[] = [
    { name: "Students", icon: "person_outline", data: Graphdata.numberOfStudents },
    { name: "Disabilities", icon: "school", data:  Graphdata.numberOfStudentsWithDisabilities},
    { name: "Employed", icon: "list", data:  Graphdata.numbetOfStudentsEmployed },
    { name: "Unemployed", icon: "help", data: Graphdata.numberOfStudentsUnemployed},
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
                <span className="font-weight-bold">{data.name}</span>
                <i className="material-icons text-success icon-48pt">
                  {data.icon}
                </i>
                <span className="h2 mb-0 mt-n1">{data.data}</span>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="row card-group-row">
        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={false}
            title="Students Provinces"
            type="bar"
            chartData={studentProvincesData({
              data:Graphdata.numberOfStudentsByProvince.overall
            })}

          >
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={false}
            title="Age vs Gender "
            type="bar"
            chartData={AgeVsGenderData({
              malesData: Graphdata.ageRangeGenderDistribution.males,
              femalesData:Graphdata.ageRangeGenderDistribution.females
            })}

          >
            <ChartProvider/>
          </ChartLayout>
        </div>

        
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Genders" type="pie">
            <PieChart options={genderOptions} series={genderSeries({
              data:Graphdata.numberOfStudentsByGender
            })} />
          </ChartLayout>
        </div> 


        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Student Race" type="pie">
            <PieChart options={raceOptions} series={raceSeries({
              data:Graphdata.numberOfStudentsByEquityGroup.overall
            })} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Students Socio Economic Status"
            type="bar"
            chartData={studentsSocioEcoData({
              studentsSocioStatusData: Graphdata.numberOfStudentsBySocialEconomicStatus.overall,
              malesStudentData: Graphdata.numberOfStudentsBySocialEconomicStatus.overall.males,
              femalesStudentData: Graphdata.numberOfStudentsBySocialEconomicStatus.overall.females
            })}
            filterOptions={studentsEcoStatusDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={studentsEcoStatusDatafiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Students Disabilities"
            type="bar"
            chartData={studentsDisabilitiesData({
              allDisabilitiesData:Graphdata.numberOfStudentsByDisability.overall,
              malesStudentData:Graphdata.numberOfStudentsByDisability.males,
              femalesStudentData:Graphdata.numberOfStudentsByDisability.females,
            })}
            filterOptions={studentsDisabilitiesDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={studentsDisabilitiesDatafiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Students Citizenship"
            type="bar"
            chartData={studentsCitizenshipData({
              allCitizenshipsData:Graphdata.numberOfStudentsByNationality.overall,
              malesStudentData:Graphdata.numberOfStudentsByNationality.males,
              femalesStudentData:Graphdata.numberOfStudentsByNationality.females
            })}
            filterOptions={studentsCitizenshipDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={studentsCitizenshipDatafiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Students Languages"
            type="bar"
            chartData={studentsLanguages({
              studentsSocioStatusData: Graphdata.numberOfStudentsByLanguage.overall,
              malesStudentData: Graphdata.numberOfStudentsByLanguage.overall.males,
              femalesStudentData: Graphdata.numberOfStudentsByLanguage.overall.females
            })}
            filterOptions={studentsLanguagesDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={studentsLanguageDatafiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>
      </div>
    </>
  );
}
