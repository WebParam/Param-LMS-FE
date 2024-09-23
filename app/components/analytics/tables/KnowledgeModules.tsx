"use client";
import Module from "@/components/course/[id]/modules/Module";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { IUnitStandard } from "@/app/interfaces/unit-standard";
import { getModules } from "@/app/lib/actions/module";

interface KnowledgeModulesProps {
  path?: string;
}

function KnowledgeModules({ path }: KnowledgeModulesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 3;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [list, setList] = useState<IUnitStandard[]>([]);

  const courseId = "66433416a454f78732f274ba";

  const { studentId } = useParams<{
    studentId: string;
  }>();

  const currentItems =
    list && list.length > 0
      ? list.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const searchParams = useSearchParams();
  const title = searchParams.get("title")!;
  const refreshId = searchParams.get("refreshId");
  const studentName =  searchParams.get("studentName")! ?? "";
  const pathname = usePathname();
  const arrUrl = pathname.split("/");
  arrUrl.pop();

  const fetchModules = async () => {
    const modules = await getModules(courseId);
    setList(modules);
    console.log(modules);
  };

  useEffect(() => {
    fetchModules();
  }, [refreshId]);

  const modules = [
    {
      id: 1,
      title: "Introduction to the Course",
      description:
        "This module provides an overview of the course structure, objectives, and key learning outcomes. You'll get familiar with the topics that will be covered and understand what to expect throughout the course.",
    },
    {
      id: 2,
      title: "Fundamentals of the Subject",
      description:
        "In this module, you'll learn the basic concepts and foundational knowledge necessary for mastering the subject. Key terms, theories, and introductory practices will be discussed to set the groundwork for future learning.",
    },
    {
      id: 3,
      title: "Intermediate Concepts and Applications",
      description:
        "This module dives deeper into more complex topics, building on the basics covered previously. You'll explore practical applications, case studies, and real-world examples to enhance your understanding.",
    },
    {
      id: 4,
      title: "Advanced Techniques and Best Practices",
      description:
        "The final module covers advanced strategies, tips, and best practices. This section is designed to help you achieve mastery and apply your knowledge effectively in practical scenarios.",
    },
  ];
  
  return (
    <div className="px-2">
      {modules.length > 0 ? (
        modules.map((data) => {
          const url =
            path === "course"
              ? arrUrl.join("/") + `/course/${data.id}?title=${title}&module=${data.title}`
              : arrUrl.join("/") +
                `${studentId}/${data.id}?title=${title}&module=${data.title}&studentName=${studentName}`;

          return (
            <Module
              key={data.id}
              name={data.title}
              description={data.description}
              noOfDocuments={10}
              url={url}
            />
          );
        })
      ) : (
        <div className="card my-24pt text-center py-3">
          No Knowledge Modules Available...
        </div>
      )}
      <div className="card mb-24pt">
        <Pagination
          listLength={list?.length}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
      </div>
    </div>
  );
}

export default KnowledgeModules;
