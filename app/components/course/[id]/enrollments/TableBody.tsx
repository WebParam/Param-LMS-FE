import Link from "next/link";
import { NextPage } from "next";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import { useParams, useSearchParams } from "next/navigation";

const TableBody: NextPage<{ list: CourseApplicants[] }> = ({ list }) => {
  const PASSMARK = 50;
  const params = useParams<{ id: string }>();
  const id = params.id;
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title") || "";

  const people = [
    { name: "Alice", surname: "Smith" },
    { name: "Bob", surname: "Johnson" },
    { name: "Charlie", surname: "Williams" },
    { name: "Diana", surname: "Jones" },
    { name: "Edward", surname: "Brown" },
    { name: "Fiona", surname: "Davis" },
    { name: "George", surname: "Miller" },
    { name: "Maxwell", surname: "mhlanga" },
  ];

  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any, index: number) => {
            const name = data.name || people[index % people.length]?.name;
            const surname =
              data.surname || people[index % people.length]?.surname;

            return (
              <tr key={data.id} className="selected">
                <td className="text-center js-lists-values-projects small">
                  <div className="d-flex align-items-center justify-content-center ">
                    <Link
                      href={`/protected/admin/courses/${id}/enrollments/${
                        data.id
                      }/sor?title=${courseTitle}&studentName=${
                        name + " " + surname
                      }`}
                    >
                      <i className="material-icons mr-8pt">visibility</i>
                    </Link>
                  </div>
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.id.substring(0, 5)}
                </td>

                <td className="text-center js-lists-values-projects small">
                  {name + " " + surname}
                </td>
              </tr>
            );
          })}
      </tbody>
    </>
  );
};

export default TableBody;
