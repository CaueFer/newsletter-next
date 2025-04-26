export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export const sizeMapToPx: Record<string, string> = {
  xs: "12px",
  sm: "16px",
  md: "18px",
  lg: "20px",
  xl: "24px",
};

export const sizeMapToAcron: Record<string, string> = {
  "12px": "xs",
  "16px": "sm",
  "18px": "md",
  "20px": "lg",
  "24px": "xl",
};

export const valueFormatToText: Record<string, string> = {
  pr: "paragraph",
  bl: "bulletList",
  tl: "taskList",
  h1: "heading-1",
  h2: "heading-2",
  h3: "heading-3",
};

export const textFormatToAcron: Record<string, string> = {
  Paragrafo: "pr",
  "Lista de pontos": "bl",
  "Lista de tarefas": "tl",
  "Titulo 1": "h1",
  "Titulo 2": "h2",
  "Titulo 3": "h3",
};
