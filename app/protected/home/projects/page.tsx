"use client"
import { getProjects } from "@/app/lib/actions/getProject";
import PageHeader from "./PageHeader";
import Projects from "@/components/project/projects";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
const Page = () => {

  const [list, setList] = useState<any[]>([])
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId")!;

  const fetchProjects = async () => {
    try {
      const projects = await getProjects();
      setList(projects);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [refreshId]);

  return (
    <>
      <PageHeader length = {list.length} />
      <div className="container page__container page__container page-section">
        <div className="card mb-0">
          <div
            data-aos="fade-up"
            className="table-responsive"
            data-toggle="lists"
            data-lists-sort-by="js-lists-values-employee-name"
            data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
          >
            <Projects data = {list}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
