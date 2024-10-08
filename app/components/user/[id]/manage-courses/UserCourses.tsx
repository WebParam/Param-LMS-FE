"use client";
import { ICourse } from "@/app/interfaces/courses";
import UserCourse from "./UserCourse";

export default function UserCourses({ courses }: { courses: ICourse[] }) {
  return (
    <>
      <div className="row card-group-row">
        {courses.length > 0 ? (
          courses.map((data) => <UserCourse data={data} />)
        ) : (
          <div className="card my-24pt text-center py-3">
            No Users Available...
          </div>
        )}
      </div>
    </>
  );
}
