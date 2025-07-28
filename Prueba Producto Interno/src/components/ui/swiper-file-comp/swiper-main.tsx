import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  FreeMode,
  Autoplay,
  Thumbs,
} from "swiper/modules";
import SwiperCore from "swiper";
import "./swiper-bundle.css";

export interface SliderImage {
  id: string;
  url: string;
  alt: string;
}

export interface SwiperConfig {
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  loop?: boolean;
  pagination?: boolean;
  navigation?: boolean;
  autoplay?: boolean;
  delay?: number;
  freeMode?: boolean;
  speed?: number;
  thumbs?: boolean;
  thumbsConfig?: SwiperConfig;
  breakpoints?: {
  [width: number]: SwiperConfig;
};
}

interface ProductImageSliderProps {
  images: SliderImage[];
  config?: SwiperConfig;
  className?: string;
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({
  images,
  config,
  className,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  const defaultConfig: SwiperConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: false,
    pagination: true,
    navigation: true,
    autoplay: false,
    delay: 2500,
    freeMode: false,
    thumbs: false,
  };

  const finalConfig = { ...defaultConfig, ...config };
  const thumbsConfig = finalConfig.thumbsConfig ?? {
  slidesPerView: 4,
  spaceBetween: 10,
  loop: false,
  speed: 500,
  freeMode: true,
};

const breakpoints = {
  320: { slidesPerView: 1, spaceBetween: 10 },
  640: { slidesPerView: 2, spaceBetween: 15 },
  1020: { slidesPerView: 2, spaceBetween: 15 },
  1200: { slidesPerView: 3, spaceBetween: 20 },
  1400: { slidesPerView: 3, spaceBetween: 20 },
  
};

  const modules = [Pagination, Navigation, Autoplay, FreeMode];
  if (finalConfig.thumbs) modules.push(Thumbs);

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
        breakpoints={breakpoints}
        speed={finalConfig.speed}
        thumbs={finalConfig.thumbs ? { swiper: thumbsSwiper } : undefined}
        pagination={finalConfig.pagination ? { clickable: true } : undefined}
        navigation={finalConfig.navigation || false}
        autoplay={
          finalConfig.autoplay
            ? { delay: finalConfig.delay, disableOnInteraction: false }
            : undefined
        }
        freeMode={finalConfig.freeMode || false}
        className="swiper-main"
        id="swiper-main"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <img
              src={img.url}
              alt={img.alt}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

     {finalConfig.thumbs && (
  <Swiper
    onSwiper={setThumbsSwiper}
    spaceBetween={thumbsConfig.spaceBetween}
    slidesPerView={thumbsConfig.slidesPerView}
    loop={thumbsConfig.loop}
    speed={thumbsConfig.speed}
    freeMode={thumbsConfig.freeMode}
    watchSlidesProgress
    modules={[Thumbs]}
    className="swiper-thumbnails"
    id="swiper-thumbnails"
    style={{ marginTop: '10px' }}
  >
    {images.map((img) => (
      <SwiperSlide key={`thumb-${img.id}`}>
        <img
          src={img.url}
          alt={img.alt}
          style={{
            width: '100%',
            height: '80px',
            objectFit: 'cover',
            cursor: 'pointer',
          }}
        />
      </SwiperSlide>
    ))}
  </Swiper>
)}
    </div>
  );
};

export default ProductImageSlider;
