import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" flex justify-center items-center p-4 gap-4 min-h-screen">
      <SignUp />;
    </div>
  );
}
