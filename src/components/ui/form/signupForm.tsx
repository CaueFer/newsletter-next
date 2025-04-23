"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../input";
import { Button } from "../button";
import { post } from "@/lib/helpers";

const SignupSchema = z.object({
  name: z
    .string()
    .min(3, "Digite um nome maior")
    .nonempty("Nome é obrigatório"),
  email: z
    .string()
    .email("Digite um email válido")
    .nonempty("Email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("Senha é obrigatória"),
});

type Signup = z.infer<typeof SignupSchema>;

interface SignupFormProps {
  setCookie: (key: string, value: string) => void;
}
export default function SignupForm({ setCookie }: SignupFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const finalSubmit = async (values: Signup) => {
    setError("");
    setIsLoading(true);

    try {
      const data: Record<string, unknown> = await post("/auth/signup", {
        name: values?.name,
        email: values?.email,
        password: values?.password,
      });

      if (
        "authToken" in (data as Record<string, unknown>) &&
        typeof (data as Record<string, unknown>).authToken === "string"
      ) {
        setCookie("authToken", data?.authToken as string);
      }

      router.push("/admin/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(finalSubmit)} className="space-y-4">
        {/* NOME */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground"
          >
            Nome
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Digite seu nome"
            required
            disabled={isLoading}
            className="mt-1"
            {...register("name")}
          />
          {errors?.name && (
            <p className="text-sm text-red-500 mt-1">{errors?.name?.message}</p>
          )}
        </div>

        {/* EMAIL */}
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
            required
            disabled={isLoading}
            className="mt-1"
            {...register("email")}
          />
          {errors?.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors?.email?.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground"
          >
            Senha
          </label>{" "}
          <div className="flex w-full items-center space-x-2">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              required
              disabled={isLoading}
              className="mt-1 w-full"
              {...register("password")}
            />
            <Button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <Eye /> : <EyeOff />}
            </Button>
          </div>
          {errors?.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors?.password?.message}
            </p>
          )}
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer"
        >
          {isLoading ? "Carregando..." : "Entrar"}
        </Button>
      </form>

      <div className="mt-2 text-center text-sm text-foreground">
        Já tem uma conta?{" "}
        <Button
          variant="link"
          onClick={() => router.push("/login")}
          className="hover:text-primary cursor-pointer"
        >
          Login
        </Button>
      </div>
    </>
  );
}
