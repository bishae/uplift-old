import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Button asChild>
        <Link href="/dashboard">Get Started</Link>
      </Button>
    </main>
  );
}
