import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="my-auto">
        <SignIn
          path="/sign-in"
          fallbackRedirectUrl={"/"}
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
