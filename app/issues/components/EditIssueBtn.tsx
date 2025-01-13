import { Button } from "@/components/ui/button";
import Link from "next/link";

const EditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button variant="outline" className="bg-green-500 text-white">
      <Link href={`/issues/${issueId}/edit`}>Edit an issue</Link>
    </Button>
  );
};

export default EditButton;
