import { useEffect } from "react";
import { useAnalytics, useUtility } from "../../store";
import { orderCounters, topReorderedProducts as topReorderedProductsAPI } from "./api";
import CardSection from "./sections/card-section";
import Other from "./sections/other";
import { IOrderCountSources, ITopReorderedProducts } from "./types";


export default function Analytics() {
   const {
      orderCountSources: { orderCounts, revenue, other },
      setIOrderCountSources,
      topReorderedProducts,
      setTopReorderedProducts } = useAnalytics();

   const { isLoading, setIsLoading } = useUtility();


   useEffect((): any => {
      let mounted = true;
      if (!isLoading && mounted) setIsLoading(true);
      orderCounters()
         .then((data: IOrderCountSources) => {
            if (mounted) setIOrderCountSources(data);
            if (isLoading) setIsLoading(false);
         })
         .catch((err: Error) => console.log(err));
      getTopReorderedProducts();
      return () => mounted = false;
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   const getTopReorderedProducts = (): void => {
      topReorderedProductsAPI()
         .then((data: ITopReorderedProducts[]) => {
            setTopReorderedProducts(data);
         })
         .catch((err: Error) => console.log(err));
   }
   return (
      <>
         {
            isLoading ?
               <></>
               : <>
                  <CardSection title="Number of Orders" card={orderCounts} />
                  <CardSection title="Total Revenue Generated" card={revenue} />
                  <Other title="Others" other={other} topReorderedProducts={topReorderedProducts} />
               </>
         }
      </>
   );
}