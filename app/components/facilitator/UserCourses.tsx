"use client";
import { ICourse } from "@/app/interfaces/courses";
import UserCourse from "./UserCourse";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getUser } from "@/app/lib/data/users";

export default function UserCourses({ courses }: { courses: any }) {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");

  const [userCourses, setUserCourses] = useState([]);

  const coursesMap = courses.reduce((userCourses: any, course: any) => {
    userCourses[course.id] = course;
    return userCourses;
  }, {});

  const getCourses = async () => {
    const role = loggedInUser.role == "Facilitator" ? 1 : 0;
    const user = await getUser(loggedInUser.id, role);
    const userCourses = user.courseIds.map((id: string) => coursesMap[id]);

    setUserCourses(userCourses);
  };

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <>
      <div className="row card-group-row">
        {userCourses.length > 0 ? (
          userCourses.map((data: any) => (
            <UserCourse key={data.id} data={data} />
          ))
        ) : (
          <div className="card my-24pt w-100 text-center py-3">
            No Modules Available...
          </div>
        )}
      </div>
    </>
  );
}
