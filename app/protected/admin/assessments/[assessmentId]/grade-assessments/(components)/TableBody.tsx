import Link from "next/link";
import { NextPage } from "next";
import { usePathname } from "next/navigation";
import { ICourseAssessment } from "@/app/interfaces/assessments";

const TableBody: NextPage<{ list: ICourseAssessment[] }> = ({ list }) => {
  const pathname = usePathname();
  const align = {
    student_name: "pl-48pt text-justify",
    student_surname: "pl-48pt text-left",
    assessment_name: "pl-48pt text-left",
    action: "text-center",
  };

  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: ICourseAssessment) => (
            <tr key={data.assessmentId} className="selected">
              <td
                className={`${align.student_name} js-lists-values-projects small`}
              >
                {data.name}
              </td>
              <td
                className={`${align.student_surname} js-lists-values-projects small`}
              >
                {data.userId}
              </td>
              <td
                className={`${align.assessment_name} js-lists-values-projects small`}
              >
                {data.datesubmitted}
              </td>
              <td className={`${align.action} js-lists-values-projects small`}>
              <p className={data.factilitatorMark > 50 ? "text-success" : "text-danger"}>
                  {data.factilitatorMark}/{data.totalMark}
                </p>
              </td>
              <td className={`${align.action} js-lists-values-projects small`}>
                <p className={data.moderatorMark > 50 ? "text-success" : "text-danger"}>
                  {data.moderatorMark}/{data.totalMark}
                </p>
              </td>
              <td className={`${align.action} js-lists-values-projects small`}>
              <Link
                  className="chip chip-outline-success"
                  href={`${pathname}/${data.userId}?assessment_name=${"Formative Assessment 1"}&name=${data.name}`}
                >
                  Grade Assessment
                  <i className="material-icons ">assignment_turned_in</i>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
