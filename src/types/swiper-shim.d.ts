// 在 swiper-shim.d.ts 或任何你选择的 .d.ts 文件中
declare module 'swiper/modules' {
    import { SwiperModule } from 'swiper/types';
    export const Navigation: SwiperModule;
    export const Pagination: SwiperModule;
  }
  