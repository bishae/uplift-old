"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { taskStatusEnum } from "@/server/db/schema";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { type ReactNode } from "react";
import { type SelectTask } from "@/types";

interface Props {
  task: SelectTask;
  children: ReactNode;
}

const formSchema = z.object({
  id: z.number(),
  summery: z.string(),
  status: z.enum(taskStatusEnum.enumValues),
  projectId: z.number(),
});

type FormInput = z.infer<typeof formSchema>;

export default function UpdateTaskUpdateDialogForm({ task, children }: Props) {
  const taskQuery = api.task.one.useQuery({ id: task.id });

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: task.id,
      summery: task.summery ?? "",
      status: task.status ?? "todo",
      projectId: task.projectId ?? 0,
    },
  });

  const utils = api.useUtils();

  const create = api.task.update.useMutation({
    onSuccess: () => utils.task.all.invalidate(),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    create.mutate(data);
    form.reset();
    toast({
      title: "Success",
      description: `Task has been updated and is currently ${data.status}.`,
    });
  };

  if (!taskQuery.data) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button>New Task</Button> */}
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            This will update a selected task.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="summery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summery</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the summery of the task.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Active" />
                      </SelectTrigger>
                      <SelectContent>
                        {taskStatusEnum.enumValues.map((e) => (
                          <SelectItem key={e} value={e}>
                            {e.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Set it for the current status of the project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogTrigger asChild>
                <Button type="submit">Submit</Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}