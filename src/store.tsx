import create from 'zustand'
import { devtools, persist } from 'zustand/middleware';

import { IAnalyticsState, IOrderCountSources, ITopReorderedProducts } from './components/analytics/types';

export const useAnalytics = create<IAnalyticsState>()(
  devtools(
    persist((set) => ({
      orderCountSources: {} as IOrderCountSources,
      setIOrderCountSources: (oc: IOrderCountSources) => set((s) => ({...s, orderCountSources: oc })),
      topReorderedProducts: [],
      setTopReorderedProducts: (trp: ITopReorderedProducts[]) => set((s) => ({...s, topReorderedProducts: trp}))
    }))
  )
);

export const useUtility = create<any>()(
   devtools(
     persist((set) => ({
         isLoading: true,
         setIsLoading: (isLoading: boolean) => set((s: any) => ({...s, isLoading}))
     }))
   )
 );

