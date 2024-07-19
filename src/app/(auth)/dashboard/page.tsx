"use client";

import BriefProjectCard from "@/components/brief-project-card";
import CreateProjectDialogForm from "@/components/create-project-dialog-form";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Calendar, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const projects = api.project.all.useQuery({ limit: 10 });

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
            <div className="rounded-lg bg-background p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">Cancelled</h3>
                <Badge variant="outline">
                  {
                    projects.data?.filter((e) => e.status === "cancelled")
                      .length
                  }
                </Badge>
              </div>
              <div className="grid gap-4">
                {projects.data
                  ?.filter((e) => e.status === "cancelled")
                  .map((e) => <BriefProjectCard key={e.id} project={e} />)}
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
                        {e.description && (
                          <CardDescription className="w-64 truncate">
                            {e.description}
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
                            Client: {e.customer?.name ?? "n/a"}
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
                        {e.description && (
                          <CardDescription className="w-64 truncate">
                            {e.description}
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
                            Client: {e.customer?.name ?? "n/a"}
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
                    <Card
                      key={e.id}
                      className="transition-all hover:cursor-pointer hover:opacity-70"
                      onClick={() => router.push(`/projects/${e.id}`)}
                    >
                      <CardHeader>
                        <CardTitle className="w-64 truncate text-sm font-medium">
                          {e.name}
                        </CardTitle>
                        {e.description && (
                          <CardDescription className="w-64 truncate">
                            {e.description}
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
                            Client: {e.customer?.name ?? "n/a"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
