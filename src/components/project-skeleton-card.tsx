import { Skeleton } from "./ui/skeleton";

export default function ProjectSkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-36 w-full" />
    </div>
  );
}
