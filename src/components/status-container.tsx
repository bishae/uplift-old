import { type ReactNode } from "react";
import { Badge } from "./ui/badge";

interface Props {
  children: ReactNode;
  title: string;
  count: number;
}

export default function StatusContainer({ children, title, count }: Props) {
  return (
    <div className="rounded-lg bg-background p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <Badge variant="outline">{count}</Badge>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}
