import { getCourses } from "@/app/lib/actions/course";
import PageHeader from "./PageHeader";
import Courses from "@/components/course/Courses";
import Link from "next/link";

const Page = async () => {
  const list = await getCourses();

  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
        <div className="card mb-0">
          <div data-aos="fade-up" className="table-responsive">
            <Courses list={list} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
