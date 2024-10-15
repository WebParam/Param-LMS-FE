import { getCourses } from "@/app/lib/actions/course";
import { getUser } from "@/app/lib/data/users";
import UserCourses from "@/components/facilitator/UserCourses";
import PageHeader from "@/components/facilitator/PageHeader";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) {
  const { id } = params;
  const list = await getCourses();
  const { role } = searchParams;
  const user = await getUser(id, parseInt(role));

  return (
    <>
      <PageHeader />

      <div className="container page__container page__container page-section">
        <UserCourses courses={list} />
      </div>
    </>
  );
}
