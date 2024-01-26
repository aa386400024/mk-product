declare module 'pinia-plugin-persist';

// src/types/pinia.d.ts
import 'pinia';

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: {
      enabled: boolean;
      storage?: Storage;
    };
  }
}
