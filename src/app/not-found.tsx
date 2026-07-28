import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <p className="text-7xl md:text-9xl font-bold text-gradient mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild><Link href="/"><Home className="w-4 h-4 mr-2" />Back to Home</Link></Button>
          <Button asChild variant="outline"><Link href="/#discover"><Search className="w-4 h-4 mr-2" />Browse AI Tools</Link></Button>
        </div>
      </div>
    </main>
  );
}
