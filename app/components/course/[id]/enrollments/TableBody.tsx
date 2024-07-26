import Link from "next/link";
import { NextPage } from "next";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import { useParams, usePathname, useSearchParams } from "next/navigation";

const TableBody: NextPage<{ list: CourseApplicants[] }> = ({ list }) => {
  const PASSMARK = 50;
  const params = useParams<{ id: string }>();
  const id = params.id;
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title") || "";
  const pathname = usePathname();

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
            const nameSurname = name + " " + surname;

            return (
              <tr key={data.id} className="selected">
                <td className="text-center js-lists-values-projects small">
                  <div className="d-flex align-items-center justify-content-center ">
                    <Link
                      href={`${pathname}/${data.id}/profiles?title=${courseTitle}&studentName=${nameSurname}`}
                    >
                      <i className="material-icons mr-8pt">visibility</i>
                    </Link>
                  </div>
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.id.substring(0, 5)}
                </td>

                <td className="text-center js-lists-values-projects small">
                  {nameSurname}
                </td>

                <td className="text-center js-lists-values-projects small">
                  {data.title}
                </td>

                <td className="text-center js-lists-values-projects small">
                  <div className="align-items-center">
                    {data.status === 3 && (
                      <span
                        className="badge badge-warning "
                        style={{ fontSize: "1.25em" }}
                      >
                        Review Pending
                      </span>
                    )}
                    {data.status === 2 && (
                      <span
                        className="badge badge-success "
                        style={{ fontSize: "1.25em" }}
                      >
                        Completed
                      </span>
                    )}
                    {data.status === 1 && (
                      <span
                        className="badge badge-danger "
                        style={{ fontSize: "1.25em" }}
                      >
                        Deleted
                      </span>
                    )}
                    {data.status === 0 && (
                      <span
                        className="badge badge-info "
                        style={{ fontSize: "1.25em" }}
                      >
                        Enrolled
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </>
  );
};

export default TableBody;
