// src/pages/ProductPage.tsx

import "@/pages-Css/ProductPage.css";
import { useQuery } from "@tanstack/react-query";
// Importa los tipos actualizados. 'type ProductVariant' es correcto incluso si es una interfaz.
import {
  getProduct,
  type Product,
  type ProductVariant,
} from "@/components/services/productData.ts";
import ProductImageSlider, {
  type SliderImage,
  type SwiperConfig,
} from "@/components/ui/swiper-file-comp/swiper-main.tsx";

export default function ProductPage() {
  const queryId = "125829257";
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<Product | undefined, Error>({
    queryKey: [queryId],
    queryFn: getProduct,
  });

  // --- Muestra el estado de carga ---
  if (isLoading) {
    console.log("ProductPage: Estoy cargando datos del producto...");
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p>Cargando información del producto...</p>
      </div>
    );
  }

  // --- Muestra el estado de error ---
  if (isError) {
    console.error("ProductPage: ¡Error al cargar el producto!", error);
    return (
      <div className="flex justify-center items-center min-h-[300px] text-red-600">
        <p>
          Error: {error?.message || "Hubo un problema al obtener el producto."}
        </p>
      </div>
    );
  }

  // --- Si no hay producto, incluso después de cargar/error (esto debería ser raro) ---
  if (!product) {
    console.log(
      "ProductPage: No hay datos de producto disponibles después de la carga."
    );
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p>Producto no encontrado o datos no disponibles.</p>
      </div>
    );
  }

  // COLECCION: Obtén la primera colección si el array existe y no está vacío
  const firstCollection =
    product.colecciones && product.colecciones.length > 0
      ? product.colecciones[0]
      : "N/A"; // O un valor predeterminado si no hay colecciones

  // FORMATER PRECIO

  const formatearPrecio = (valor: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(valor);
  };

  // Precio total con descuento
  const formattedTotal = formatearPrecio(
    product.variantes?.[0]?.precio.totalPrice || 0
  ); // Formatea el precio total

  // Precio sin el descuento
  const formattedsinDescuento = formatearPrecio(
    product.variantes?.[0]?.precio.priceWithoutDiscount || 0
  ); // Formatea el precio total

  // Función para calcular el porcentaje de descuento
  const calcularDescuento = (
    precioActual: number,
    precioOriginal: number
  ): number => {
    if (precioOriginal <= 0 || precioActual >= precioOriginal) return 0;
    return Math.round(((precioOriginal - precioActual) / precioOriginal) * 100);
  };

  const porcentajeDescuento = calcularDescuento(
    product.variantes?.[0]?.precio.totalPrice || 0,
    product.variantes?.[0]?.precio.priceWithoutDiscount || 0
  );

  return (
    <div className="index-page">
      <section className="product-page">
        <div className="product-image-slider">
          {/* Selector de Variantes */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          ></div>
        </div>

        <div className="first_container_product_information">
          <div className="product_information">
            <span className="id_product">ID: {product.id}</span>
            <h3 className="colections no_margin">{firstCollection}</h3>{" "}
             <h1>{product.titulo}</h1>
             <div className="price_container">
              <p className="no_margin" >Total: {formattedTotal} <span className="price_doll">Col</span></p>
              <p className="no_margin" >Total: {formattedsinDescuento} <span className="price_doll">Col</span></p> 
             </div>

            {porcentajeDescuento == 0 && (
            <div className="text-red-600 font-semibold">
              <p>{porcentajeDescuento}% OFF</p>
            </div>
          )}

            <p className="marca no_margin" >Marca: {product.marca}</p>
            <p className="no_margin" >Referencia: {product.referencia}</p>
          </div>
        </div>

        <div className="second_container_product_information">
          {/* Detalles de la Variante Seleccionada */}


          <div className="product_information">
            <h3>Detalles de la Variante Seleccionada:</h3>
            <p>{product.descripcion}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
