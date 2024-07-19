"use client";

import CreateProjectDialogForm from "@/components/create-project-dialog-form";
import ProjectCard from "@/components/project-card";
import StatusContainer from "@/components/status-container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { projectStatusEnum } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { Calendar, User } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const projects = api.project.many.useQuery({ limit: 10 });

  return (
    <main>
      <div className="flex items-center justify-between space-y-2 px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center space-x-2">
          <CreateProjectDialogForm />
        </div>
      </div>
      <div className="flex min-h-screen flex-col bg-muted/40">
        <div className="grid flex-1 grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-[minmax(200px,_1fr)_3fr]">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Ttile</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="text-sm text-muted-foreground">Description</div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span className="text-muted-foreground">
                    Due Date:{" "}
                    {Intl.DateTimeFormat("en-US", {
                      dateStyle: "long",
                    }).format(new Date())}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="text-muted-foreground">Client: n/a</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cost Management</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Budget</span>
                    <span>
                      {Intl.NumberFormat("en-US", {
                        currency: "USD",
                        style: "currency",
                      }).format(0)}
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Expenses</span>
                    <span>
                      {Intl.NumberFormat("en-US", {
                        currency: "USD",
                        style: "currency",
                      }).format(0)}
                    </span>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Remaining</span>
                    <span>
                      {Intl.NumberFormat("en-US", {
                        currency: "USD",
                        style: "currency",
                      }).format(0)}
                    </span>
                  </div>

                  <Progress value={0} />
                </div>
                <Button size="sm">Button</Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {projectStatusEnum.enumValues
              .filter((status) => status !== "cancelled")
              .map((status) => (
                <StatusContainer
                  key={status}
                  title={status}
                  count={
                    projects.data?.filter((e) => e.status === status).length ??
                    0
                  }
                >
                  {projects.data
                    ?.filter((e) => e.status === status)
                    .map((e) => <ProjectCard key={e.id} project={e} />)}
                </StatusContainer>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
