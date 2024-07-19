"use client";

import BriefTaskCard from "@/components/brief-task-card";
import CreateExpenseDialogForm from "@/components/create-expense-dialog-form";
import CreateTaskDialogForm from "@/components/create-task-dialog-form";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import UpdateProjectDialogForm from "@/components/update-project-dialog-form";
import { api } from "@/trpc/react";
import { Calendar, User } from "lucide-react";
import Link from "next/link";

export default function Project({ params }: { params: { id: string } }) {
  const tasks = api.task.all.useQuery({
    projectId: parseInt(params.id),
    limit: 10,
  });

  const project = api.project.one.useQuery({ id: parseInt(params.id) });

  if (project.isLoading) return <p>Loading...</p>;

  if (!project.data) return <p>No data...</p>;

  if (!tasks.data) return <p>Loading...</p>;

  return (
    <main>
      <div className="flex items-center justify-between space-y-2 px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Gig</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center space-x-2">
          <CreateTaskDialogForm projectId={project.data?.id ?? 0} />
        </div>
      </div>

      <div className="flex min-h-screen flex-col bg-muted/40">
        <main className="grid flex-1 grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-[minmax(200px,_1fr)_3fr]">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center justify-between">
                    <span>{project.data.name}</span>
                    <UpdateProjectDialogForm project={project.data} />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="text-sm text-muted-foreground">
                  {project.data.description}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span className="text-muted-foreground">
                    Due Date: June 30, 2023
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="text-muted-foreground">
                    Client: {project.data.customer?.name ?? "n/a"}
                  </span>
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
                      }).format(parseFloat(project.data.budget ?? "0.00"))}
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
                      }).format(parseFloat(project.data.expense ?? "0.00"))}
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
                      }).format(
                        parseFloat(project.data.budget ?? "0.00") -
                          parseFloat(project.data.expense ?? "0.00"),
                      )}
                    </span>
                  </div>

                  <Progress
                    value={Math.abs(
                      ((parseFloat(project.data.expense ?? "0.00") -
                        parseFloat(project.data.budget ?? "0.00")) /
                        parseFloat(project.data.budget ?? "0.00")) *
                        100,
                    )}
                  />
                </div>
                <CreateExpenseDialogForm projectId={parseInt(params.id)} />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-background p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">Todo</h3>
                <Badge variant="outline">
                  {tasks.data?.filter((e) => e.status === "todo").length}
                </Badge>
              </div>
              <div className="grid gap-4">
                {tasks.data
                  .filter((e) => e.status === "todo")
                  .map((e) => (
                    <BriefTaskCard key={e.id} task={e} />
                  ))}
              </div>
            </div>
            <div className="rounded-lg bg-background p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">In Porgress</h3>
                <Badge variant="outline">
                  {tasks.data?.filter((e) => e.status === "in_progress").length}
                </Badge>
              </div>
              <div className="grid gap-4">
                {tasks.data
                  .filter((e) => e.status === "in_progress")
                  .map((e) => (
                    <BriefTaskCard key={e.id} task={e} />
                  ))}
              </div>
            </div>
            <div className="rounded-lg bg-background p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">Done</h3>
                <Badge variant="outline">
                  {tasks.data?.filter((e) => e.status === "done").length}
                </Badge>
              </div>
              <div className="grid gap-4">
                {tasks.data
                  .filter((e) => e.status === "done")
                  .map((e) => (
                    <BriefTaskCard key={e.id} task={e} />
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}
