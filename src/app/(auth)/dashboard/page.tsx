"use client";

import CreateProjectForm from "@/app/_components/create-project-form";
import Kanban from "@/app/_components/kanban";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main>
      <div className="flex items-center justify-between space-y-2 px-8 py-4">
        {/* <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2> */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {/* <BreadcrumbSeparator /> */}
            {/* <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator /> */}
            {/* <BreadcrumbItem>
              <BreadcrumbPage>Gig</BreadcrumbPage>
            </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center space-x-2">
          <CreateProjectForm />
        </div>
      </div>
      <Kanban />
    </main>
  );
}
