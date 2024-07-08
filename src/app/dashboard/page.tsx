"use client";

import { api } from "@/trpc/react";
import CreateProjectForm from "../_components/create-project-form";

export default function Dashboard() {
  const projects = api.project.all.useQuery({ limit: 10 });

  return (
    <main>
      <h2 className="text-2xl">Dashboard</h2>
      <h3 className="text-xl">Projects</h3>
      <CreateProjectForm />
      {projects.data?.map((project) => (
        <div
          key={project.id}
          className="text-sm hover:cursor-pointer hover:underline"
        >
          {project.name} - {project.status}
        </div>
      ))}
    </main>
  );
}
