"use client";

import CreateProjectForm from "@/app/_components/create-project-form";
import Kanban from "@/app/_components/kanban";

export default function Dashboard() {
  return (
    <main>
      <div className="flex items-center justify-between space-y-2 px-8 py-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <CreateProjectForm />
        </div>
      </div>
      <Kanban />
    </main>
  );
}
