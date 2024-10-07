import Link from "next/link";
import { NextPage } from "next";
import { usePathname, useSearchParams } from "next/navigation";
import { ICourseAssessment } from "@/app/interfaces/assessments";
import SkeletonLoader from "@/components/skeleton/skeletonLoader";

const TableBody: NextPage<{ loading:boolean , list: ICourseAssessment[] }> = ({ list,loading }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = searchParams.get("title")!;
  const assessmentName = searchParams.get("assessment-name")!;

  const align = {
    student_name: "pl-48pt text-justify",
    student_surname: "pl-48pt text-left",
    assessment_name: "pl-48pt text-left",
    action: "text-center",
  };

  return (
    <>
      <tbody className="list" id="staff">
        {!loading ? (
      <>
        {
          list.length > 0 ?
          list.map((data: ICourseAssessment) => {
            const name = data.name != " " ? data.name : "N/A";
            const factilitatorMark =
              data.factilitatorMark > 0 ? data.factilitatorMark : 0;
            const moderatorMark =
              data.moderatorMark > 0 ? data.moderatorMark : 0;
            return (
              <tr key={data.assessmentId} className="selected">
                <td
                  className={`${align.student_name} js-lists-values-projects small`}
                >
                  {name}
                </td>
                <td
                  className={`${align.student_surname} js-lists-values-projects small`}
                >
                  {data.userId && data.userId.slice(0, 6) + "..."}
                </td>
                <td
                  className={`${align.assessment_name} js-lists-values-projects small`}
                >
                  {data.datesubmitted}
                </td>
                <td
                  className={`${align.action} js-lists-values-projects small`}
                >
                  <p
                    className={`m-0 ${
                      factilitatorMark > 50 ? "text-success" : "text-danger"
                    }`}
                  >
                    {factilitatorMark}/{data.totalMark}
                  </p>
                </td>
                <td
                  className={`${align.action} js-lists-values-projects small`}
                >
                  <p
                    className={`m-0 ${
                      moderatorMark > 50 ? "text-success" : "text-danger"
                    }`}
                  >
                    {moderatorMark}/{data.totalMark}
                  </p>
                </td>
                <td
                  className={`${align.action} js-lists-values-projects small`}
                >
                  <Link
                    className={`chip chip-outline-success text`}
                    href={`${pathname}/student/${data.userId}?title=${title}&assessment_name=${assessmentName}&studentName=${name}&homeTitle=${assessmentName}`}
                  >
                    Grade Assessment
                    <i className="material-icons ">assignment_turned_in</i>
                  </Link>
                </td>
              </tr>
            );
          })
          
          : <tr className="selected">
          <td className="text-center js-lists-values-projects small" colSpan={10}>
           No Students Assessments
          </td>
          
         </tr>
        }
      
      </>
        ) : (
          <>
            <tr className="selected">
              <td colSpan={10}>
                <SkeletonLoader width="100%" height="2em" />
              </td>
            </tr>
            <tr className="selected">
              <td colSpan={10}>
                <SkeletonLoader width="100%" height="2em" />
              </td>
            </tr>{" "}
            <tr className="selected">
              <td colSpan={10}>
                <SkeletonLoader width="100%" height="2em" />
              </td>
            </tr>
          </>
        )}
      </tbody>
    </>
  );
};

export default TableBody;
