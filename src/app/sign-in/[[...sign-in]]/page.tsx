import { logo } from "@/context/constants";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex justify-evenly items-center h-screen w-screen">
      <div className="flex items-center justify-center gap-2">
        <Image
          src={logo}
          alt=""
          height={300}
          width={300}
          className="rounded-full"
        />
        <span className="text-7xl">ChatHub</span>
      </div>
      <div className="my-auto">
        <SignIn
          path="/sign-in"
          forceRedirectUrl={"/on-boarding"}
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-slate-500 hover:bg-slate-400 text-sm normal-case",
              card: "shadow-none border-black",
            },
          }}
        />
      </div>
    </div>
  );
}
