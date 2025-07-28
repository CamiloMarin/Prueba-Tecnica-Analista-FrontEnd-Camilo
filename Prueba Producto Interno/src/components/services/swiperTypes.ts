// swiper-config.ts
import type { SwiperOptions } from 'swiper/types';



export interface SwiperConfig extends SwiperOptions {
  useThumbs?: boolean;
  thumbs?: {
    swiper?: any;
    [key: string]: any;
  };
}