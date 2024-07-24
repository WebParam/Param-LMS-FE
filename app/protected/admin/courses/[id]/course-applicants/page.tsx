"use server";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import ChartWrapper from "@/app/components/enrolment-dashboard/graphs/ChartWrapper";
import {
  options as OverallAssessmentBarOptions,
  data as OverallAssessmentBarData,
  barDescriptions as OverallAssessmentBarDescription,
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
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import TablePagination from "@/components/enrollments/TablePagination";

type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

const Body = async () => {
  const courseId = "6669f0ff8759b480859c10a7";

  function downloadAsXls() {
    fetch(
      `https://khumla-dev-user-read.azurewebsites.net/api/Student/ExportStudentInformation/${courseId}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const xlsData = XLSX.utils.sheet_to_json(worksheet);
          const newWorkbook = XLSX.utils.book_new();
          const newWorksheet = XLSX.utils.json_to_sheet(xlsData);
          XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");
          const xlsArray = XLSX.write(newWorkbook, {
            bookType: "xlsx",
            type: "array",
          });
          const xlsBlob = new Blob([xlsArray], {
            type: "application/octet-stream",
          });
          saveAs(xlsBlob, "students.xlsx");
        };
        reader.readAsBinaryString(blob);
      })
      .catch((error) => console.error("Error downloading XLS file:", error));
  }

  const fetchedData: IStudentsData = await getEnrollments(courseId, false);

  const dataTiles: DataTiles[] = [
    {
      name: "Students",
      icon: "person_outline",
      data: fetchedData?.numberOfStudents!,
    },
    {
      name: "Employed",
      icon: "list",
      data: fetchedData?.numbetOfStudentsEmployed!,
    },
    {
      name: "Unemployed",
      icon: "help",
      data: fetchedData?.numberOfStudentsUnemployed!,
    },
    {
      name: "Disability",
      icon: "help",
      data: fetchedData?.numberOfStudentsWithDisabilities!,
    },
  ];

  const studentsByProvinceData: any = [
    fetchedData?.numberOfStudentsByProvince.gauteng!,
    fetchedData?.numberOfStudentsByProvince.westernCape!,
    fetchedData?.numberOfStudentsByProvince.easternCape!,
    fetchedData?.numberOfStudentsByProvince.northernCape!,
    fetchedData?.numberOfStudentsByProvince.limpopo!,
    fetchedData?.numberOfStudentsByProvince.mpumalanga!,
    fetchedData?.numberOfStudentsByProvince.kwaZuluNatal!,
    fetchedData?.numberOfStudentsByProvince.freeState!,
    fetchedData?.numberOfStudentsByProvince.northWest!,
  ];

  const StudentRacesData = [
    fetchedData?.numberOfStudentsByEquityGroup.black!,
    fetchedData?.numberOfStudentsByEquityGroup.coloured!,
    fetchedData?.numberOfStudentsByEquityGroup.indian!,
    fetchedData?.numberOfStudentsByEquityGroup.white!,
    fetchedData?.numberOfStudentsByEquityGroup.asian!,
    fetchedData?.numberOfStudentsByEquityGroup.other!,
    fetchedData?.numberOfStudentsByEquityGroup.notSpecified!,
  ];

  const genderRolesData = [
    fetchedData?.numberOfStudentsByGender.male!,
    fetchedData?.numberOfStudentsByGender.female!,
  ];

  const SocioEcoStatusData: any = [
    fetchedData?.numberOfStudentsByProvince.gauteng!,
    fetchedData?.numberOfStudentsByProvince.westernCape!,
    fetchedData?.numberOfStudentsByProvince.easternCape!,
    fetchedData?.numberOfStudentsByProvince.northernCape!,
    fetchedData?.numberOfStudentsByProvince.limpopo!,
    fetchedData?.numberOfStudentsByProvince.mpumalanga!,
    fetchedData?.numberOfStudentsByProvince.kwaZuluNatal!,
    fetchedData?.numberOfStudentsByProvince.freeState!,
    fetchedData?.numberOfStudentsByProvince.northWest!,
  ];

  const StudentDisabiltyData: any = [
    fetchedData?.numberOfStudentsByDisability.deaf!,
    fetchedData?.numberOfStudentsByDisability.blind!,
    fetchedData?.numberOfStudentsByDisability.dumb!,
    fetchedData?.numberOfStudentsByDisability.physicallyDisabled!,
    fetchedData?.numberOfStudentsByDisability.intellectuallyDisabled!,
    fetchedData?.numberOfStudentsByDisability.multipleDisabilities!,
  ];

  const StudentCitizenshipData: any = [
    fetchedData?.numberOfStudentsByNationality.southAfrican!,
    fetchedData?.numberOfStudentsByNationality.southAfrican!,
    fetchedData?.numberOfStudentsByNationality.others!,
    fetchedData?.numberOfStudentsByNationality.pernamentResident!,
    fetchedData?.numberOfStudentsByNationality.unknown!,
  ];

  const StudentLanguagesData: any = [
    fetchedData?.numberOfStudentsByLanguage.english!,

    fetchedData?.numberOfStudentsByLanguage.afrikaans!,

    fetchedData?.numberOfStudentsByLanguage.zulu!,

    fetchedData?.numberOfStudentsByLanguage.xhosa!,

    fetchedData?.numberOfStudentsByLanguage.tswana!,
    fetchedData?.numberOfStudentsByLanguage.sotho!,
    fetchedData?.numberOfStudentsByLanguage.venda!,
    fetchedData?.numberOfStudentsByLanguage.tsonga!,
    fetchedData?.numberOfStudentsByLanguage.swati!,
    fetchedData?.numberOfStudentsByLanguage.ndebele!,
    fetchedData?.numberOfStudentsByLanguage.signLanguage!,
    fetchedData?.numberOfStudentsByLanguage.pedi!,
  ];

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
      <TablePagination data={fetchedData.courseApplicants} />
      {/* <button
        className="btn btn-primary enrolBtn m-3"
        onClick={downloadAsXls}
        style={{ cursor: "pointer" }}
      >
        Download As XLS
      </button> */}
    </>
  );
};

export default Body;
