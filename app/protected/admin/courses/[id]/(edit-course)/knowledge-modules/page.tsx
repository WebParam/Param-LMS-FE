"use client";
import Module from "@/components/course/[id]/knowledge-modules/Module";
import { useEffect, useState, useCallback } from "react";
import Pagination from "@/components/Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getKnowledgeModules,
  reOrderKnowledgeModule,
} from "@/app/lib/actions/knowledge-module";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Page({ params }: { params: { id: string } }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 4;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [list, setList] = useState<any[]>([]);
  const [isGragged, setIsGragged] = useState(false);

  const currentItems =
    list && list.length > 0
      ? list.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const moduleTitle = searchParams.get("moduleTitle");
  const refreshId = searchParams.get("refreshId");
  const pathname = usePathname();
  const arrUrl = pathname.split("/");
  arrUrl.pop();

  const fetchModules = async () => {
    const modules = await getKnowledgeModules(params.id);
    setList(modules);
  };

  useEffect(() => {
    fetchModules();
  }, [refreshId]);

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return;
      const items = Array.from(list);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setList(items);

      const payload = {
        knowledgeModuleId: reorderedItem.id,
        courseId: params.id,
        order: result.destination.index + 1,
      };
      handleReOrder(payload)
    },
    [list]
  );

  const handleReOrder = async (payload: any) => {
    setIsGragged(true);
    try {
      const reOrderModule = await reOrderKnowledgeModule(payload);
      setList(reOrderModule);
      setIsGragged(false)
    } catch (error) {
      console.error(error);
      setIsGragged(false)
    }
  };

  return (
    <>
      <div className="my-3"></div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="modules">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {currentItems.length > 0 ? (
                currentItems.map((data, index) => (
                  <Draggable isDragDisabled={isGragged} key={data.id} draggableId={data.id} index={index}>
                    {(dragProvided) => (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                      >
                        <Module
                          id={data.id}
                          name={data.title}
                          moduleCode={data.moduleCode}
                          description={data.description}
                          url={
                            arrUrl.join("/") +
                            `/knowledge-modules/${data.id}/knowledge-topics?title=${title}&moduleTitle=${data.title}`
                          }
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <div className="card my-24pt text-center py-3">
                  No Knowledge Modules Available...
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="card mb-24pt">
        <Pagination
          listLength={list?.length}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
      </div>
    </>
  );
}
