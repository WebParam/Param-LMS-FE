"use client";
import { ICourse } from "@/app/interfaces/courses";
import UserCourse from "./UserCourse";

export default function UserCourses({
  courses,
  userCourses,
  userId,
  role,
}: {
  courses: ICourse[];
  userCourses: string[];
  userId: string;
  role: number;
}) {
  const userCoursesSet = new Set(userCourses);
  return (
    <>
      <div className="row card-group-row">
        {courses.length > 0 ? (
          courses.map((data) => (
            <UserCourse
              data={data}
              isChecked={userCoursesSet.has(data.id)}
              userId={userId}
              role={role}
            />
          ))
        ) : (
          <div className="card my-24pt text-center py-3">
            No Users Available...
          </div>
        )}
      </div>
    </>
  );
}
