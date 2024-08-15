import { UserButton } from "@clerk/nextjs";
import Logo from "./Logo.jsx";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex justify-between items-center bg-gray-900">
      <div className="mx-2">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="mx-2">
        <UserButton />
      </div>
    </div>
  );
}
