import { getEnrollments } from "@/app/lib/actions/enrollments";
import ChartWrapper from "@/app/components/enrolment-dashboard/graphs/ChartWrapper";
import {
  options as OverallAssessmentBarOptions,
  barDescriptions as OverallAssessmentBarDescription,
  transformData,
} from "@/app/components/enrolment-dashboard/graphs/OverallAssessment/data";

import {
  options as SocioEcoStatusOptions,
  data as SocioEcoStatusDataFn,
  barDescriptions as SocioEcoStatusDescription,
} from "@/app/components/enrolment-dashboard/graphs/SocioEcoStatus/data";

import {
  options as StudentProvincesOptions,
  data as StudentProvincesDataFn,
  barDescriptions as StudentProvincesDescription,
} from "@/app/components/enrolment-dashboard/graphs/AvgStudentInProvince/data";

import {
  options as StudentDisabilityOptions,
  data as StudentDisabilityDataFn,
  barDescriptions as StudentDisabilityDescription,
} from "@/app/components/enrolment-dashboard/graphs/AvgStudentDisabilities/data";

import {
  options as StudentLangOptions,
  data as StudentLangDataFn,
  barDescriptions as StudentLangDescription,
} from "@/app/components/enrolment-dashboard/graphs/AvgLangOfStudent/data";

import {
  options as CitizenshipChartOptions,
  data as CitizenshipChartData,
  barDescriptions as CitizenshipChartDescription,
} from "@/app/components/enrolment-dashboard/graphs/CitizenshipChart/data";

import { barDescriptions as StudentsProgressStatusDescription } from "@/components/enrolment-dashboard/graphs/StudentGenderRoles/data";
import { barDescriptions as StudentRacesDescription } from "@/app/components/enrolment-dashboard/graphs/StudentRaces/data";

import ChartLayout from "@/app/components/enrolment-dashboard/graphs/ChartLayout";
import { StudentGenderRoles } from "@/components/enrolment-dashboard/graphs/StudentGenderRoles/StudentGenderPie";
import { StudentRaces } from "@/app/components/enrolment-dashboard/graphs/StudentRaces/StudentRaces";
import { IStudentsData } from "@/app/interfaces/courseApplicants";
import TablePagination from "@/components/enrollments/TablePagination";
import {
  citizenshipData,
  disabilitiesData,
  genderData,
  languagesData,
  provinceData,
  racesData,
  socioEconomicData,
  tilesData,
} from "@/components/enrollments/data";

type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

const Body = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;

  const fetchedData: IStudentsData = await getEnrollments(courseId, false);
  const dataTiles: DataTiles[] = tilesData(fetchedData);
  const studentsByProvinceData: any = provinceData(fetchedData);
  const StudentRacesData = racesData(fetchedData);
  const genderRolesData = genderData(fetchedData);
  const SocioEcoStatusData: any = socioEconomicData(fetchedData);
  const StudentDisabiltyData: any = disabilitiesData(fetchedData);
  const StudentCitizenshipData: any = citizenshipData(fetchedData);
  const StudentLanguagesData: any = languagesData(fetchedData);

  const StudentProvincesBarData = await StudentProvincesDataFn(
    studentsByProvinceData
  );

  const StudentDisabilityBarData = await StudentDisabilityDataFn(
    StudentDisabiltyData
  );

  const StudentSocioEcoStatusBarData = await SocioEcoStatusDataFn(
    SocioEcoStatusData
  );

  const StudentCitizenData = await CitizenshipChartData(StudentCitizenshipData);
  const StudentLangData = await StudentLangDataFn(StudentLanguagesData);

  const ageRangeGenderDistribution =
    fetchedData?.AgeRangeGenderDistribution || [];
  const OverallAssessmentBarData = transformData(ageRangeGenderDistribution);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-lg-8pt">
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
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Student Provinces"
            barDescriptions={StudentProvincesDescription}
            options={StudentProvincesOptions}
            data={StudentProvincesBarData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Gender vs Age Group Category"
            barDescriptions={OverallAssessmentBarDescription}
            options={OverallAssessmentBarOptions}
            data={OverallAssessmentBarData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Gender"
            barDescriptions={StudentsProgressStatusDescription}
            type="pie"
          >
            <StudentGenderRoles StudentRoles={genderRolesData} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Different Races"
            barDescriptions={StudentRacesDescription}
            type="pie"
          >
            <StudentRaces studentRacesData={StudentRacesData} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Socio Economic Status"
            barDescriptions={SocioEcoStatusDescription}
            options={SocioEcoStatusOptions}
            data={StudentSocioEcoStatusBarData}
            type="bar"
          />
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Disabilities"
            barDescriptions={StudentDisabilityDescription}
            options={StudentDisabilityOptions}
            data={StudentDisabilityBarData}
            type="bar"
          />
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Citizenship"
            barDescriptions={CitizenshipChartDescription}
            options={CitizenshipChartOptions}
            data={StudentCitizenData}
            type="bar"
          />
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Student Languages"
            barDescriptions={StudentLangDescription}
            options={StudentLangOptions}
            data={StudentLangData}
            type="bar"
          />
        </div>
      </div>
      <TablePagination
        courseId={courseId}
        data={
          fetchedData && fetchedData.courseApplicants
            ? fetchedData.courseApplicants
            : []
        }
      />
    </>
  );
};

export default Body;
