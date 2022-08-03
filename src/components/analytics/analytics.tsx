import { useEffect } from "react";
import { useAnalytics, useUtility } from "../../store";
import { orderCounters } from "./api";
import { Loader } from "./loader";
import CardSection from "./sections/card-section";
import Other from "./sections/other";
import PageTitle from "../common/snippets/page-title";
import AnalyticsFilter from "./snippents/analytics-filter";
import moment from "moment";

const currentDate = new Date();
const intialAnalyticsData = {
   store_domain: 'upscribe-emporium.myshopify.com',
   start_date: moment(currentDate).subtract(1, 'M').format('YYYY-MM-DD'),
   end_date: moment(currentDate).format('YYYY-MM-DD')
}
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
      orderCounters(intialAnalyticsData)
         .then((data: any) => {
            setIOrderCountSources(data.orderSummery);
            setTopReorderedProducts(data.reorderedProducts);
            setTotalReorderCounts(data.topReorderEventCount);
            setIsLoading(false);
            
         })
         .catch((err: Error) => {
            console.log(err)
            setIsLoading(false);
         });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <>
         <PageTitle title="Analytics" element={<AnalyticsFilter />}/>
         {
            isLoading ?
            <div className="m-3"><Loader /></div>
            : 
            <>
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