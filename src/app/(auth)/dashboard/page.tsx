"use client";

import CreateProjectForm from "@/app/_components/create-project-form";
import Kanban from "@/app/_components/kanban";
import { api } from "@/trpc/react";

export default function Dashboard() {
  const projects = api.project.all.useQuery({ limit: 10 });

  return (
    <main>
      <Kanban />
      {/* <h2 className="text-2xl">Dashboard</h2>
      <h3 className="text-xl">Projects</h3>
      <CreateProjectForm />
      {projects.data?.map((project) => (
        <div
          key={project.id}
          className="text-sm hover:cursor-pointer hover:underline"
        >
          {project.name} - {project.status}
        </div>
      ))} */}
    </main>
  );
}
