import { AnimatedNavFramer } from "@/components/ui/navigation-menu";

export default function HomePage() {
  return (
    <>
      <AnimatedNavFramer />
      <main className="container mx-auto px-4">
        <div className="flex h-screen flex-col items-center justify-center gap-3 pt-24 text-center">
          <h1 className="text-4xl font-bold">Diction Coach</h1>
          <p className="max-w-md text-muted-foreground">
            Aujourd&apos;hui : un virelangue, une lecture à voix haute, un
            exercice de respiration. Cinq minutes suffisent.
          </p>
        </div>
        <div className="h-[60vh] rounded-lg bg-muted p-8">
          <h2 className="text-2xl font-bold">Historique</h2>
          <p className="mt-4 text-muted-foreground">
            Les séances passées et le streak s&apos;afficheront ici.
          </p>
        </div>
      </main>
    </>
  );
}
