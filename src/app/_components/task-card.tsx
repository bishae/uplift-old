import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Text, User } from "lucide-react";
import TaskUpdateForm from "./task-update-form";
import { type z } from "zod";
import { type selectTaskSchema } from "@/server/db/schema";

interface Props {
  task: z.infer<typeof selectTaskSchema>;
}

export default function TaskCard({ task }: Props) {
  return (
    <TaskUpdateForm id={task.id} _task={task}>
      <Card className="transition-all hover:cursor-pointer hover:opacity-70">
        <CardHeader>
          <CardTitle className="w-64 truncate text-sm font-medium">
            {task.summery}
          </CardTitle>
          <CardDescription className="w-64 truncate">
            <Text />
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          {/* <div className="text-sm font-medium">{title}</div> */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span className="text-muted-foreground">
              {Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
                new Date(),
              )}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />
            <span className="text-muted-foreground">Assigne: Jane Doe</span>
          </div>
        </CardContent>
      </Card>
    </TaskUpdateForm>
  );
}
