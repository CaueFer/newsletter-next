interface FetchProps {
  endpoint: string;
  headers?: Record<string, string>;
}

interface PostProps extends FetchProps {
  body: BodyInit | null;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const formatEndpoint = (endpoint: string) => {
  return endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
};

export async function post({
  endpoint,
  headers,
  body,
}: PostProps): Promise<unknown> {
  try {
    const response = await fetch(`${API_URL}/${formatEndpoint(endpoint)}`, {
      method: "POST",
      headers: headers ?? { "Content-Type": "application/json" },
      body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falha na requisição POST");
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Erro desconhecido na requisição POST");
  }
}

export async function get({ endpoint, headers }: FetchProps) {
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
