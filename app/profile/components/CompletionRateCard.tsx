import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Props {
  data: {
    totalIssues: number;
    completedIssues: number;
  };
}

export default function CompletionRateCard({ data }: Props) {
  const { totalIssues, completedIssues } = data;

  const descriptionString = `${completedIssues} of ${totalIssues} completed`;
  const completionRate = Math.round((completedIssues * 100) / totalIssues);

  return (
    <Card className="overflow-hidden col-span-1 sm:col-span-2">
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="space-y-1">
          <div className="text-sm font-medium">
            Completion rate {completionRate}%
          </div>
          <Progress value={completionRate} className="h-2" />
          <p className="text-sm text-muted-foreground">{descriptionString}</p>
        </div>
      </CardContent>
    </Card>
  );
}
