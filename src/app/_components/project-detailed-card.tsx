"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { api } from "@/trpc/react";
import { Calendar, User } from "lucide-react";

export default function ProjectDetailedCard({ id }: { id: number }) {
  const project = api.project.one.useQuery({ id });

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{project.data?.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="text-sm text-muted-foreground">
            Project Description
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
              Assigned to: John Doe, Jane Smith
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
  );
}
