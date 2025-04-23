"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { Input } from "../input";
import { Button } from "../button";
import { post } from "@/lib/helpers";

const SignupSchema = z.object({
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
  cookieStore: ReadonlyRequestCookies;
}
export default function SignupForm({ cookieStore }: SignupFormProps) {
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
        email: values?.email,
        password: values?.password,
      });

      if (
        "jwt_token" in (data as Record<string, unknown>) &&
        typeof (data as Record<string, unknown>).jwt_token === "string"
      )
        cookieStore.set("jwt_token", data?.jwt_token as string);

      console.log(values);

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
            className="mt-1"
            {...register("email")}
          />
          {errors?.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors?.email?.message}
            </p>
          )}
        </div>
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
