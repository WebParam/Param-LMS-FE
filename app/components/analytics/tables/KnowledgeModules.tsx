"use client";
import Module from "@/components/course/[id]/modules/Module";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { IUnitStandard } from "@/app/interfaces/unit-standard";
import { getModules } from "@/app/lib/actions/module";
import { descriptors } from "chart.js/dist/core/core.defaults";

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
    { id: 1,
      title: "Course Overview",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quibusdam recusandae voluptatem veniam! Ab ducimus excepturi iusto odit, illo asperiores modi repudiandae fugit rerum praesentium dolor tenetur, aspernatur architecto recusandae.",
    },
    {
      id: 2,
      title: "Course Overview",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quibusdam recusandae voluptatem veniam! Ab ducimus excepturi iusto odit, illo asperiores modi repudiandae fugit rerum praesentium dolor tenetur, aspernatur architecto recusandae.",
    },
    {
      id: 3,
      title: "Course Overview",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quibusdam recusandae voluptatem veniam! Ab ducimus excepturi iusto odit, illo asperiores modi repudiandae fugit rerum praesentium dolor tenetur, aspernatur architecto recusandae.",
    },
    {
      id: 4,
      title: "Course Overview",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quibusdam recusandae voluptatem veniam! Ab ducimus excepturi iusto odit, illo asperiores modi repudiandae fugit rerum praesentium dolor tenetur, aspernatur architecto recusandae.",
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
