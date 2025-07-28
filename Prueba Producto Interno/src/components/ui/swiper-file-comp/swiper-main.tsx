import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, FreeMode, Autoplay } from 'swiper/modules'; // Importa más módulos si los vas a permitir configurar
import './swiper-bundle.css'

// Interfaz para el tipo de imagen que espera el slider
export interface SliderImage {
  id: string; // O uniqueKey: string;
  url: string;
  alt: string;
}

// Interfaz para las props de configuración de Swiper
export interface SwiperConfig {
  slidesPerView?: number | 'auto'; // Cuántos slides se muestran a la vez
  spaceBetween?: number; // Espacio entre slides
  loop?: boolean; // Si el slider debe hacer loop
  pagination?: boolean; // Controlar si tiene paginación (los puntos)
  navigation?: boolean; // Controlar si tiene botones de navegación (flechas)
  autoplay?: boolean; // Controlar si tiene autoplay
  delay?: number; // Retraso para autoplay
  freeMode?: boolean; // Si se puede arrastrar libremente
  thumbs?: boolean; // Si tiene miniaturas (requiere otro Swiper para las miniaturas)
  // Puedes añadir más configuraciones de Swiper que quieras exponer
}

interface ProductImageSliderProps {
  images: SliderImage[];
  config?: SwiperConfig; // La configuración es opcional
  // Puedes añadir otros props si necesitas algo más específico, como un className
  className?: string;
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ images, config, className }) => {
  // Configuración por defecto si no se proporciona ninguna
  const defaultConfig: SwiperConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: false,
    pagination: true,
    navigation: true,
    autoplay: false,
    delay: 2500,
    freeMode: false,
    thumbs: false, // Por defecto no usamos thumbs para simplificar
  };

  // Fusionar la configuración por defecto con la proporcionada por el usuario
  const finalConfig = { ...defaultConfig, ...config };

  // Módulos de Swiper a usar, basados en la configuración final
  const modules = [];
  if (finalConfig.pagination) modules.push(Pagination);
  if (finalConfig.navigation) modules.push(Navigation);
  if (finalConfig.autoplay) modules.push(Autoplay);
  if (finalConfig.freeMode) modules.push(FreeMode);
  // if (finalConfig.thumbs) modules.push(Thumbs); // Si implementas thumbs, necesitarías otro Swiper

  // Asegurar que el loop sea false si solo hay una imagen, o si explícitamente se desactiva
  const useLoop = finalConfig.loop && images.length > 1;

  if (images.length === 0) {
    return <div className={className}>No hay imágenes para mostrar.</div>;
  }

  return (
    <div className={className}>
      <Swiper
        modules={modules}
        spaceBetween={finalConfig.spaceBetween}
        slidesPerView={finalConfig.slidesPerView}
        loop={useLoop}
        {...(finalConfig.pagination && { pagination: { clickable: true } })} // Solo añade si pagination es true
        {...(finalConfig.navigation && { navigation: true })} // Solo añade si navigation es true
        {...(finalConfig.autoplay && { autoplay: { delay: finalConfig.delay, disableOnInteraction: false } })} // Configuración de autoplay
        {...(finalConfig.freeMode && { freeMode: true })}
        // Añade otras props de Swiper basadas en finalConfig si las expones
      >
        {images.map((img: SliderImage) => (
          <SwiperSlide key={img.id}>
            <img 
              src={img.url} 
              alt={img.alt} 
              style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageSlider;