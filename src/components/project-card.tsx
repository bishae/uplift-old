import { Calendar, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useRouter } from "next/navigation";
import type { SelectCustomer, SelectProject } from "@/types";

type Project = {
  customer: SelectCustomer;
} & SelectProject;

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const router = useRouter();

  return (
    <Card
      key={project.id}
      className="transition-all hover:cursor-pointer hover:opacity-70"
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      <CardHeader>
        <CardTitle className="w-64 truncate text-sm font-medium">
          {project.name}
        </CardTitle>
        {project.description && (
          <CardDescription className="w-64 truncate">
            {project.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          <span className="text-muted-foreground">
            {project.dueDate
              ? Intl.DateTimeFormat("en-US", {
                  dateStyle: "long",
                }).format(new Date(project.dueDate))
              : "n/a"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4" />
          <span className="text-muted-foreground">
            Client: {project.customer.name ?? "n/a"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
