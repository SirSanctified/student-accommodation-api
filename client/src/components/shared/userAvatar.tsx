import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types";

export function UserAvatar({ user }: { user: User }) {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>
        {user.first_name
          ? user.first_name[0]?.toUpperCase()
          : user.email[0]?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
