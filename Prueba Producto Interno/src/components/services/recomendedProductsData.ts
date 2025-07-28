// src/components/services/recomendedProductsData.ts

export interface ResumenVariante {
  id: string;
  nombre: string;
  precio: {
    total: number;
    sinDescuento: number;
  };
  imagen: string | null; // Puede ser null si no hay imagen
}

export async function fetchPrimeras8VariantesGlobal(): Promise<ResumenVariante[]> {
  const res = await fetch(`https://api-frontend-production.up.railway.app/api/products?limit=8`);
  if (!res.ok) throw new Error("No se pudieron obtener productos");

  const productos = await res.json();

  const variantes: ResumenVariante[] = [];

  productos.forEach((product: any) => {
    const primerItem = product.items?.[0];
    if (!primerItem) return;

    const seller = primerItem.sellers?.[0];
    const offer = seller?.commertialOffer;

    const imagen = primerItem.images?.[0]?.imageUrl ?? primerItem.imageUrl ?? null;

    variantes.push({
      id: primerItem.itemId,
      nombre: primerItem.nameComplete ?? 'Variante sin nombre',
      precio: {
        total: offer?.Price ?? 0,
        sinDescuento: offer?.PriceWithoutDiscount ?? 0,
      },
      imagen,
    });
  });

  return variantes.slice(0, 8); // Solo las primeras 8 variantes globales
}




