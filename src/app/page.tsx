import Nav from "@/components/common/Nav";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <SignedIn>
      <div>HII</div>
    </SignedIn>
  );
}
