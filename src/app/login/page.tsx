import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Falha no login");
      }

      router.push("/admin/dashboard");
    } catch (err: { ...resto: any, message: string }) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 bg-muted/50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Entrar</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Senha
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Carregando..." : "Entrar"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-foreground">
          <a href="/forgot-password" className="hover:text-primary">
            Esqueceu sua senha?
          </a>
        </div>
        <div className="mt-2 text-center text-sm text-foreground">
          Não tem uma conta?{" "}
          <a href="/register" className="hover:text-primary">
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
