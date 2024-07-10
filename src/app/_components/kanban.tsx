"use client";

import { Badge } from "@/components/ui/badge";
import { api } from "@/trpc/react";
import ProjectCard from "./project-card";
import ProjectDetailedCard from "./project-detailed-card";

export default function Kanban() {
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
                .map((e) => (
                  <ProjectCard
                    key={e.id}
                    id={e.id}
                    name={e.name ?? ""}
                    description={e.description}
                    due={new Date("10-6-2024")}
                    client="John Doe"
                  />
                ))}
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
                  <ProjectCard
                    key={e.id}
                    id={e.id}
                    name={e.name ?? ""}
                    description={e.description}
                    due={new Date("10-6-2024")}
                    client="John Doe"
                  />
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
                  <ProjectCard
                    key={e.id}
                    id={e.id}
                    name={e.name ?? ""}
                    description={e.description}
                    due={new Date("10-6-2024")}
                    client="John Doe"
                  />
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
                  <ProjectCard
                    key={e.id}
                    id={e.id}
                    name={e.name ?? ""}
                    description={e.description}
                    due={new Date("10-6-2024")}
                    client="John Doe"
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
