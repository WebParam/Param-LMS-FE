import Link from "next/link";
import { NextPage } from "next";
import { usePathname } from "next/navigation";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
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
          list.map((data: any) => (
            <tr key={data.assessment_id} className="selected">
              <td
                className={`${align.student_name} js-lists-values-projects small`}
              >
                {data.student_name}
              </td>
              <td
                className={`${align.student_surname} js-lists-values-projects small`}
              >
                {data.student_id}
              </td>
              <td
                className={`${align.assessment_name} js-lists-values-projects small`}
              >
                {data.date_of_submission}
              </td>
              <td className={`${align.action} js-lists-values-projects small`}>
                <Link
                  className="chip chip-outline-success"
                  href={`${pathname}/${data.assessment_id}?assessment_name=${"Formative Assessment 1"}&name=${data.student_name}`}
                >
                  Grade Assessment
                  <i className="material-icons ">assignment_turned_in</i>
                </Link>
              </td>
              <td className={`${align.action} js-lists-values-projects small`}>
                <p className={data.moderator_mark_allocation > 50 ? "text-success" : "text-danger"}>
                  {data.moderator_mark_allocation}/100
                </p>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
