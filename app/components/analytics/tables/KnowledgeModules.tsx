"use client";
import Module from "@/components/course/[id]/modules/Module";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { IUnitStandard } from "@/app/interfaces/unit-standard";
import { getKnowledgeModules, getModules } from "@/app/lib/actions/module";

interface KnowledgeModulesProps {
  path?: string;
  courseId?: string
}

function KnowledgeModules({ courseId,  path  }: KnowledgeModulesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [list, setList] = useState<IUnitStandard[]>([]);
  const pathname = usePathname();
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
  const arrUrl = pathname.split("/");
  arrUrl.pop();

  const fetchModules = async () => {
    const modules = await getKnowledgeModules(courseId!);
    setList(modules);
  };

  useEffect(() => {
    fetchModules();
  }, [refreshId]);

  
  return (
    <div className="px-2">
      {list.length > 0 ? (
        list.map((data) => {
          const url =
            path === "course"
              ? arrUrl.join("/") + `/course/${data.id}?title=${title}&module=${data.title}`
              :  path === "assignments" ?
              
              arrUrl.join("/") +
                `/modules/${data.id}/?title=${title}&module=${data.title}`
              
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
