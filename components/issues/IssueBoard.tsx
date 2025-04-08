"use client";

import { Kanban, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

import { Issue } from "@prisma/client";

import { Button } from "../ui/button";
import IssuesBoardLayout from "./IssuesBoardLayout";
import IssuesGridLayout from "./IssuesGridLayout";
import IssuesListLayout from "./IssuesListLayout";

interface IssueBoardProps {
  issues: Issue[];
}

export default function IssueBoard({ issues }: IssueBoardProps) {
  const [layout, setLayout] = useState<"board" | "grid" | "list">("board");

  return (
    <div className="py-4">
      <div className="flex gap-2 mb-4 justify-end">
        <Button
          onClick={() => setLayout("board")}
          variant={layout === "board" ? "default" : "outline"}
        >
          <Kanban />
        </Button>
        <Button
          onClick={() => setLayout("grid")}
          variant={layout === "grid" ? "default" : "outline"}
        >
          <LayoutGrid />
        </Button>
        <Button
          onClick={() => setLayout("list")}
          variant={layout === "list" ? "default" : "outline"}
        >
          <List />
        </Button>
      </div>

      {layout === "board" && <IssuesBoardLayout issues={issues} />}
      {layout === "grid" && <IssuesGridLayout issues={issues} />}
      {layout === "list" && <IssuesListLayout issues={issues} />}
    </div>
  );
}
