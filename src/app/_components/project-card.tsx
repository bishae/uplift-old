import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Project } from "@/types";
import { Calendar, User } from "lucide-react";

export default function ProjectCard({
  name,
  description,
  due,
  client,
}: Project) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="w-64 truncate text-sm font-medium">
          {name}
        </CardTitle>
        {description && (
          <CardDescription className="w-64 truncate">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="grid gap-2">
        {/* <div className="text-sm font-medium">{title}</div> */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          <span className="text-muted-foreground">
            {Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(due)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4" />
          <span className="text-muted-foreground">Client: {client}</span>
        </div>
      </CardContent>
    </Card>
  );
}
