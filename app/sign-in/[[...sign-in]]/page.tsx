import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center 
      bg-gradient-to-br from-[#0A0F1F] via-[#0C152A] to-[#0A0F1F]
      dark:from-[#05070C] dark:via-[#0A0F1F] dark:to-[#05070C]
      p-6"
    >
      <SignIn
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "0 0 0",
              backgroundColor: "transparent",
            },
          },
        }}
      />
    </div>
  );
}
