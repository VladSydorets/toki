import {
  getStatusColor,
  getStatusIcon,
  statusTextMap,
} from "@/app/issues/definitions";
import { Card, CardContent } from "@/components/ui/card";
import { IssueStatus } from "@prisma/client";

interface Props {
  data: {
    value: number;
    status: IssueStatus;
  };
}

export default function StatusCard({ data }: Props) {
  const { value, status } = data;
  const StatusIcon = getStatusIcon(status);

  return (
    <Card className="overflow-hidden">
      <div className={`h-1 w-full ${getStatusColor(status)}`}></div>
      <CardContent className="flex items-center gap-4 p-6 pr-2">
        <div className={`rounded-full ${getStatusColor(status)} p-2`}>
          <StatusIcon className="text-white h-6 w-6" />
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-sm text-muted-foreground">
            {statusTextMap[status]}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
