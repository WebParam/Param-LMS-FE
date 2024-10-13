"use client";
import { NextPage } from "next";
import TableRow from "./TableRow";
import { reOrderKnowledgeModule } from "@/app/lib/actions/knowledge-module";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useCallback, useEffect, useState } from "react";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  const [currentItems, setCurrentItems] = useState(list);

  const onDragEnd = useCallback(
    (result:any) => {
      if (!result.destination) return;
      const items = Array.from(currentItems);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setCurrentItems(items);

      const payload = {
        knowledgeModuleId: reorderedItem.id,
        courseId: reorderedItem.courseId,
        order: result.destination.index + 1,
      };
      handleReOrder(payload);
    },
    [currentItems]
  );

  useEffect(() => {
    setCurrentItems(list);
  }, [list]);

  const handleReOrder = async (payload:any) => {
    try {
      await reOrderKnowledgeModule(payload);
    } catch (error) {
      console.error("Reordering failed:", error);
    }
  };

  return (
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
                <Draggable key={data.id} draggableId={data.id} index={index}>
                  {(dragProvided) => (
                    <tr
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      className="selected"
                    >
                      <TableRow key={data.id} document={data} />
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
  );
};

export default TableBody;
