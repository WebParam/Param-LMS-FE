import { getCourses } from "@/app/lib/actions/course";
import { getUser } from "@/app/lib/data/users";
import UserCourses from "@/components/user/[id]/manage-courses/UserCourses";

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
  const courseIds = user.courseIds || [];

  return (
    <>
      <UserCourses
        courses={list}
        userCourses={courseIds}
        userId={id}
        role={user.role}
      />
    </>
  );
}
