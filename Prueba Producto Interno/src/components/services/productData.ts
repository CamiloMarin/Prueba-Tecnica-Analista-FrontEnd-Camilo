// src/components/services/productData.ts
// --- Interfaces para la estructura de la respuesta cruda del API ---

// Interfaz para las imágenes de la variante especifica
export interface ApiVariantImage {
  imageId: string;
  imageUrl: string;
  imageAlt: string;
}

// Precio
export interface ApiVariantPrice {
  original: number; 
  discount: number; 
}

// Tallz
export interface ApiVariantSize {
  variantSize?: string; 
}

// Color
export interface ApiVariantColor {
  variantColor?: string;
}

// Interfaz para la lista de imágenes del producto por cada variante
export interface ApiProductVariant {
  variantId: string; // ID de la variante
  variantName: string; // Nombre de la variante
  eanId?: string; // EAN de la variante
  ApiVariantImage?: ApiVariantImage[]; // Lista de las imagenes de las variantes
  ApiVariantPrice?: ApiVariantPrice[]; // Precio de la variante
  ApiVariantSize?: ApiVariantSize[]; // Talla de la variante
  ApiVariantColor?: ApiVariantColor[]; // Color de la variante
}


// Interfaz para el objeto general del producto crudo
// Entender que queremos atrapar la información del producto general englobando la información de la variante seleccionada

export interface RawApiResponse {
  productID: string; // ID del producto
  productName: string; // Nombre del producto
  brand?: string; // Marca del producto
  colecctions?: string[]; // Colecciones del producto
  ean?: string; // EAN del producto
  reference?: string; // Referencia del producto
  variants: ApiProductVariant[]; // Lista de variantes del producto
}

// --- Interfaces para el tipo de producto transformado en cada caso ---

// Imagenes
export interface TransformedVariantImage {
  id: string;
  url: string;
  alt: string;
}

// Precio
export interface TransformedVariantPrice{
  price : number; // Precio original
  discount: number; // Precio con descuento
}

// Talla
export interface TranformedVariantSize {
  size: string;
}

// Color
export interface TranformedVariantColor {
  color: string;
}

// Producto
export interface ProductVariant {
  variant_id: string;
  variant_name: string; 
  variant_ean?: string;
  variant_precio_completo: TransformedVariantPrice;
  variant_precio_oferta: TransformedVariantPrice;
  variant_talla?: TranformedVariantSize[]; 
  variant_color?: TranformedVariantColor[];
  variant_imagenes: TransformedVariantImage[];

}

export type Product = {
  product_Id: string;
  product_titulo: string;
  marca: string;
  colecciones: string[];
  referencia: string;
  variantes: ProductVariant[]; // Array de todas las variantes del producto
};

// --- Función para obtener y transformar los datos del producto ---
export const getProduct = async (): Promise<Product | undefined> => {
  const res = await fetch("https://api-frontend-production.up.railway.app/api/products/125829257");
  if (!res.ok) {
    throw new Error("Error al obtener producto");
  }

  const data: RawApiResponse[] = await res.json();
  const rawProduct = data[0]; // Accede al primer elemento del array que retorna la API

  if (!rawProduct) {
    return undefined; // No se encontró ningún producto
  }

// Buscamos las imágenes del todas las variantes del producto
const variantes = rawProduct.variants.map((item: ApiProductVariant): ProductVariant => ({
  variant_id: item.variantId,
  variant_name: item.variantName,
  variant_ean: item.eanId,
  variant_precio_completo: {
    price: item.ApiVariantPrice?.[0]?.original ?? 0,
    discount: 0,
  },
  variant_precio_oferta: {
    price: item.ApiVariantPrice?.[0]?.original ?? 0,
    discount: item.ApiVariantPrice?.[0]?.discount ?? 0,
  },
  variant_talla: item.ApiVariantSize?.map((size) => ({
    size: size.variantSize ?? "",
  })) ?? [],
  variant_color: item.ApiVariantColor?.map((color) => ({
    color: color.variantColor ?? "",
  })) ?? [],
  variant_imagenes: item.ApiVariantImage?.map((img) => ({
    id: img.imageId,
    url: img.imageUrl,
    alt: img.imageAlt,
  })) ?? [],
}));

 
  const productId = rawProduct.productID || "";
  const title_product = rawProduct.productName || "";
  const colecciones = rawProduct.colecctions || [];

  return {
    product_Id: productId,
    product_titulo: title_product,
    marca: rawProduct.brand ?? "",
    colecciones: colecciones,
    referencia: rawProduct.reference ?? "",
    variantes,
  };
};
