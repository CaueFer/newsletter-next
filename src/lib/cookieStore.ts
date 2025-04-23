"use server";

import { cookies } from "next/headers";

export default async function CookiesHelper() {
  const cookieStore = await cookies();

  const setCookie = (key: string, value: string) => {
    cookieStore.set(key, value, {
      path: "/",
      httpOnly: true,
      secure: true,
    });
  };

  const getCookie = (key: string) => {
    return cookieStore.get(key);
  };

  const getAllCookies = () => {
    return cookieStore.getAll();
  };

  return { setCookie, getCookie, getAllCookies };
}
