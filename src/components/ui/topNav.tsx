"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "./button";

const Topnav = () => {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-background shadow-sm text-foreground"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" scroll className="text-xl font-bold ">
              Newsletter Co.
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex flex-row items-center ">
            <Button
              variant="link"
              className={`
              ${isScrolled ? "text-foreground" : " text-white"}`}
            >
              Inscrever-se
            </Button>
            |
            <Button
              variant="link"
              className={` 
              ${isScrolled ? "text-foreground" : " text-white"}`}
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topnav;
