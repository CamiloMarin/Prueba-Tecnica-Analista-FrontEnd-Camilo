import { use } from "react";

const fetchImagenes= async () => {
  const response = await fetch("https://api-frontend-production.up.railway.app/api/products/125829257");
  if (!response.ok) {
    throw new Error("Hubo un error al obtener la respuesta del servidor");
  }
  return response.json();
}

 