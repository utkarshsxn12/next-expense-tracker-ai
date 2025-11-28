import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center
      bg-[length:200%_200%]
      bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600
      dark:from-blue-700 dark:via-blue-800 dark:to-blue-900
      animate-gradient-move
      p-6"
    >
      <SignUp
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
