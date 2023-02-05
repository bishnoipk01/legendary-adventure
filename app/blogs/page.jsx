import Link from "next/link";
import { cookies } from "next/headers";

export default async function Blogs() {
  return (
    <main className="container mx-auto border-red-200 border-2">
      <h1 className="text-center text-3xl underline">This is Blogs!</h1>
      <Link href="/">Home</Link>
    </main>
  );
}