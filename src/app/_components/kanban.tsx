"use client";

import { Badge } from "@/components/ui/badge";
import { api } from "@/trpc/react";
import ProjectCard from "./project-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { project } from "@/lib/validation";
import { Calendar, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Kanban() {
  const router = useRouter();
  const projects = api.project.all.useQuery({ limit: 10 });

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <main className="grid flex-1 grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-[minmax(200px,_1fr)_3fr]">
        {/* <ProjectDetailedCard id={2} /> */}
        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Cancelled</h3>
              <Badge variant="outline">
                {projects.data?.filter((e) => e.status === "cancelled").length}
              </Badge>
            </div>
            <div className="grid gap-4">
              {projects.data
                ?.filter((e) => e.status === "cancelled")
                .map((e) => <ProjectCard key={e.id} project={e} />)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">On Hold</h3>
              <Badge variant="outline">
                {projects.data?.filter((e) => e.status === "on_hold").length}
              </Badge>
            </div>
            <div className="grid gap-4">
              {projects.data
                ?.filter((e) => e.status === "on_hold")
                .map((e) => (
                  <Card
                    key={e.id}
                    className="transition-all hover:cursor-pointer hover:opacity-70"
                    onClick={() => router.push(`/projects/${e.id}`)}
                  >
                    <CardHeader>
                      <CardTitle className="w-64 truncate text-sm font-medium">
                        {e.name}
                      </CardTitle>
                      {project.description && (
                        <CardDescription className="w-64 truncate">
                          {project.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      {/* <div className="text-sm font-medium">{title}</div> */}
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span className="text-muted-foreground">
                          {/* {Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(due)} */}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4" />
                        <span className="text-muted-foreground">
                          Client: {e.client?.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
          <div className="rounded-lg bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Active</h3>
              <Badge variant="outline">
                {projects.data?.filter((e) => e.status === "active").length}
              </Badge>
            </div>
            <div className="grid gap-4">
              {projects.data
                ?.filter((e) => e.status === "active")
                .map((e) => (
                  <Card
                    key={e.id}
                    className="transition-all hover:cursor-pointer hover:opacity-70"
                    onClick={() => router.push(`/projects/${e.id}`)}
                  >
                    <CardHeader>
                      <CardTitle className="w-64 truncate text-sm font-medium">
                        {e.name}
                      </CardTitle>
                      {project.description && (
                        <CardDescription className="w-64 truncate">
                          {project.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      {/* <div className="text-sm font-medium">{title}</div> */}
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span className="text-muted-foreground">
                          {/* {Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(due)} */}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4" />
                        <span className="text-muted-foreground">
                          Client: {e.client?.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
          <div className="rounded-lg bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Completed</h3>
              <Badge variant="outline">
                {projects.data?.filter((e) => e.status === "completed").length}
              </Badge>
            </div>
            <div className="grid gap-4">
              {projects.data
                ?.filter((e) => e.status === "completed")
                .map((e) => (
                  <Card
                    key={e.id}
                    className="transition-all hover:cursor-pointer hover:opacity-70"
                    onClick={() => router.push(`/projects/${e.id}`)}
                  >
                    <CardHeader>
                      <CardTitle className="w-64 truncate text-sm font-medium">
                        {e.name}
                      </CardTitle>
                      {project.description && (
                        <CardDescription className="w-64 truncate">
                          {project.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      {/* <div className="text-sm font-medium">{title}</div> */}
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span className="text-muted-foreground">
                          {/* {Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(due)} */}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4" />
                        <span className="text-muted-foreground">
                          Client: {e.client?.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
