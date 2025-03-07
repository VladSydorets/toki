import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  description: string | React.ReactNode;
  icon?: React.ReactNode;
}

export default function StatisticsCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
