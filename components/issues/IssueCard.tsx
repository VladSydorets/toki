"use client";

import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  getStatusColor,
  getTypeColor,
  typeTextMap,
} from "@/app/issues/definitions";
import { Issue } from "@prisma/client";
import CreatedAt from "../CreatedAt";
import BadgeWrapper from "../utility/BadgeWrapper";
import { motion } from "motion/react";

interface IssueCardProps {
  issue: Issue;
  isCondensed?: boolean;
  layout?: "board" | "grid" | "list";
}

export default function IssueCard({
  issue,
  isCondensed,
  layout,
}: IssueCardProps) {
  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        transition: { duration: 0.2 },
      }}
      transition={{
        type: "spring",
        bounce: 0.75,
        stiffness: 300,
        damping: 25,
      }}
    >
      <Link
        href={`/issues/${issue.id}`}
        className="flex flex-col w-full h-full"
      >
        <Card className="overflow-hidden transition-all duration-200 border-t-0 hover:shadow-md hover:border-gray-400 dark:hover:border-gray-500 hover:bg-slate-100 dark:hover:bg-slate-900 h-full">
          <div className={`h-1 w-full ${getStatusColor(issue.status)}`}></div>
          <div
            className={`flex flex-col relative px-3 ${
              layout === "list" ? "py-4" : "pt-8 pb-4"
            } cursor-pointer h-full`}
          >
            {layout !== "list" && (
              <span
                className={`${getTypeColor(
                  issue.type
                )} rounded-full h-3 w-3 absolute top-3 left-3`}
                title={typeTextMap[issue.type]}
              ></span>
            )}
            <CardHeader className="p-0 mb-2 text-left">
              <CardTitle className="text-base font-medium line-clamp-1">
                <span className="text-muted-foreground mr-1">#{issue.id}</span>
                {issue.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-4 justify-between items-start h-full">
              {!isCondensed && (
                <p className="text-sm text-muted-foreground text-left line-clamp-2">
                  {issue.description || "No description"}
                </p>
              )}
              <div className="flex gap-2 items-center w-full self-end">
                <BadgeWrapper
                  type="priority"
                  value={issue.priority}
                  variant="uppercase"
                />
                {layout === "list" && (
                  <BadgeWrapper
                    type="type"
                    value={issue.type}
                    variant="uppercase"
                  />
                )}
                <CreatedAt createdAt={issue.createdAt} className="ml-auto" />
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
