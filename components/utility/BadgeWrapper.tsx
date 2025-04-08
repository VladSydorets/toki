import {
  getPriorityColor,
  getStatusColor,
  getTypeColor,
  priorityTextMap,
  statusTextMap,
  typeTextMap,
} from "@/app/issues/definitions";
import { cn } from "@/lib/utils";
import { IssuePriority, IssueStatus, IssueType } from "@prisma/client";

import { Badge } from "../ui/badge";

type BadgeType = "priority" | "status" | "type";
type BadgeVariant = "default" | "outline" | "uppercase";

interface BadgeWrapperProps {
  type: BadgeType;
  value: string;
  variant?: BadgeVariant;
  className?: string;
}

export default function BadgeWrapper({
  type,
  value,
  variant = "default",
  className,
}: BadgeWrapperProps) {
  const getTextAndColor = () => {
    switch (type) {
      case "priority":
        return {
          text: priorityTextMap[value as IssuePriority],
          color: getPriorityColor(value as IssuePriority),
        };
      case "status":
        return {
          text: statusTextMap[value as IssueStatus],
          color: getStatusColor(value as IssueStatus),
        };
      case "type":
        return {
          text: typeTextMap[value as IssueType],
          color: getTypeColor(value as IssueType),
        };
      default:
        return { text: value, color: "bg-gray-500 text-white" };
    }
  };

  const { text, color } = getTextAndColor();
  const defaultStyles =
    "pointer-events-none text-xs text-black font-normal rounded-full";
  const variantStyles = {
    default: color,
    outline:
      "text-gray-500 text-foreground bg-transparent border-gray-800 dark:text-white hover:bg-transparent py-1",
    uppercase: cn("text-white pointer-events-none uppercase", color),
  };

  const badgeStyles = cn(defaultStyles, variantStyles[variant], className);

  return <Badge className={badgeStyles}>{text}</Badge>;
}
