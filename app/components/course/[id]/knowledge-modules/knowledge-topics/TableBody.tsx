"use client";
import { NextPage } from "next";
import TableRow from "./TableRow";
import { reOrderKnowledgeModule } from "@/app/lib/actions/knowledge-module";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useCallback } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditKnowledgeTopicModal from "./EditKnowledgeTopicModal";
import DeleteKnowledgeTopicModal from "./DeleteKnowledgeTopicModal";
import {
  getKnowledgeTopic,
  reOrderKnowledgeTopic,
} from "@/app/lib/actions/knowledge-topic";
import { getCourse } from "@/app/lib/actions/course";
import { getKnowledgeModule } from "@/app/lib/actions/knowledge-module";
import { getKnowledgeElements } from "@/app/lib/actions/topic-elements";
import { post } from "@/app/lib/utils";
import { wGenerateVideoScriptUrl } from "@/app/lib/actions/endpoints";

type IKnowledgeTopic = {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  order: number;
  name: string;
  description: string;
  moduleId: string;
  topicCode: string;
  isGenerated: boolean;
  lengthOfVideoScript: number;
};

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  const [currentItems, setCurrentItems] = useState(list);
  const searchParams = useSearchParams();
  const router = useRouter();
  const title = searchParams.get("title") || "";
  const moduleTitle = searchParams.get("moduleTitle") || "";
  const pathname = usePathname();
  const [document, setDocument] = useState<IKnowledgeTopic>();

  const refreshId = searchParams.get("refreshId") || "";
  const [isEditModal, setIsEditModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProgress, setIsProgress] = useState(false);
  const [isTryAgain, setIsTryAgain] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isGragged, setIsGragged] = useState(false);

  const [isGenerated, setIsGenerated] = useState(false);

  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const url = arrUrl.join("/");
  const { id: courseId, moduleId } = useParams<{
    id: string;
    moduleId: string;
    topicId: string;
  }>();

  useEffect(() => {
    setIsEditModal(false);
  }, [refreshId]);

  const generateVideoScriptWithProgress = async (data: IKnowledgeTopic) => {
    try {
      const [course, module, topic, topicElements] = await Promise.all([
        getCourse(courseId),
        getKnowledgeModule(moduleId),
        getKnowledgeTopic(data?.id!),
        getKnowledgeElements(data?.id!),
      ]);

      const acc = Math.floor(100 / topicElements.length);
      let total = 0;
      for (const element of topicElements) {
        const body = {
          moduleTitle: module.title,
          moduleDescription: module.description,
          topicTitle: topic.name,
          topicId: topic.id,
          topicDescription: topic.description,
          lengthOfVideoScript: topic.lengthOfVideoScript,
          tone: course.videoScriptTone,
          elementTitle: element.title,
          elementCode: element.elementCode,
          elementId: element.id,
        };

        await post(
          `${wGenerateVideoScriptUrl}/topicElement/generateUpdateSingle`,
          body
        );
        total += acc;
        setProgress(total);
      }

      setTimeout(() => {
        setIsProgress(false);
        setIsGenerated(true);
      }, 5000);
    } catch (err) {
      setIsTryAgain(true);
      console.error(err);
    }
  };

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return;
      const items = Array.from(currentItems);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      const payload = {
        topicId: reorderedItem.id,
        knowledgeModuleId: reorderedItem.moduleId,
        order: result.destination.index + 1,
      };
      setCurrentItems(items);
      handleReOrder(payload);
    },
    [currentItems]
  );

  useEffect(() => {
    setCurrentItems(list);
  }, [list]);

  const handleReOrder = async (payload: any) => {
    setIsGragged(true);
    try {
      const orderTopicElements = await reOrderKnowledgeTopic(payload);
      if (orderTopicElements.length > 0) {
        setIsGragged(false);
        setCurrentItems(orderTopicElements);
      }
    } catch (error) {
      setIsGragged(false);

      console.error("Reordering failed:", error);
    }
  };

  return (
    <>
      <EditKnowledgeTopicModal
        documentName={document?.name}
        documentId={document?.id}
        data={document}
        show={isEditModal}
        onHide={() => setIsEditModal(false)}
      />

      <DeleteKnowledgeTopicModal
        id={document?.id}
        url={url}
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="modules">
          {(provided) => (
            <tbody
              className="list"
              id="staff"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {currentItems.length > 0 ? (
                currentItems.map((data, index) => (
                  <Draggable
                    isDragDisabled={isGragged}
                    key={data.id}
                    draggableId={data.id}
                    index={index}
                  >
                    {(dragProvided) => (
                      <tr
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        className="selected"
                      >
                        <td style={{ width: "250px" }} className="py-0">
                          <div className="d-flex align-items-center justify-content-center">
                            <p
                              className="text-center my-2"
                              style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                width: "250px",
                              }}
                            >
                              {data.topicCode}
                            </p>
                          </div>
                        </td>
                        <td style={{ width: "300px" }} className="py-0">
                          <p
                            className="text-center my-2"
                            style={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              width: "300px",
                            }}
                          >
                            {data.name}
                          </p>
                        </td>
                        <td style={{ width: "400px" }} className="py-0">
                          <div className="text-center my-2 w-100">
                            {isProgress && document?.id! === data.id ? (
                              <button
                                style={{ width: "185px" }}
                                type="button"
                                className="btn btn-outline-success btn-sm rounded-pill py-1 px-3 w-100"
                              >
                                <div className="progress-container w-100 my-1">
                                  <div className="progress-bar w-100">
                                    <div
                                      className="progress-bar-fill"
                                      style={{
                                        width: `${progress}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </button>
                            ) : (
                              <button
                                style={{ width: "185px" }}
                                type="button"
                                onClick={(e) => {
                                  try {
                                    e.preventDefault();
                                    setDocument(data);

                                    setIsProgress(true);
                                    generateVideoScriptWithProgress(data);
                                  } catch (e: any) {
                                    console.log(
                                      "Error Generating Video Script"
                                    );
                                  }
                                }}
                                className="btn btn-outline-success btn-sm rounded-pill py-1 px-3 w-100"
                              >
                                {isTryAgain
                                  ? "Network Error: Try Again"
                                  : data.isGenerated ||
                                    (document?.id! === data.id && isGenerated)
                                  ? "Regenerate"
                                  : "Generate Video Script"}
                              </button>
                            )}
                            {isTryAgain}
                          </div>
                        </td>
                        <td style={{ width: "700px" }} className="py-0">
                          <div className="d-flex justify-content-center">
                            <Link
                              href="#"
                              onClick={() => {
                                setIsEditModal(true);
                                setDocument(data);
                              }}
                            >
                              <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                                edit
                              </i>
                            </Link>
                            <Link
                              className=""
                              prefetch={true}
                              href={`${url}/knowledge-topic/${data.id}/topic-elements?title=${title}&moduleTitle=${moduleTitle}&topicTitle=${data.name}`}
                            >
                              <i
                                onClick={() => setDocument(data)}
                                className="material-icons icon-holder--outline-success rounded-lg mr-8pt"
                              >
                                visibility
                              </i>
                            </Link>
                            <Link
                              href="#"
                              type="button"
                              onClick={() => setDeleteModal(true)}
                            >
                              <i
                                onClick={() => setDocument(data)}
                                className="material-icons icon-holder--outline-success rounded-lg mr-8pt"
                              >
                                delete
                              </i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))
              ) : (
                <tr>
                  <td colSpan={100} className="text-center py-3">
                    No Knowledge Topic Available...
                  </td>
                </tr>
              )}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TableBody;
