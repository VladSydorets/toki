import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";

export default function UserAvatar({ user }: { user: User }) {
  const { avatar, firstName, lastName } = user;

  function getInitials(firstName: string, lastName: string) {
    return firstName[0] + lastName[0];
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar className="w-9 h-9">
        <AvatarImage src={avatar || ""} alt="User Avatar" />
        <AvatarFallback className="bg-gray-100 dark:bg-gray-900">
          {getInitials(firstName || "", lastName || "")}
        </AvatarFallback>
      </Avatar>
      <p className="text-muted-foreground">{`${firstName} ${lastName}`}</p>
    </div>
  );
}
