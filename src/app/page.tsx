import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">UI Library Showcase</h1>
        <Link href="/showcase" className="text-blue-500 hover:underline">
          Go to Showcase
        </Link>
      </div>
    </main>
  );
}
