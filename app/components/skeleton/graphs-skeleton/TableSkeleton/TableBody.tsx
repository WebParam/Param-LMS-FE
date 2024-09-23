"use client";
import Link from "next/link";
import { NextPage } from "next";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import { usePathname, useSearchParams } from "next/navigation";
import SkeletonLoader from "@/components/skeleton/skeletonLoader";

const TableBody: NextPage<{ list: CourseApplicants[] }> = ({ list }) => {
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title") || "N/A";
  const pathname = usePathname();

  return (
    <>
      <tbody className="list" id="staff">
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
      </tbody>
    </>
  );
};

export default TableBody;
