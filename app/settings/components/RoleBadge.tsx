import { Briefcase, Shield, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Role = "ADMIN" | "EMPLOYEE" | "MANAGER";

interface RoleBadgeProps {
  role: Role;
  className?: string;
}

export default function RoleBadge({ role, className }: RoleBadgeProps) {
  const defaultStyles =
    "pointer-events-none rounded-full border px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1 " +
    "bg-white border-gray-300 text-gray-900 " +
    "dark:bg-slate-900 dark:border-gray-200 dark:text-gray-100";
  const roleIcons = {
    ADMIN: <Shield className="h-4 w-4" />,
    EMPLOYEE: <User className="h-4 w-4" />,
    MANAGER: <Briefcase className="h-4 w-4" />,
  };

  const badgeStyles = cn(defaultStyles, className);

  const formattedRole =
    role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

  return (
    <Badge className={badgeStyles}>
      {roleIcons[role]}
      {formattedRole}
    </Badge>
  );
}
