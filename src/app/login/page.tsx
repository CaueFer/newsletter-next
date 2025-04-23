import LoginForm from "@/components/ui/form/loginForm";
import CookiesHelper from "@/lib/cookieStore";

const LoginPage = async () => {
  const { setCookie } = await CookiesHelper();

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: "#add8e6",
        backgroundImage: "linear-gradient(315deg, #add8e6 0%, #fffafa 74%)",
      }}
    >
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <LoginForm setCookie={setCookie} />
      </div>
    </div>
  );
};

export default LoginPage;
