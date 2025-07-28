// src/pages/ProductPage.tsx

import "@/pages-Css/ProductPage.css";
import { useQuery } from "@tanstack/react-query";
// Importa los tipos actualizados. 'type ProductVariant' es correcto incluso si es una interfaz.
import {
  getProduct,
  type Product,
} from "@/components/services/productData.ts";
//acordeon
import { ExpandableSection } from '@/components/ui/Acordeon/acordeon.tsx';
import '@/components/ui/Acordeon/Acordeon.css';


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

  // Inicializador del swiper del slider del producto:
const sliderImages: SliderImage[] =
  product.variantes?.[0]?.imagenes.map((img, idxImg) => ({
    id: `v0-${idxImg}`,
    url: img.imageUrl,
    alt: img.imageTxt,
  })) ?? [];


  const mySliderConfig: SwiperConfig = {
  slidesPerView: 3,
  speed: 1200,
  spaceBetween: 10,
  loop: true,
  pagination: true,
  navigation: true,
  autoplay: true,
  delay: 15000,
  freeMode: true,
};

  return (
    <div className="index-page">
      <section className="product-page">


        <div className="slider_prefered slider-producto">
          {/* SWIPER SLIDER / Con las imagenes */}
          
        <div className="product-image-slider">
          
          <ProductImageSlider
            images={sliderImages}
            config={mySliderConfig}
            className="custom-swiper-container"
          />
        </div>
        </div>




        <div className="first_container_product_information">
          <div className="product_information">
            <span className="id_product">ID: {product.id}</span>
            <h3 className="colections no_margin">{firstCollection}</h3>{" "}
             <h1>{product.titulo}</h1>
             <div className="price_container">
                <p className="no_margin price_after_discount"><span className="line-through">{formattedsinDescuento}</span> <span className="price_doll">Col</span></p> 
                <p className="no_margin" >Total: {formattedTotal} <span className="price_doll">Col</span></p>
             </div>
            {/* Esto debería de ser positivo si existira un descuento pero yo solo lo muestro por razones esteticas */}
            {porcentajeDescuento == 0 && (
              <div className="text-red-600 font-semibold tag_discount">
                <p className="discount_title">- {porcentajeDescuento}% OFF</p>
              </div>
            )}



              {/*Color*/}
          <div className="index_variant_container color_parent">
            <span className="color_title">
              Color:
            </span>
            <div className="color_container">
              {product.variantes && product.variantes.length > 0 ? (
                // Filtra colores únicos antes de renderizar
                Array.from(
                  new Set(product.variantes.map((variante) => variante.color))
                ).map((color, idx) => (
                  <button className="color no_margin" key={idx} data-color={color}>
                    {color || "N/A"}
                  </button>
                ))
              ) : (
                <p className="color no_margin">Color: N/A</p>
              )}
            </div>
          </div>



            {/*Talla*/}
            <div className="index_variant_container talla_parent">
            <span className="talla_title">
              Talla:
            </span>
              <div className="talla_container">
              {product.variantes && product.variantes.length > 0 ? (
                product.variantes.map((variante, idx) => (
                  <button className="talla no_margin" key={idx} >
                    {variante.talla || "N/A"}
                  </button>
                ))
              ) : (
                <p className="talla no_margin">Talla: N/A</p>
              )}
              </div>
            </div>




            <p className="marca no_margin" >Marca: {product.marca}</p>
            <p className="no_margin" >Referencia: {product.referencia}</p>
          </div>
        </div>

        <div className="second_container_product_information">
          {/* Detalles de la Variante Seleccionada */}


          <div className="product_information">
            <h3>Información del producto: </h3>
            <div className="enclose_information_acordeon">
        
              <ExpandableSection title="Descripción" defaultOpen={true}>
                <p className="info_p">{product.descripcion}</p>
              </ExpandableSection>
              <hr className="guntam_line_expandible"></hr>
              {/*Como el contenido recibe un html pongo esto así: */}
              <ExpandableSection title="Características" defaultOpen={true}>
                <div className="info_p" dangerouslySetInnerHTML={{ __html: product.caracteristicas }} />
              </ExpandableSection>
              <hr className="guntam_line_expandible"></hr>
              <ExpandableSection title="Cuidado" defaultOpen={true}>
                <p className="info_p">{product.cuidados}</p>
              </ExpandableSection>
            </div>

            

          </div>
        </div>
      </section>
    </div>
  );
}
