import { getCourses } from "@/app/lib/actions/course";
import PageHeader from "./PageHeader";
import Projects from "@/components/project/projects";
import { getProjects } from "@/app/lib/actions/project";

const Page = async () => {
    const adminId = "A455A258A35F449203A71A25";
  const list = await getProjects(adminId);
    //const list = await getCourses();
  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
        <div className="card mb-0">
          <div
            data-aos="fade-up"
            className="table-responsive"
            data-toggle="lists"
            data-lists-sort-by="js-lists-values-employee-name"
            data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
          >
            <Projects list={list} />
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default Page;
