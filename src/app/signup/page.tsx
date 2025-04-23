import { cookies } from "next/headers";

import SignupForm from "@/components/ui/form/signupForm";

const SignupPage = async () => {
  const cookieStore = await cookies();

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: "#add8e6",
        backgroundImage: "linear-gradient(615deg, #add8e6 0%, #fffafa 74%)",
      }}
    >
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Criar conta</h1>

        <SignupForm cookieStore={cookieStore} />
      </div>
    </div>
  );
};

export default SignupPage;
