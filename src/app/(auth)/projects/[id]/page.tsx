"use client";

import CreateTaskForm from "@/app/_components/create-task-form";
import ProjectCard from "@/app/_components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { api } from "@/trpc/react";
import { Calendar, User } from "lucide-react";

export default function Project({ params }: { params: { id: string } }) {
  const tasks = api.task.all.useQuery({
    projectId: parseInt(params.id),
    limit: 10,
  });
  const project = api.project.one.useQuery({ id: parseInt(params.id) });

  return (
    <>
      <div className="flex items-center justify-between space-y-2 px-8 py-4">
        <h2 className="text-3xl tracking-tight">Gig: {project.data?.name}</h2>
        <div className="flex items-center space-x-2">
          <CreateTaskForm projectId={parseInt(params.id)} />
        </div>
      </div>

      <div className="flex min-h-screen flex-col bg-muted/40">
        <main className="grid flex-1 grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-[minmax(200px,_1fr)_3fr]">
          {/* <ProjectDetailedCard id={2} /> */}
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{project.data?.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="text-sm text-muted-foreground">
                  {project.data?.description}
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
                    Client: John Doe
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
                    <span className="text-muted-foreground">Total Budget</span>
                    <span>$50,000</span>
                  </div>
                  <Progress value={60} aria-label="60% of budget used" />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Expenses</span>
                    <span>$30,000</span>
                  </div>
                  <Progress value={60} aria-label="60% of budget used" />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Remaining</span>
                    <span>$20,000</span>
                  </div>
                  <Progress value={40} aria-label="40% of budget remaining" />
                </div>
                <Button size="sm">Add Expense</Button>
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
                  ?.filter((e) => e.status === "todo")
                  .map((e) => (
                    <ProjectCard
                      key={e.id}
                      id={e.id}
                      name={e.summery ?? ""}
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
                  {tasks.data?.filter((e) => e.status === "in_progress").length}
                </Badge>
              </div>
              <div className="grid gap-4">
                {tasks.data
                  ?.filter((e) => e.status === "in_progress")
                  .map((e) => (
                    <ProjectCard
                      key={e.id}
                      id={e.id}
                      name={e.summery ?? ""}
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
                  {tasks.data?.filter((e) => e.status === "done").length}
                </Badge>
              </div>
              <div className="grid gap-4">
                {tasks.data
                  ?.filter((e) => e.status === "done")
                  .map((e) => (
                    <ProjectCard
                      key={e.id}
                      id={e.id}
                      name={e.summery ?? ""}
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
