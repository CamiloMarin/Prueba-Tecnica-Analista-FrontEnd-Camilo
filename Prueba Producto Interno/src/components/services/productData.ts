// src/components/services/productData.ts

// --- Interfaces para la estructura de la respuesta cruda del API ---

// Interfaz del producto
export interface Product {
  id: string; // ID del producto
  titulo: string; // Título del producto
  marca: string; // Marca del producto
  colecciones: string[]; // Colecciones del producto
  referencia: string; // Referencia del producto
  descripcion: string; // Descripción del producto
  caracteristicas: string; // Características del producto 
  cuidados: string; // Cuidados del producto 
  variantes?: ProductVariant[]; // Variantes del producto
}

export interface Price {
  totalPrice: number;
  priceWithoutDiscount: number;
}

// Interfaz de variante del producto
export interface ProductVariant {
  id: string; // ID de la variante
  titulo: string; // Título de la variante
  precio: Price; // Precio de la variante
  imagenes: string[]; // Imágenes de la variante
}

export const getProduct = async (): Promise<Product> => {
  const res = await fetch("https://api-frontend-production.up.railway.app/api/products/125829257");
  if (!res.ok) throw new Error("No se pudo obtener el producto");

  const data = await res.json();
  const raw = data[0];

    // Función auxiliar para obtener el precio de un vendedor, manejando casos nulos/indefinidos
  const getPriceInfo = (item: any) => {
    const firstSeller = item.sellers?.[0]; // Accede al primer vendedor si existe
    console.log("getPriceInfo: ", firstSeller); // Log para depuración
    return {
      totalPrice: firstSeller?.commertialOffer.Price ?? 0, // Usa 'price' del vendedor, si no existe, 0
      priceWithoutDiscount: firstSeller?.commertialOffer.PriceWithoutDiscount ?? 0, // Usa 'PriceWithoutDiscount' del vendedor, si no existe, 0
    };
    console
  }; 

  return {
    id: raw.productId,
    titulo: raw.productName,
    marca: raw.brand ?? "",
    colecciones: raw.categories ?? [],
    referencia: raw.productReferenceCode ?? "",
    descripcion: raw.description ?? "",
    caracteristicas: raw.CARACTERÍSTICAS ?? "",
    cuidados: raw["INSTRUCCIONES DE CUIDADO"] ?? "",
    // Mapea todos los 'items' a ProductVariant sin filtrar por 'imageUrl'
    variantes: raw.items
      ?.map((item: any) => ({
        id: item.itemId,
        titulo: item.nameComplete,
        precio: getPriceInfo(item), // Llama a la función para obtener la información de precios
        imagenes: item.imageUrl ? [item.imageUrl] : [], // Envuelve la 'imageUrl' en un array para que coincida con 'imagenes: string[]'
      })) ?? [], // Si 'raw.items' es nulo/indefinido, devuelve un array vacío
  };
};
