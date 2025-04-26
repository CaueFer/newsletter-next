import { API_URL } from "./defaultConst";

const formatEndpoint = (endpoint: string) => {
  return endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
};

export async function post(
  endpoint: string,
  body: unknown | null | undefined,
  headers?: Record<string, string>
): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(`${API_URL}/${formatEndpoint(endpoint)}`, {
      method: "POST",
      headers: headers ?? { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha na requisição POST");
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Erro desconhecido na requisição POST");
  }
}

export async function get(endpoint: string, headers?: Record<string, string>) {
  try {
    const response = await fetch(`${API_URL}/${formatEndpoint(endpoint)}`, {
      method: "GET",
      headers: headers ?? { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falha na requisição GET");
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Erro desconhecido na requisição POST");
  }
}
