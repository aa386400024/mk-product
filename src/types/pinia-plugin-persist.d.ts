import 'pinia';

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: {
      enabled: boolean;
      storage?: Storage;
    };
  }
}
