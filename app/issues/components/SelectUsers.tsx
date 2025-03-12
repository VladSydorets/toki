import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Control, Controller, FieldValues } from "react-hook-form";
import { User } from "@prisma/client";

interface SelectUsersProps {
  control: Control<FieldValues>;
  users: User[];
  defaultValue: number | null;
}

export default function SelectUsers({
  control,
  users,
  defaultValue,
}: SelectUsersProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="assignedToId">Assigned To:</Label>
      <Controller
        name="assignedToId"
        control={control}
        defaultValue={defaultValue ?? null}
        render={({ field }) => (
          <Select
            value={!field.value ? "unassigned" : String(field.value)}
            onValueChange={(value) =>
              field.onChange(
                value === "unassigned" ? null : parseInt(value, 10)
              )
            }
          >
            <SelectTrigger id="assignedToId">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {users.map((user) => (
                <SelectItem
                  key={user.id}
                  value={user.id.toString()}
                >{`${user.firstName} ${user.lastName}`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
