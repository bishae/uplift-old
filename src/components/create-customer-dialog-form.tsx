"use client";

import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { api } from "@/trpc/react";

const formSchema = z.object({
  name: z.string(),
  contact_info: z.string(),
});

type FormInput = z.infer<typeof formSchema>;

export default function CreateCustomerDialogForm() {
  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", contact_info: "" },
  });

  const utils = api.useUtils();
  const mutation = api.customer.create.useMutation({
    onSuccess: () => utils.customer.invalidate(),
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">add a customer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Customer</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Customer name description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Info</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Customer contact info description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogTrigger asChild>
                <Button type="submit">Save</Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
