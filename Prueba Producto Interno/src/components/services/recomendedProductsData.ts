// src/components/services/recomendedProductsData.ts

export type Banner = {
  id: string;
  imageUrl: string;
  link?: string;
};

export const getBanners = async (): Promise<Banner[]> => {
  const res = await fetch("https://api-frontend-production.up.railway.app/api/products?ft=tenis");
  if (!res.ok) {
    throw new Error("Error al obtener banners");
  }
  return res.json();
};