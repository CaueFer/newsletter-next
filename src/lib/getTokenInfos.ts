import { decodeJwt } from "jose";

import CookiesHelper from "./cookieStore";

export default async function getTokenInfos() {
  const { getCookie } = await CookiesHelper();

  const token = getCookie("authToken");

  if (token?.value != null) {
    const infos = decodeJwt(token?.value);

    return infos;
  }
}
