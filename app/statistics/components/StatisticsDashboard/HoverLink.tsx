import { CalendarIcon } from "lucide-react";
import Link from "next/link";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Props {
  data: {
    id: number;
    title: string;
    description: string | null;
    createdAt: Date;
  };
}

export default function HoverLink({ data }: Props) {
  const { id, title, description, createdAt } = data;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/issues/${id}`} className="hover:underline">
          {title}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
