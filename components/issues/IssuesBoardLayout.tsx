"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { getStatusColor, statusTextMap } from "@/app/issues/definitions";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Issue, IssueStatus } from "@prisma/client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Droppable from "./Droppable";
import EmptyCard from "./EmptyCard";
import IssueCard from "./IssueCard";

interface IssuesBoardLayoutProps {
  issues: Issue[];
}
type StatusKey = "TO_DO" | "IN_PROGRESS" | "COMPLETED";
type IssuesByStatus = {
  [key in StatusKey]: Issue[];
};

export default function IssuesBoardLayout({ issues }: IssuesBoardLayoutProps) {
  const [expandedColumns, setExpandedColumns] = useState<
    Record<StatusKey, boolean>
  >({
    TO_DO: false,
    IN_PROGRESS: false,
    COMPLETED: false,
  });
  const toggleExpand = (status: StatusKey) => {
    setExpandedColumns((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const statuses: StatusKey[] = ["TO_DO", "IN_PROGRESS", "COMPLETED"];
  const [issuesByStatus, setIssuesByStatus] = useState<IssuesByStatus>({
    TO_DO: issues.filter((i: Issue) => i.status === "TO_DO"),
    IN_PROGRESS: issues.filter((i: Issue) => i.status === "IN_PROGRESS"),
    COMPLETED: issues.filter((i: Issue) => i.status === "COMPLETED"),
  });

  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { delay: 250, distance: 3, tolerance: 10 },
    })
  );

  const droppableRefs = {
    TO_DO: useDroppable({ id: "TO_DO" }),
    IN_PROGRESS: useDroppable({ id: "IN_PROGRESS" }),
    COMPLETED: useDroppable({ id: "COMPLETED" }),
  };

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const issueId = active.id.toString();
    const found = Object.values(issuesByStatus)
      .flat()
      .find((issue: Issue) => issue.id.toString() === issueId);
    setActiveIssue(found || null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveIssue(null);

    if (!over) return;

    const issueId = active.id.toString();
    const sourceStatus = (Object.keys(issuesByStatus) as StatusKey[]).find(
      (status) =>
        issuesByStatus[status].some(
          (issue: Issue) => issue.id.toString() === issueId
        )
    );

    const destinationStatus = over.id as StatusKey;
    if (
      sourceStatus &&
      destinationStatus &&
      sourceStatus !== destinationStatus
    ) {
      const issue = issuesByStatus[sourceStatus].find(
        (i: Issue) => i.id.toString() === issueId
      );
      setIssuesByStatus((prev) => ({
        ...prev,
        [sourceStatus]: prev[sourceStatus].filter(
          (i: Issue) => i.id.toString() !== issueId
        ),
        [destinationStatus]: issue
          ? [issue, ...prev[destinationStatus]]
          : prev[destinationStatus],
      }));

      try {
        await fetch(`/api/issues/${issueId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: issueId, status: destinationStatus }),
        });
      } catch (error) {
        toast.error("Failed to update issue status");
        console.error("Failed to update issue status:", error);
      }
    }
  }

  function handleDragCancel() {
    setActiveIssue(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      autoScroll={{ layoutShiftCompensation: false }}
      modifiers={[restrictToWindowEdges]}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {statuses.map((status) => {
          const filteredIssues = issuesByStatus[status];
          const isExpanded = expandedColumns[status];
          const displayedIssues = isExpanded
            ? filteredIssues
            : filteredIssues.slice(0, 5);

          const { setNodeRef } = droppableRefs[status];

          return (
            <Droppable key={status} id={status} className="space-y-4">
              <h3 className="text-lg font-medium capitalize flex gap-2 items-center px-4">
                <Badge
                  className={
                    getStatusColor(status as IssueStatus) +
                    " text-xs rounded-full"
                  }
                >
                  {filteredIssues.length}
                </Badge>
                {statusTextMap[status]}
              </h3>
              <div
                ref={setNodeRef}
                className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-3 min-h-[120px]"
              >
                {filteredIssues.length > 0 ? (
                  <>
                    {displayedIssues.map((issue) => (
                      <DraggableIssueCard key={issue.id} issue={issue} />
                    ))}
                    {filteredIssues.length > 5 && (
                      <Button
                        variant="ghost"
                        className="w-full mt-2"
                        onClick={() => toggleExpand(status)}
                      >
                        {isExpanded
                          ? "Show Less"
                          : `Show ${filteredIssues.length - 5} More`}
                        <ChevronDown
                          className={`ml-2 h-4 w-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    )}
                  </>
                ) : (
                  <EmptyCard status={status} />
                )}
              </div>
            </Droppable>
          );
        })}
      </div>
      <DragOverlay>
        {activeIssue ? <IssueCard issue={activeIssue} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

// Draggable wrapper for IssueCard
function DraggableIssueCard({ issue }: { issue: Issue }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: issue.id.toString(),
    });
  if (isDragging) return null;
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        cursor: "grab",
      }}
    >
      <IssueCard issue={issue} />
    </div>
  );
}
