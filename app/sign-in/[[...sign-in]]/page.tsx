import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center 
      bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 
      dark:from-blue-950 dark:via-blue-900 dark:to-blue-950
      p-6">

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
