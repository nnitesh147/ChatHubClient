import { SignedIn } from "@clerk/nextjs";
import Main from "../components/Main.jsx";

export default function Home() {
  return (
    <SignedIn>
      <Main />
    </SignedIn>
  );
}
