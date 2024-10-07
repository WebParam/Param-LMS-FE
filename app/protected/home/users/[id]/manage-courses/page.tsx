import { getCourses } from "@/app/lib/actions/course";
import UserCourses from "@/components/user/[id]/manage-courses/UserCourses";

const Page = async () => {
  const list = await getCourses();
  return (
    <>
      <UserCourses courses={list} />
    </>
  );
};

export default Page;
