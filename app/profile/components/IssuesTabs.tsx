import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusCardsWrapper from "./StatusCardsWrapper";

export default function IssuesTabs() {
  return (
    <Tabs defaultValue="assigned" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="assigned">Assigned Issues</TabsTrigger>
        <TabsTrigger value="reported">Reported Issues</TabsTrigger>
      </TabsList>
      <TabsContent value="assigned">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Issues</h2>
          <p className="text-base text-muted-foreground">
            Those are the issues assigned to you
          </p>
          <StatusCardsWrapper filterBy="assigned" />
        </div>
      </TabsContent>
      <TabsContent value="reported">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reported Issues</h2>
          <p className="text-base text-muted-foreground">
            Those are the issues reported by you
          </p>
          <StatusCardsWrapper filterBy="reported" />
        </div>
      </TabsContent>
    </Tabs>
  );
}
