"use client";

import CreateCustomerDialogForm from "@/components/create-customer-dialog-form";
import { api } from "@/trpc/react";

export default function Customers() {
  const customers = api.customer.all.useQuery();

  return (
    <main>
      <CreateCustomerDialogForm />
      {JSON.stringify(customers.data)}
    </main>
  );
}
