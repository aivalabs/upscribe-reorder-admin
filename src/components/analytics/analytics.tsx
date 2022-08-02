import { useEffect } from "react";
import { useAnalytics, useUtility } from "../../store";
import { orderCounters, topReorderedProducts as topReorderedProductsAPI } from "./api";
import { Loader } from "./loader";
import CardSection from "./sections/card-section";
import Other from "./sections/other";
import { IOrderCountSources } from "./types";
import PageTitle from "./snippents/page-title";
import AnalyticsFilter from "./snippents/analytics-filter";


export default function Analytics() {   
   const {
      orderCountSources: { orderCounts, revenue, other },
      setIOrderCountSources,
      topReorderedProducts,
      setTopReorderedProducts, 
      totalReorderCounts,
      setTotalReorderCounts } = useAnalytics();

   const { isLoading, setIsLoading } = useUtility();


   useEffect((): any => {      
      setIsLoading(true);      
      orderCounters()
         .then((data: IOrderCountSources) => {
            setIOrderCountSources(data);
            setIsLoading(false);
         })
         .catch((err: Error) => console.log(err));
      getTopReorderedProducts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   const getTopReorderedProducts = (): void => {
      setTopReorderedProducts([]);
      topReorderedProductsAPI()
         .then((data: any) => {
            console.log(data.totalReorderCounts, 'totalReorderCounts');
            setTopReorderedProducts(data.products);
            setTotalReorderCounts(data.totalReorderCounts);
         })
         .catch((err: Error) => console.log(err));
   }
   return (
      <>
         <PageTitle title="Analytics" element={<AnalyticsFilter />}/>
         {
            isLoading ?
               <div className="m-3"><Loader /></div>
               : <>
                  <div className="row mt-4">
                     <div className="col-md-4"></div>
                     <div className="col-md-8"></div>
                  </div>
                  <CardSection title="Number of Orders" card={orderCounts} />
                  <CardSection title="Total Revenue Generated" card={revenue} />
                  <Other title="Others" other={other} topReorderedProducts={topReorderedProducts} totalReorderCounts={totalReorderCounts}/>
               </>
         }
      </>
   );
}