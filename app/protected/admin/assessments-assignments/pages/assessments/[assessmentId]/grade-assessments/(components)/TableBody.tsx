import Link from "next/link";
import { NextPage } from "next";
import { usePathname, useSearchParams } from "next/navigation";
import { ICourseAssessment } from "@/app/interfaces/assessments";
import SkeletonLoader from "@/components/skeleton/skeletonLoader";

const TableBody: NextPage<{loading:boolean, list: ICourseAssessment[] }> = ({ list ,loading}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
        {loading ?
        <>
        {
          list.length > 0 ?  list.map((data: ICourseAssessment) => (
            <tr key={data.assessmentId} className="selected">
              <td
                className={`${align.student_name} js-lists-values-projects small`}
              >
                {data.name}
              </td>
              <td
                className={`${align.student_surname} js-lists-values-projects small`}
              >
                {data.userId.slice(0, 6) + '...'}
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
                  className={`chip chip-outline-success text ${align.student_name}`}
                  href={`${pathname}/${data.userId}?assessment_name=${assessmentName}&title=${data.name}&homeTitle=${assessmentName}`}
                >
                  Grade Assessment
                  <i className="material-icons ">assignment_turned_in</i>
                </Link>
              </td>
            </tr>
          )) :   <tr className="selected">
          <td className="text-center js-lists-values-projects small" colSpan={10}>
           No Students Assessments
          </td>
          
         </tr>
         
        }
        
        </>
          :   <>
          <tr className="selected">
         <td colSpan={10}>
           <SkeletonLoader width="100%" height="2em" />
         </td>
         
       </tr>
       <tr className="selected">
         <td colSpan={10}>
           <SkeletonLoader width="100%" height="2em" />
         </td>
         
       </tr> <tr className="selected">
         <td colSpan={10}>
           <SkeletonLoader width="100%" height="2em" />
         </td>
         
       </tr>
         </>
          
          }
      </tbody>
    </>
  );
};

export default TableBody;
