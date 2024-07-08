"use client";

import CreateProjectForm from "@/app/_components/create-project-form";
import ProjectCard from "@/app/_components/project-card";
import ProjectDetailedCard from "@/app/_components/project-detailed-card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/trpc/react";

export default function Project({ params }: { params: { id: string } }) {
  const projects = api.project.all.useQuery({ limit: 10 });
  const project = api.project.one.useQuery({ id: parseInt(params.id) });

  return (
    <>
      <div className="flex items-center justify-between space-y-2 px-8 py-4">
        <h2 className="text-3xl font-bold tracking-tight">
          {project.data?.name}
        </h2>
        <div className="flex items-center space-x-2">
          <CreateProjectForm />
        </div>
      </div>

      <div className="flex min-h-screen flex-col bg-muted/40">
        <main className="grid flex-1 grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-[minmax(200px,_1fr)_3fr]">
          <ProjectDetailedCard id={2} />
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-background p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">Todo</h3>
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
                <h3 className="text-lg font-medium">In Porgress</h3>
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
                <h3 className="text-lg font-medium">Done</h3>
                <Badge variant="outline">
                  {
                    projects.data?.filter((e) => e.status === "completed")
                      .length
                  }
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
    </>
  );
}
