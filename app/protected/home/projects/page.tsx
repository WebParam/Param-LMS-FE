"use client";
import { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import Projects from "@/components/project/projects";
import Cookies from "universal-cookie";
import { getProjects } from "@/app/lib/actions/project";

const Page = () => {
  const [list, setList] = useState([]);
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");

  useEffect(() => {
    const fetchData = async () => {
      if (loggedInUser?.id) {
        const data = await getProjects(loggedInUser.id);
        setList(data);
        console.log(data.list)
        cookies.set("number-of-projects", data.length, { path: '/' });
      }
    };
    fetchData();
  }, [loggedInUser?.id]);

  return (
    <>
      <PageHeader />
      <div className="container page__container page-section">
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
        </div>
      </div>
    </>
  );
};

export default Page;
