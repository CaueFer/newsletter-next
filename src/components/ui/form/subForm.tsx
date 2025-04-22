"use client";
import { useState } from "react";

import { Input } from "../input";
import { Button } from "../button";

const SubForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg text-black"
    >
      <Input
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="sm:flex-1"
      />
      <Button type="submit">Inscrever-se</Button>
    </form>
  );
};

export default SubForm;
