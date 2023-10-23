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
      <div className="border rounded-lg w-full max-w-3xl h-[48rem] overflow-y-auto overflow-x-hidden m-auto flex flex-col p-8">
        <h1 className="text-2xl font-medium mx-auto pb-8 border-b w-full max-w-full text-center mb-8">
          {metadata.title?.toString()}
        </h1>
        <BookQuery />
      </div>
    </main>
  );
}
