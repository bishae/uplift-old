/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UrcKDFu8aDz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Kanban() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <main className="grid flex-1 grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-[minmax(200px,_1fr)_3fr]">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Name</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="text-sm text-muted-foreground">
                Project Description
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-muted-foreground">
                  Due Date: June 30, 2023
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <UsersIcon className="h-4 w-4" />
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
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">On Hold</h3>
              <Badge variant="outline">3</Badge>
            </div>
            <div className="grid gap-4">
              <Card>
                <CardContent className="grid gap-2">
                  <div className="text-sm font-medium">
                    Design new website layout
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Due: June 15, 2023
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UsersIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Assigned to: John Doe
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-2">
                  <div className="text-sm font-medium">
                    Implement new feature
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Due: June 20, 2023
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UsersIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Assigned to: Jane Smith
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-2">
                  <div className="text-sm font-medium">
                    Write project documentation
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Due: June 25, 2023
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UsersIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Assigned to: John Doe, Jane Smith
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="rounded-lg bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Active</h3>
              <Badge variant="outline">2</Badge>
            </div>
            <div className="grid gap-4">
              <Card>
                <CardContent className="grid gap-2">
                  <div className="text-sm font-medium">
                    Develop new mobile app
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Due: July 1, 2023
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UsersIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Assigned to: John Doe, Jane Smith
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-2">
                  <div className="text-sm font-medium">
                    Optimize website performance
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Due: June 28, 2023
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UsersIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Assigned to: Jane Smith
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="rounded-lg bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Completed</h3>
              <Badge variant="outline">4</Badge>
            </div>
            <div className="grid gap-4">
              <Card>
                <CardContent className="grid gap-2">
                  <div className="text-sm font-medium">
                    Implement new payment gateway
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Due: June 10, 2023
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UsersIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Assigned to: John Doe
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-2">
                  <div className="text-sm font-medium">
                    Migrate to new CRM system
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Due: June 15, 2023
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UsersIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Assigned to: Jane Smith
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-2">
                  <div className="text-sm font-medium">
                    Update marketing website
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Due: June 20, 2023
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UsersIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Assigned to: John Doe, Jane Smith
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-2">
                  <div className="text-sm font-medium">
                    Implement new analytics dashboard
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Due: June 25, 2023
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UsersIcon className="h-4 w-4" />
                    <span className="text-muted-foreground">
                      Assigned to: Jane Smith
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
