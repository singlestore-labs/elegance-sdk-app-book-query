import type { Metadata } from "next";
import { BookQuery } from "@/components/BookQuery";

const description = `SingleStore Elegance SDK is an NPM package that helps developers quickly and easily connect to SingleStoreDB, and build React.js-based applications with SingleStore Kai™ and MySQL connection support.`;

export const metadata: Metadata = {
  title: "Elegance SDK Book Query",
  description
};

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full max-w-full flex-col overflow-y-auto overflow-x-hidden p-8">
      <h1 className="text-2xl font-medium mx-auto">{metadata.title?.toString()}</h1>
      <BookQuery />
    </main>
  );
}
