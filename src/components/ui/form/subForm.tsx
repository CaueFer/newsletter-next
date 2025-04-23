"use client";
import { useState } from "react";

import { Input } from "../input";
import { Button } from "../button";
import { Send } from "lucide-react";

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
      className="flex flex-col items-center justify-center gap-3 text-black"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md md:w-md sm:w-sm mx-auto p-4">
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
      </div>

      <Button type="submit" className="w-36 shadow-lg">
        Quero Receber
        <Send />
      </Button>
    </form>
  );
};

export default SubForm;
