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
import { statusEnum } from "@/server/db/schema";
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

const formSchema = z.object({
  name: z.string(),
  status: z.enum(statusEnum.enumValues),
  budget: z.string(),
  clientId: z.string(),
});

export default function CreateProjectForm() {
  const clients = api.customer.all.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "active",
      budget: "0.00",
      clientId: "",
    },
  });

  const utils = api.useUtils();

  const create = api.project.create.useMutation({
    onSuccess: () => utils.project.all.invalidate(),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    create.mutate(data);
    form.reset();
    toast({
      title: "Success",
      description: `New project has been added and is currently ${data.status} project`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Project</Button>
      </DialogTrigger>
      <DialogContent>
        {process.env.NODE_ENV === "development" && (
          <>{JSON.stringify(form.formState.errors)}</>
        )}
        <DialogHeader>
          <DialogTitle>Project</DialogTitle>
          <DialogDescription>This will add a new project.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the display name of the project.
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
                  <FormLabel>Project Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? "active"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Active" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusEnum.enumValues.map((e) => (
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

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="budget" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the display name of the project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.data?.map((e) => (
                          <SelectItem key={e.id} value={e.id.toString()}>
                            {e.name}
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
